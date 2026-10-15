/* Gigantes Estates (Pty) Ltd — accessible menu and email-draft enquiry form */
(()=>{'use strict';
const body=document.body,open=document.querySelector('[data-mobile-open]'),close=document.querySelector('[data-mobile-close]'),panel=document.querySelector('#mobile-panel'),backdrop=document.querySelector('#mobile-backdrop');let focusBefore;
function setMenu(show){if(!panel)return;if(show)focusBefore=document.activeElement;panel.classList.toggle('open',show);backdrop?.classList.toggle('visible',show);body.classList.toggle('nav-open',show);open?.setAttribute('aria-expanded',String(show));panel.setAttribute('aria-hidden',String(!show));panel.toggleAttribute('inert',!show);if(show)close?.focus();else focusBefore?.focus();}
open?.addEventListener('click',()=>setMenu(true));close?.addEventListener('click',()=>setMenu(false));backdrop?.addEventListener('click',()=>setMenu(false));panel?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&panel?.classList.contains('open'))setMenu(false);if(e.key!=='Tab'||!panel?.classList.contains('open'))return;const nodes=[...panel.querySelectorAll('a,button')].filter(n=>!n.disabled);const first=nodes[0],last=nodes[nodes.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
const top=document.querySelector('.scroll-top');if(top){const adjust=()=>top.classList.toggle('show',window.scrollY>650);window.addEventListener('scroll',adjust,{passive:true});top.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));adjust()}
const form=document.querySelector('#contact-form');
if(form){form.addEventListener('submit',event=>{
 event.preventDefault();if(!form.reportValidity())return;
 const data=new FormData(form);if(data.get('website'))return;
 const clean=v=>String(v||'').replace(/[\r\n]+/g,' ').trim();
 const first=clean(data.get('firstName')).slice(0,100),last=clean(data.get('lastName')).slice(0,100);
 const reply=clean(data.get('email')).slice(0,200),phone=clean(data.get('phone')).slice(0,40);
 const service=clean(data.get('subject')).slice(0,180),message=String(data.get('message')||'').trim().slice(0,3500);
 const name=(first+' '+last).trim();
 const subject='Gigantes Estates enquiry — '+service;
 const body='Hello Gigantes Estates team,\n\nI would like to enquire about your estate administration services.\n\nName: '+name+'\nEmail: '+reply+'\nTelephone: '+(phone||'Not provided')+'\nSubject: '+service+'\n\nMessage:\n'+message+'\n\nKind regards,\n'+name;
 const status=document.querySelector('#form-status');if(status)status.textContent='Your email application should open with an enquiry draft. Review it and press Send; this website has not submitted your enquiry.';
 window.location.href='mailto:illse@ina-law.co.za?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
});}
})();
