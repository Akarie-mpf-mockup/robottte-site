/* Service-guide adapter: all view navigation remains inside the document. */
(() => {
  'use strict';
  const start = () => {
    document.addEventListener('click',event=>{
      const a=event.target.closest('a[href^="#"]');
      if(!a || event.defaultPrevented)return;
      event.preventDefault();
      const id=a.getAttribute('href').slice(1);
      if(['top','main','choose'].includes(id) && typeof window.returnToCarousel==='function')window.returnToCarousel();
      document.getElementById(id)?.scrollIntoView({block:'start',behavior:'auto'});
    });
    if (typeof stage === 'undefined' || typeof render !== 'function' || !window.returnToCarousel) return;
    const config = JSON.parse(document.getElementById('rbt-viewer-config')?.textContent || '{}');
    const embedded = parent !== window && typeof config.channel === 'string';
    let applying = false;
    const read = () => ({
      view: !document.getElementById('referral-view').hidden ? 'referral'
        : document.getElementById('experience').hidden ? 'choose' : exhibit === 'try' ? 'try' : 'screen',
      stage, selected, jobMode, faq, intake, shift, area, slot, keeper, theme, consented,
      compareMode, storyStep, hrpConcern, hrpJobOpen
    });
    const signature = s => JSON.stringify([s.view, s.stage]);
    let previous = read();
    const send = (type, state, mode) => {
      if (embedded) parent.postMessage({namespace:'rbt-viewer-v1', channel:config.channel, type, state, mode}, '*');
      else if (type === 'state') {
        const record = {rbtGuide:1, state};
        history[mode === 'push' ? 'pushState' : 'replaceState'](record, '');
      }
    };
    function apply(s) {
      if (!s || !['choose','screen','try','referral'].includes(s.view) || !Number.isInteger(s.stage) || s.stage < 0 || s.stage > 3) return;
      applying = true;
      stage=s.stage; selected=Number.isInteger(s.selected) ? Math.max(0,Math.min(3,s.selected)) : stage;
      for (const [key, assign] of [
        ['jobMode',v=>jobMode=v],['faq',v=>faq=v],['intake',v=>intake=v],['keeper',v=>keeper=v],
        ['storyStep',v=>storyStep=v],['hrpConcern',v=>hrpConcern=v]
      ]) if(Number.isInteger(s[key]) && s[key]>=-1 && s[key]<=20) assign(s[key]);
      for (const [key,assign] of [['shift',v=>shift=v],['area',v=>area=v],['slot',v=>slot=v],['theme',v=>theme=v]])
        if(typeof s[key]==='string' && s[key].length<=200) assign(s[key]);
      consented=s.consented===true;hrpJobOpen=s.hrpJobOpen===true;
      compareMode=s.compareMode==='before'?'before':'after';exhibit=s.view==='try'?'try':'screen';
      selectCover(selected);render();
      if(s.view==='choose')window.returnToCarousel();
      else if(s.view==='referral')window.showReferral();
      else {document.getElementById('experience').hidden=false;window.layoutAfterGo();}
      previous=read();applying=false;
    }
    function publish() {
      if (applying) return;
      const state=read();
      const changed=JSON.stringify(state)!==JSON.stringify(previous);
      if(changed)send('state',state,signature(state)===signature(previous)?'replace':'push');
      previous=state;
    }
    document.addEventListener('click', event => {
      const anchor=event.target.closest('a[href^="#"]');
      if(anchor && !event.defaultPrevented){
        event.preventDefault();
        const id=anchor.getAttribute('href').slice(1);
        if(['top','main','choose'].includes(id)) window.returnToCarousel();
        const target=document.getElementById(id);
        if(target)target.scrollIntoView({block:'start',behavior:'auto'});
      }
      publish();
    });
    document.addEventListener('change',publish);
    document.addEventListener('keydown',()=>queueMicrotask(publish));
    document.addEventListener('toggle',()=>queueMicrotask(publish),true);
    if(embedded){
      window.addEventListener('message',event=>{
        const data=event.data;
        if(event.source!==parent || data?.namespace!=='rbt-viewer-v1' || data.channel!==config.channel || data.type!=='restore')return;
        apply(data.state);send('state',read(),'replace');
      });
      send('ready',read(),'replace');
    }else{
      const saved=history.state?.rbtGuide===1?history.state.state:null;
      if(saved)apply(saved);
      send('state',read(),'replace');
      window.addEventListener('popstate',event=>{if(event.state?.rbtGuide===1)apply(event.state.state);});
    }
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
