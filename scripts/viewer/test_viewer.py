"""Real encrypted service-guide regression suite; secrets stay in case-owned files/stdin."""
import argparse,functools,http.server,json,threading,hashlib
from urllib.parse import urlsplit,unquote
from pathlib import Path
from playwright.sync_api import sync_playwright

p=argparse.ArgumentParser();p.add_argument('--case',type=Path,required=True);p.add_argument('--report',type=Path,required=True);p.add_argument('--url');p.add_argument('--widths',default='1440,390');p.add_argument('--smoke',action='store_true');p.add_argument('--headers-stdin',action='store_true');args=p.parse_args()
config=json.loads(args.case.read_text());secret=Path(config['password_file']).read_text().strip();code=config['code'];headers={}
if args.headers_stdin:
 import sys,termios
 previous=None
 if sys.stdin.isatty():
  previous=termios.tcgetattr(sys.stdin.fileno());hidden=termios.tcgetattr(sys.stdin.fileno());hidden[3]&=~termios.ECHO;termios.tcsetattr(sys.stdin.fileno(),termios.TCSANOW,hidden)
 print('Ready for private verification headers on stdin (input hidden).',flush=True)
 try:headers=json.loads(sys.stdin.readline())
 finally:
  if previous is not None:termios.tcsetattr(sys.stdin.fileno(),termios.TCSANOW,previous)
class Quiet(http.server.SimpleHTTPRequestHandler):
 def log_message(self,*args):pass
server=None
if not args.url:
 server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(Quiet,directory='dist'));threading.Thread(target=server.serve_forever,daemon=True).start();args.url=f'http://127.0.0.1:{server.server_port}/d/{code}/'
results=[]
with sync_playwright() as pw:
 browser=pw.chromium.launch(headless=True)
 for width in [int(v) for v in args.widths.split(',')]:
  context=browser.new_context(viewport={'width':width,'height':900},is_mobile=width==390,has_touch=width==390,reduced_motion='reduce',extra_http_headers=headers)
  page=context.new_page();errors=[];requests=[]
  page.on('pageerror',lambda e:errors.append(str(e)))
  page.on('request',lambda r:requests.append((r.url,r.method,r.post_data)))
  def view(name):page.wait_for_function('(v)=>history.state?.state?.view===v',arg=name)
  def unlock():
   page.locator('#password').fill(secret);page.locator('#unlock').click();page.locator('#viewer').wait_for(state='visible')
   f=page.frame_locator('#demo-frame');f.locator('.cover-card').first.wait_for()
   page.locator('#demo-frame').element_handle().content_frame().add_style_tag(content='*,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}')
   return f
  page.goto(args.url);page.locator('#password').fill('incorrect-regression-key');page.locator('#unlock').click();page.get_by_text('パスワードが一致しません。ご案内の内容をご確認ください。').wait_for();assert page.locator('#viewer').is_hidden()
  f=unlock();view('choose');assert page.locator('#password').input_value()==''
  assert page.locator('#demo-frame').bounding_box()['width']<=width+1
  for stage in ([] if args.smoke else range(4)):
   f.locator('[data-view=choose]').click();view('choose')
   f.locator('[data-cover="'+str(stage)+'"]').first.click();f.locator('.cover-card[data-position="0"]').click();view('screen')
   f.locator('[data-design=try]').click();view('try')
   f.locator('[data-design=screen]').click();view('screen')
   assert f.locator('#unlock-form').count()==0
  f.locator('[data-view=choose]').click();f.locator('[data-cover="2"]').first.click();f.locator('.cover-card[data-position="0"]').click();view('screen');f.locator('[data-design=try]').click();view('try')
  f.locator('[data-action=shift]').first.click();f.locator('[data-action=area]').first.click();page.wait_for_function('history.state.state.intake===2')
  answer_values=page.evaluate('[history.state.state.shift,history.state.state.area]')
  page.evaluate('history.back()');view('screen');assert f.locator('[data-design=try]').is_visible()
  page.evaluate('history.forward()');view('try');assert f.locator('[data-action=slot]').first.is_visible()
  page.reload();page.locator('#viewer').wait_for(state='visible');f.locator('[data-action=slot]').first.wait_for();view('try')
  f.locator('a.official-logo').click();view('choose');assert f.locator('#unlock-form').count()==0
  f.locator('a.skip').focus();f.locator('a.skip').press('Enter');assert f.locator('#unlock-form').count()==0
  f.locator('[data-view=referral]').click();view('referral');f.locator('.cap-jumps a').first.click();assert f.locator('#included-support').is_visible()
  page.wait_for_timeout(150);assert all(x.url.startswith('about:srcdoc') or x==page.main_frame for x in page.frames)
  assert page.evaluate('localStorage.length')==0
  assert secret not in page.evaluate('JSON.stringify(sessionStorage)')
  assert len(json.loads(page.evaluate('sessionStorage.getItem("rbt-demo-viewer-v1:"+code)'))['key'])==44
  other=context.new_page();other.goto(args.url);assert other.locator('#gate').is_visible();other.close()
  # A different route must not inherit the selected route's key.
  page.locator('#lock').click();assert page.locator('#gate').is_visible();assert page.evaluate('sessionStorage.getItem("rbt-demo-viewer-v1:"+code)') is None
  page.evaluate('history.back()');page.wait_for_timeout(100);assert page.locator('#gate').is_visible()
  page.reload();assert page.locator('#gate').is_visible()
  if not args.smoke:
   f=unlock();view('choose')
   page.evaluate('session.expires=Date.now()-1');f.locator('.cover-card[data-position="0"]').click();page.locator('#gate').wait_for(state='visible');assert page.locator('#viewer').is_hidden()
   f=unlock();view('choose')
   page.evaluate('()=>{const k="rbt-demo-viewer-v1:"+code;const x=JSON.parse(sessionStorage.getItem(k));x.expires=Date.now()-1;sessionStorage.setItem(k,JSON.stringify(x));}');page.reload();assert page.locator('#gate').is_visible()
   f=unlock();view('choose')
   page.evaluate('()=>{const k="rbt-demo-viewer-v1:"+code;const x=JSON.parse(sessionStorage.getItem(k));x.binding="changed-payload";sessionStorage.setItem(k,JSON.stringify(x));}');page.reload();page.get_by_text('パスワードを入力してデモを開いてください。').wait_for();assert page.locator('#gate').is_visible()
  assert not errors,errors
  assert all(secret not in url and secret not in (body or '') for url,method,body in requests)
  platform=[{'host':urlsplit(url).hostname,'path':urlsplit(url).path,'method':method} for url,method,body in requests if method!='GET']
  print('Non-GET request metadata: '+json.dumps(platform),flush=True)
  assert all(method=='GET' for url,method,body in requests if urlsplit(url).path.startswith(('/d/','/media/'))),'Demo asset endpoints must use GET'
  assert all(value not in unquote(body or '') and json.dumps(value,ensure_ascii=True)[1:-1] not in (body or '') for value in answer_values for url,method,body in requests),'Demo answers must not be transmitted'

  results.append(dict(width=width,platform_requests=platform,all_four_services_tested=not args.smoke,wrong_password=True,all_four_screen_back=not args.smoke,browser_back_forward=True,answers_restored=True,logo_and_skip_safe=True,section_link=True,reload_restores=True,close_clears=True,expiry_active_and_reload=not args.smoke,payload_binding=not args.smoke,new_tab_locked=True,no_password_storage_or_transmission=True,no_js_errors=True))
  args.report.parent.mkdir(parents=True,exist_ok=True);args.report.write_text(json.dumps({'url':args.url,'results':results},ensure_ascii=False,indent=2))
  print('PASS viewer width '+str(width),flush=True);context.close()
 browser.close()
if server:server.shutdown()
args.report.parent.mkdir(parents=True,exist_ok=True);args.report.write_text(json.dumps({'url':args.url,'results':results},ensure_ascii=False,indent=2))
