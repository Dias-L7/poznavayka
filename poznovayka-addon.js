/* Позновайка — қосымша модуль. Негізгі index.html/style.css/script.js файлдарын алмастырмайды.
   Қосу: index.html ішіндегі <script src="script.js"></script> жолынан кейін осы файлды қосыңыз. */
(() => {
  'use strict';
  const STYLE_ID = 'pz-addon-style';
  const PANEL_ID = 'pz-addon-panel';
  const facts = [
    {country:'Қазақстан', fact:'Қазақстан — дүниежүзі бойынша аумағы ең үлкен теңізге тікелей шыға алмайтын мемлекет.'},
    {country:'Жапония', fact:'Жапония мыңдаған аралдан тұрады; төрт ірі аралы — Хонсю, Хоккайдо, Кюсю және Сикоку.'},
    {country:'Бразилия', fact:'Бразилияда Амазония орманының үлкен бөлігі орналасқан.'},
    {country:'Египет', fact:'Ежелгі Мысыр өркениеті Ніл өзенінің бойында дамыды.'},
    {country:'Исландия', fact:'Исландия геотермалдық энергияны кеңінен пайдаланады.'},
    {country:'Австралия', fact:'Австралия әрі ел, әрі тұтас құрлық атауы ретінде қолданылады.'},
    {country:'Канада', fact:'Канадада әлемдегі көлдердің өте үлкен үлесі орналасқан.'},
    {country:'Үндістан', fact:'Үндістанда жүздеген тіл мен тілдік нұсқалар қолданылады.'}
  ];
  const escapeHTML = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function addStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s=document.createElement('style'); s.id=STYLE_ID;
    s.textContent=`
      #${PANEL_ID}{max-width:1180px;margin:26px auto;padding:0 20px;font-family:inherit;color:var(--text,#14283d)}
      #${PANEL_ID} .pza-head{display:flex;align-items:center;gap:12px;margin-bottom:16px}
      #${PANEL_ID} .pza-mark{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,#6d5dfc,#20b8a6);color:white;font-weight:900;font-size:22px}
      #${PANEL_ID} h2{margin:0;font-size:clamp(21px,3vw,28px)} #${PANEL_ID} .pza-sub{margin:4px 0 0;opacity:.7;font-size:14px}
      #${PANEL_ID} .pza-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
      #${PANEL_ID} .pza-card{padding:18px;border:1px solid var(--border,#dce4ee);border-radius:18px;background:var(--card,#fff);box-shadow:0 8px 28px #152d4810;min-width:0}
      #${PANEL_ID} .pza-card h3{margin:0 0 10px;font-size:17px} #${PANEL_ID} .pza-card p{line-height:1.6;font-size:14px}
      #${PANEL_ID} button,#${PANEL_ID} select{font:inherit;border-radius:10px;padding:10px 12px;border:1px solid var(--border,#dce4ee);background:var(--card,#fff);color:inherit;max-width:100%}
      #${PANEL_ID} button{cursor:pointer;font-weight:700} #${PANEL_ID} .pza-primary{background:#2458d3;color:#fff;border-color:#2458d3}
      #${PANEL_ID} .pza-fact{font-size:15px;min-height:74px} #${PANEL_ID} .pza-row{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}
      #${PANEL_ID} .pza-result{margin-top:12px;padding:12px;border-radius:12px;background:var(--soft,#f2f6fb);font-size:14px;line-height:1.6;overflow-wrap:anywhere}
      #${PANEL_ID} .pza-flash{min-height:105px;display:grid;place-items:center;text-align:center;padding:12px;border-radius:14px;background:var(--soft,#f2f6fb);font-weight:800;font-size:17px;line-height:1.5}
      #${PANEL_ID} .pza-muted{opacity:.7;font-size:12px}
      @media(max-width:820px){#${PANEL_ID} .pza-grid{grid-template-columns:1fr 1fr}}
      @media(max-width:560px){#${PANEL_ID}{padding:0 14px}#${PANEL_ID} .pza-grid{grid-template-columns:1fr}#${PANEL_ID} .pza-card{padding:15px}}
    `; document.head.appendChild(s);
  }
  function countryOptions(){
    const list=[['KAZ','Қазақстан'],['JPN','Жапония'],['FRA','Франция'],['BRA','Бразилия'],['EGY','Египет'],['CAN','Канада'],['AUS','Аустралия'],['IND','Үндістан'],['ISL','Исландия'],['USA','АҚШ'],['DEU','Германия'],['ITA','Италия'],['KOR','Оңтүстік Корея'],['TUR','Түркия'],['CHN','Қытай']];
    return list.map(([code,name])=>`<option value="${code}">${name}</option>`).join('');
  }
  function panelHTML(){
    const day=Math.floor(Date.now()/86400000), f=facts[((day%facts.length)+facts.length)%facts.length];
    return `<section id="${PANEL_ID}" aria-label="Қосымша білім құралдары">
      <div class="pza-head"><div class="pza-mark">+</div><div><h2>Білім зертханасы</h2><p class="pza-sub">Негізгі сайтқа қосымша: елдерді салыстыр, күннің дерегін оқы, карточкамен қайтала.</p></div></div>
      <div class="pza-grid">
        <article class="pza-card"><h3>🌍 Елдерді салыстыру</h3><p>Екі елдің астанасын, аймағын және негізгі мәліметтерін салыстыр.</p>
          <label for="pza-a" class="pza-muted">Бірінші ел</label><br><select id="pza-a">${countryOptions()}</select>
          <div style="height:8px"></div><label for="pza-b" class="pza-muted">Екінші ел</label><br><select id="pza-b">${countryOptions()}</select>
          <div class="pza-row"><button class="pza-primary" id="pza-compare">Салыстыру</button></div><div id="pza-compare-result" class="pza-result" aria-live="polite">Екі елді таңда.</div>
        </article>
        <article class="pza-card"><h3>💡 Күннің қызықты дерегі</h3><p class="pza-muted">Күн сайын автоматты түрде ауысады.</p><div class="pza-fact" id="pza-fact"><b>${escapeHTML(f.country)}:</b> ${escapeHTML(f.fact)}</div><div class="pza-row"><button id="pza-next-fact">Тағы бір дерек</button></div></article>
        <article class="pza-card"><h3>🧠 Есте сақтау карточкалары</h3><p class="pza-muted">Өзіңді тексер: алдымен сұрақты оқы, кейін жауабын аш.</p><div class="pza-flash" id="pza-flash">Қазақстанның астанасы қай қала?</div><div class="pza-row"><button id="pza-reveal" class="pza-primary">Жауабын көрсету</button><button id="pza-next-card">Келесі сұрақ</button></div><div id="pza-card-count" class="pza-muted" style="margin-top:8px">1 / 8</div></article>
      </div>
      <p class="pza-muted" style="margin-top:12px">Қосымша модуль негізгі карта мен викторинаны алмастырмайды. Бұл бөлім браузерде жұмыс істейді.</p>
    </section>`;
  }
  const cards=[
    ['Қазақстанның астанасы қай қала?','Астана'],['Жапонияның астанасы қай қала?','Токио'],['Францияның астанасы қай қала?','Париж'],['Бразилияның ресми тілі қандай?','Португал тілі'],['Египеттегі әйгілі көне құрылыстар қалай аталады?','Пирамидалар'],['Канадада кең таралған екі ресми тіл қандай?','Ағылшын және француз тілдері'],['Аустралияның астанасы қай қала?','Канберра'],['Жер шарындағы ең үлкен мұхит қайсы?','Тынық мұхиты']
  ];
  const countryData={KAZ:{name:'Қазақстан',capital:'Астана',region:'Орталық Азия',currency:'теңге'},JPN:{name:'Жапония',capital:'Токио',region:'Шығыс Азия',currency:'иена'},FRA:{name:'Франция',capital:'Париж',region:'Еуропа',currency:'еуро'},BRA:{name:'Бразилия',capital:'Бразилиа',region:'Оңтүстік Америка',currency:'реал'},EGY:{name:'Египет',capital:'Каир',region:'Африка',currency:'мысыр фунты'},CAN:{name:'Канада',capital:'Оттава',region:'Солтүстік Америка',currency:'канадалық доллар'},AUS:{name:'Аустралия',capital:'Канберра',region:'Океания',currency:'аустралиялық доллар'},IND:{name:'Үндістан',capital:'Нью-Дели',region:'Оңтүстік Азия',currency:'үнді рупиясы'},ISL:{name:'Исландия',capital:'Рейкьявик',region:'Еуропа',currency:'исланд кронасы'},USA:{name:'АҚШ',capital:'Вашингтон',region:'Солтүстік Америка',currency:'АҚШ доллары'},DEU:{name:'Германия',capital:'Берлин',region:'Еуропа',currency:'еуро'},ITA:{name:'Италия',capital:'Рим',region:'Еуропа',currency:'еуро'},KOR:{name:'Оңтүстік Корея',capital:'Сеул',region:'Шығыс Азия',currency:'вона'},TUR:{name:'Түркия',capital:'Анкара',region:'Еуразия',currency:'түрік лирасы'},CHN:{name:'Қытай',capital:'Бейжің',region:'Шығыс Азия',currency:'юань'}};
  function init(){
    const app=document.getElementById('app'); if(!app) return;
    addStyles();
    if(!document.getElementById(PANEL_ID)) app.insertAdjacentHTML('beforeend',panelHTML());
    const root=document.getElementById(PANEL_ID); if(!root||root.dataset.ready) return; root.dataset.ready='1';
    let fi=Math.floor(Date.now()/86400000)%facts.length, ci=0, revealed=false;
    const selectA=root.querySelector('#pza-a'), selectB=root.querySelector('#pza-b'); selectA.value='KAZ'; selectB.value='JPN';
    root.querySelector('#pza-compare').addEventListener('click',()=>{
      const a=countryData[selectA.value],b=countryData[selectB.value],out=root.querySelector('#pza-compare-result');
      if(!a||!b)return;
      if(selectA.value===selectB.value){out.textContent='Салыстыру үшін екі түрлі елді таңда.';return;}
      out.innerHTML=`<b>${escapeHTML(a.name)} ↔ ${escapeHTML(b.name)}</b><br>🏛️ Астаналары: ${escapeHTML(a.capital)} / ${escapeHTML(b.capital)}<br>🗺️ Аймақтары: ${escapeHTML(a.region)} / ${escapeHTML(b.region)}<br>💰 Валюталары: ${escapeHTML(a.currency)} / ${escapeHTML(b.currency)}<br><span class="pza-muted">Бұл — оқу мақсатындағы қысқаша салыстыру.</span>`;
    });
    root.querySelector('#pza-next-fact').addEventListener('click',()=>{fi=(fi+1)%facts.length;const f=facts[fi];root.querySelector('#pza-fact').innerHTML=`<b>${escapeHTML(f.country)}:</b> ${escapeHTML(f.fact)}`;});
    const drawCard=()=>{revealed=false;root.querySelector('#pza-flash').textContent=cards[ci][0];root.querySelector('#pza-reveal').textContent='Жауабын көрсету';root.querySelector('#pza-card-count').textContent=`${ci+1} / ${cards.length}`;};
    root.querySelector('#pza-reveal').addEventListener('click',()=>{revealed=!revealed;root.querySelector('#pza-flash').textContent=revealed?cards[ci][1]:cards[ci][0];root.querySelector('#pza-reveal').textContent=revealed?'Сұраққа қайту':'Жауабын көрсету';});
    root.querySelector('#pza-next-card').addEventListener('click',()=>{ci=(ci+1)%cards.length;drawCard();});
    drawCard();
  }
  // Main app re-renders #app on route changes; observe it so the add-on remains available.
  const start=()=>{init();const app=document.getElementById('app');if(app&&window.MutationObserver){new MutationObserver(()=>{if(!document.getElementById(PANEL_ID))init();}).observe(app,{childList:true});}};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
