(function(){
  var NS='http://www.w3.org/2000/svg';
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Soleil qui se lève au défilement ---------- */
  var sun=document.getElementById('sun');
  function sunPos(){
    var max=document.documentElement.scrollHeight-innerHeight;
    var t=max>0?Math.min(1,scrollY/max):0;
    var vmin=Math.min(innerWidth,innerHeight);
    var h=Math.min(1,scrollY/innerHeight);
    var rise=-(0.32+0.45*h+0.2*t)*1.5*vmin;
    sun.style.transform='translateY('+rise+'px)';
    sun.style.opacity=(1-0.8*h).toFixed(2);
  }
  addEventListener('scroll',sunPos,{passive:true});addEventListener('resize',sunPos);sunPos();

  /* ---------- Étirer le fromage ---------- */
  var svg=document.getElementById('pz'),slice=document.getElementById('slice'),body=document.getElementById('sliceBody'),
      shadow=document.getElementById('sliceShadow'),strandsG=document.getElementById('strands'),pull=document.getElementById('pull'),cmEl=document.getElementById('cm');
  var tip={x:200,y:250},L={x:128.2,y:322.5},R={x:271.8,y:322.5};
  function lerp(a,b,t){return {x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};}
  var anchors=[lerp(tip,L,.25),lerp(tip,L,.5),lerp(tip,L,.75),lerp(tip,R,.3),lerp(tip,R,.55),lerp(tip,R,.8),lerp(tip,L,.08)];
  var breakAt=[250,320,210,290,360,230,400];
  var strands=anchors.map(function(a,i){
    var g=document.createElementNS(NS,'g');
    var p1=document.createElementNS(NS,'path');p1.setAttribute('stroke','#EAB23C');
    var p2=document.createElementNS(NS,'path');p2.setAttribute('stroke','#FFE38A');
    g.appendChild(p1);g.appendChild(p2);strandsG.appendChild(g);
    return {a:a,g:g,p1:p1,p2:p2,w:10+(i%3)*3,broken:false};
  });
  var pos={x:0,y:0},vel={x:0,y:0},drag=null,best=0,current=0;

  function render(){
    var d=Math.hypot(pos.x,pos.y);
    var rot=pos.x*0.06;
    slice.setAttribute('transform','translate('+pos.x.toFixed(1)+' '+pos.y.toFixed(1)+') rotate('+rot.toFixed(2)+' 200 250)');
    shadow.setAttribute('opacity',Math.min(.3,d/400).toFixed(2));
    shadow.setAttribute('transform','translate('+(-pos.x).toFixed(1)+' '+(-pos.y).toFixed(1)+')');
    var rad=rot*Math.PI/180,c=Math.cos(rad),s=Math.sin(rad);
    strands.forEach(function(st,i){
      if(d<3||st.broken){st.g.style.display='none';return;}
      st.g.style.display='';
      var a=st.a;
      var rx=a.x-200,ry=a.y-250;
      var b={x:200+rx*c-ry*s+pos.x,y:250+rx*s+ry*c+pos.y};
      var sag=Math.min(70,d*0.22)*(0.7+0.15*(i%3));
      var c1={x:a.x+(b.x-a.x)*.3,y:a.y+(b.y-a.y)*.3+sag};
      var c2={x:a.x+(b.x-a.x)*.7,y:a.y+(b.y-a.y)*.7+sag*.8};
      var dd='M'+a.x.toFixed(1)+' '+a.y.toFixed(1)+'C'+c1.x.toFixed(1)+' '+c1.y.toFixed(1)+' '+c2.x.toFixed(1)+' '+c2.y.toFixed(1)+' '+b.x.toFixed(1)+' '+b.y.toFixed(1);
      var w=Math.max(3,st.w-d/40);
      st.p1.setAttribute('d',dd);st.p1.setAttribute('stroke-width',w.toFixed(2));
      st.p2.setAttribute('d',dd);st.p2.setAttribute('stroke-width',(w*.4).toFixed(2));
    });
    current=Math.round(d/8);
    cmEl.textContent=current;
  }
  function pt(e){
    var r=svg.getBoundingClientRect();
    return {x:(e.clientX-r.left)*400/r.width,y:(e.clientY-r.top)*260/r.height+120};
  }
  pull.addEventListener('pointerdown',function(e){
    drag={start:pt(e),ox:pos.x,oy:pos.y};
    strands.forEach(function(s){s.broken=false;});
    pull.setPointerCapture(e.pointerId);pull.classList.add('is-done');pull.style.cursor='grabbing';
    autoplay=false;
  });
  pull.addEventListener('pointermove',function(e){
    if(!drag)return;
    var p=pt(e);
    var nx=drag.ox+(p.x-drag.start.x),ny=drag.oy+(p.y-drag.start.y);
    ny=Math.min(20,ny);
    pos.x=Math.max(-160,Math.min(160,nx));pos.y=Math.max(-260,ny);
    var d=Math.hypot(pos.x,pos.y);
    strands.forEach(function(s,i){if(d>breakAt[i])s.broken=true;});
    render();
  });
  function release(){
    if(!drag)return;drag=null;pull.style.cursor='';
    if(current>best){best=current;}
    cmEl.parentNode.querySelector('span').textContent=best>0?'cm de fromage étiré. Record : '+best+' cm.':'cm de fromage étiré.';
    spring();
  }
  pull.addEventListener('pointerup',release);pull.addEventListener('pointercancel',release);
  function spring(){
    if(reduce){pos.x=0;pos.y=0;render();return;}
    var k=.12,damp=.72;
    (function step(){
      if(drag)return;
      vel.x=(vel.x+(-pos.x)*k)*damp;vel.y=(vel.y+(-pos.y)*k)*damp;
      pos.x+=vel.x;pos.y+=vel.y;
      if(Math.abs(pos.x)+Math.abs(pos.y)+Math.abs(vel.x)+Math.abs(vel.y)<.3){pos.x=0;pos.y=0;render();cmEl.textContent='0';return;}
      render();requestAnimationFrame(step);
    })();
  }
  /* démonstration automatique au chargement */
  var autoplay=!reduce;
  function demo(){
    if(!autoplay)return;
    var t0=performance.now();
    (function step(now){
      if(!autoplay)return;
      var t=(now-t0)/1400;
      if(t<1){var e=Math.sin(t*Math.PI/2);pos.x=-10*e;pos.y=-150*e;render();requestAnimationFrame(step);}
      else{setTimeout(function(){if(autoplay)spring();setTimeout(function(){if(autoplay)demo();},2600);},500);}
    })(t0);
  }
  render();setTimeout(demo,900);

  /* ---------- Un plat, un Matino ---------- */
  var IC={
    'Petit-déj':'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M8 20h26v8a12 12 0 0 1-12 12h-2A12 12 0 0 1 8 28z"/><path d="M34 22h3a5 5 0 0 1 0 10h-4"/><path d="M16 8c-2 3 2 5 0 8M24 8c-2 3 2 5 0 8"/></svg>',
    'Sandwich':'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M6 30 42 18v6L6 36z"/><path d="M6 30 24 12l18 6"/><path d="M8 36l2 4 30-12v-4"/></svg>',
    'Burger':'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M8 20a16 10 0 0 1 32 0z"/><path d="M6 26h36M10 26l4 4 4-4 4 4 4-4 4 4 4-4"/><path d="M8 34h32a0 0 0 0 1 0 0 4 4 0 0 1-4 4H12a4 4 0 0 1-4-4z"/></svg>',
    'Pâtes':'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 26h36a18 14 0 0 1-36 0z"/><path d="M14 26c0-8 4-14 8-14M22 26c0-6 2-12 6-12M30 26c0-6 4-10 8-10"/></svg>',
    'Salade':'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 24h36a18 14 0 0 1-36 0z"/><path d="M14 24c-2-8 6-12 10-8 4-6 14-2 10 8"/></svg>',
    'Gâteau':'<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><path d="M8 24h32v16H8z"/><path d="M8 30c4 3 8-3 12 0s8 3 12 0 6-2 8 0"/><path d="M24 16v8M24 10a2 3 0 0 1 0 6"/></svg>'
  };
  var MATCH={
    'Petit-déj':{id:'creme-cheese',t:'Sur une tartine chaude, la Crème Cheese fond doucement. Le geste du matin, en famille.'},
    'Sandwich':{id:'barre-maasdam',t:'Le Maasdam en tranches apporte une saveur douce et un fondant crémeux aux sandwichs de tous les jours.'},
    'Burger':{id:'barre-cheddar',t:'Une tranche de Cheddar posée sur le steak encore chaud : le burger maison prend une autre dimension.'},
    'Pâtes':{id:'barre-gouda',t:'Râpé sur des pâtes ou glissé dans un gratin, le Gouda file à la cuisson.'},
    'Salade':{id:'mayo-bocal',t:'La mayonnaise Matino Joy, onctueuse, pour les salades composées et les entrées.'},
    'Gâteau':{id:'lait-ecreme',t:'La poudre de lait Matino, l’ingrédient discret des gâteaux moelleux et des crèmes pâtissières.'}
  };
  var dishes=document.getElementById('dishes'),match=document.getElementById('match');
  function byId(id){return LDM_PRODUCTS.filter(function(p){return p.id===id;})[0];}
  function pick(k){
    var m=MATCH[k],p=byId(m.id);
    dishes.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.k===k?'true':'false');});
    match.innerHTML='<div class="v-match-img"><img src="'+p.img+'" alt="'+p.name+'"></div><div class="v-match-txt"><small>Pour '+k.toLowerCase()+'</small><h3>'+p.name+'</h3><p>'+m.t+'</p><a href="../produit.html?id='+p.id+'">Voir la fiche produit</a></div>';
  }
  Object.keys(MATCH).forEach(function(k){
    var b=document.createElement('button');b.className='v-dish';b.dataset.k=k;b.innerHTML=IC[k]+k;b.onclick=function(){pick(k);};dishes.appendChild(b);
  });
  pick('Sandwich');

  /* ---------- Comptoir ---------- */
  var RAIL=[['barre-gouda','v-yellow','Gouda'],['barre-edam','v-red','Edam'],['barre-maasdam','v-blue','Maasdam'],['barre-cheddar','v-green','Cheddar'],['creme-gruyere','v-blue','Gruyère'],['creme-edam','v-red','Edam'],['creme-gouda','v-yellow','Gouda'],['camembert-barquette','v-white','Camembert'],['creme-cheese','v-blue','Cream'],['mayo-bocal','v-yellow','Joy'],['lait-ecreme','v-blue','Lait'],['boite-chef','v-green','Chef']];
  var rail=document.getElementById('rail');
  RAIL.forEach(function(r,i){
    var p=byId(r[0]);if(!p)return;
    var a=document.createElement('a');a.className='v-slab '+r[1];a.href='../produit.html?id='+p.id;
    a.style.setProperty('--rot',(i%2?6:-8)+'deg');
    a.innerHTML='<span class="big">'+r[2]+'</span><img loading="lazy" src="'+p.img+'" alt="'+p.name+'"><h3>'+p.name+'</h3><span>'+p.brand+' · '+p.format+'</span>';
    rail.appendChild(a);
  });
  document.querySelectorAll('.v-rail-nav button').forEach(function(b){
    b.onclick=function(){rail.scrollBy({left:(+b.dataset.dir)*Math.min(360,rail.clientWidth*.8),behavior:'smooth'});};
  });
})();
