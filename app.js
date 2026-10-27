"use strict";
const fallback={"guests":{"zang":{"name":"臧潞","role":"上海交通大学医学院附属瑞金医院普外科副主任","field":"胃肠肿瘤微创外科","question":"如果理想并不是起点自带的答案，那么它是怎样在日复一日的临床淬炼中被发现、被确认？","audioSrc":null,"transcript":null},"du":{"name":"杜鹏","role":"上海交通大学医学院附属新华医院副院长","field":"炎症性肠病与结直肠肿瘤外科","question":"一个患者的故事如何锚定一生的研究方向？","audioSrc":null,"transcript":null},"zheng":{"name":"郑宪友","role":"上海交通大学医学院附属第六人民医院副院长","field":"复杂肢体损伤显微修复与重建","question":"面对陌生领域的畏惧，如何不随波逐流，找到属于自己的深耕之地？","audioSrc":null,"transcript":null}},"recaps":[{"title":"当晚，我们聊了些什么","description":"活动纪要 · 访谈中的故事、思考与青年提问","url":null},{"title":"臧潞老师 · 回顾学习推送","description":"从从医认同到方向探索","url":null},{"title":"杜鹏老师 · 回顾学习推送","description":"从患者需要到持续精进","url":null},{"title":"郑宪友老师 · 回顾学习推送","description":"从修复重建到青年成长","url":null}]};
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
  else{$("audio-status").textContent="待发布";$("audio-message").textContent="老师的语音寄语正在准备中，上线后可在这里聆听。"}
  audio.load();
  $("transcript-text").textContent=guest.transcript||"经老师确认的寄语文字稿将在这里同步更新，方便你随时阅读。";
  if(announce)$("announcement").textContent=`已切换至${guest.name}老师的寄语${src?"":"，语音待发布"}`;
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
    else{status.textContent="活动后揭秘";row.append(icon,text,status)}
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
