"use strict";
const fallback={guests:{zang:{name:"臧潞",role:"瑞金医院普外科副主任",field:"胃肠肿瘤微创外科",question:"对医学的热爱，一定要从入学时就非常坚定吗？",audioSrc:null,transcript:null},du:{name:"杜鹏",role:"新华医院结直肠肛门外科学科带头人",field:"炎症性肠病与结直肠肿瘤外科",question:"一个看似细小的问题，为什么值得长期投入？",audioSrc:null,transcript:null},zheng:{name:"郑宪友",role:"第六人民医院手与修复重建外科学科带头人",field:"复杂肢体损伤显微修复与重建",question:"一次治疗的意义，怎样延伸到患者以后的生活？",audioSrc:null,transcript:null}},recaps:[{title:"活动纪要",description:"回看当晚的交流与成长启发",url:null},{title:"臧潞老师 · 回顾学习推送",description:"从从医认同到方向探索",url:null},{title:"杜鹏老师 · 回顾学习推送",description:"从患者需要到持续精进",url:null},{title:"郑宪友老师 · 回顾学习推送",description:"从修复重建到青年成长",url:null}]};
let content=fallback;
let selected="zang";
const tabs=[...document.querySelectorAll(".guest-tab")];
const audio=document.getElementById("guest-audio");
const $=id=>document.getElementById(id);
function safeUrl(value){if(!value||typeof value!=="string")return null;try{const u=new URL(value,window.location.href);return ["http:","https:"].includes(u.protocol)?u.href:null}catch{return null}}
function selectGuest(id,announce=true){
  const guest=content.guests[id];if(!guest)return;selected=id;
  tabs.forEach(t=>{const active=t.dataset.guest===id;t.classList.toggle("active",active);t.setAttribute("aria-selected",String(active));t.tabIndex=active?0:-1});
  $("voice-panel").setAttribute("aria-labelledby",`tab-${id}`);
  $("voice-name").replaceChildren(document.createTextNode(guest.name));
  const teacher=document.createElement("span");teacher.textContent="老师";$("voice-name").append(teacher);
  $("voice-role").textContent=guest.role;$("voice-field").textContent=guest.field;$("voice-hook").textContent=guest.question;
  $("story-link").href=`#story-${id}`;
  audio.pause();const src=safeUrl(guest.audioSrc);audio.removeAttribute("src");
  $("audio-placeholder").hidden=!!src;audio.hidden=!src;
  if(src){audio.src=src;audio.setAttribute("aria-label",`${guest.name}老师的语音寄语`);$("audio-status").textContent="已上线";$("audio-message").textContent="点击播放，聆听老师留给青年的一份嘱托。"}
  else{$("audio-status").textContent="待更新";$("audio-message").textContent="老师的语音寄语正在准备中，上线后可在这里聆听。"}
  audio.load();
  $("transcript-text").textContent=guest.transcript||"经老师确认的寄语文字稿将在这里同步更新，方便你随时阅读。";
  if(announce)$("announcement").textContent=`已切换至${guest.name}老师的寄语${src?"":"，语音待更新"}`;
}
function renderRecaps(){
  const list=$("recap-list");list.replaceChildren();
  for(const [i,recap]of content.recaps.entries()){
    const row=document.createElement("div");row.className="recap-row";
    const icon=document.createElement("span");icon.className="recap-icon";icon.textContent=i===0?"≡":"↗";icon.setAttribute("aria-hidden","true");
    const text=document.createElement("div");text.className="recap-text";
    const title=document.createElement("h3");title.textContent=recap.title;
    const desc=document.createElement("p");desc.textContent=recap.description;text.append(title,desc);
    const status=document.createElement("span");status.className="status";
    const url=safeUrl(recap.url);
    if(url){const link=document.createElement("a");link.href=url;link.target="_blank";link.rel="noopener noreferrer";link.setAttribute("aria-label",`${recap.title}，在新窗口打开`);status.textContent="阅读全文 ↗";link.append(icon,text,status);row.append(link)}
    else{status.textContent="会后更新";row.append(icon,text,status)}
    list.append(row);
  }
}
tabs.forEach((tab,index)=>{
  tab.addEventListener("click",()=>selectGuest(tab.dataset.guest));
  tab.addEventListener("keydown",event=>{
    let next=null;
    if(event.key==="ArrowRight")next=(index+1)%tabs.length;
    if(event.key==="ArrowLeft")next=(index+tabs.length-1)%tabs.length;
    if(event.key==="Home")next=0;if(event.key==="End")next=tabs.length-1;
    if(next!==null){event.preventDefault();tabs[next].focus();selectGuest(tabs[next].dataset.guest)}
  });
});
audio.addEventListener("error",()=>{$("audio-message").textContent="这段语音暂时无法播放，请稍后重试。你也可以先阅读下方文字稿。"});
selectGuest(selected,false);renderRecaps();
fetch("content.json",{cache:"no-store"}).then(response=>{if(!response.ok)throw new Error("content unavailable");return response.json()}).then(data=>{if(!data.guests||!Array.isArray(data.recaps))throw new Error("content invalid");for(const id of ["zang","du","zheng"]){if(!data.guests[id]?.name)throw new Error("guest missing")}content=data;selectGuest(selected,false);renderRecaps()}).catch(()=>{});
