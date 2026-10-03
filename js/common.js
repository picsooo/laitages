(function(){
  var html = document.documentElement;
  var base = html.getAttribute('data-base') || '';
  var version = html.getAttribute('data-version') || 'corporate';

  /* Bandeau démo */
  var bar = document.createElement('div');
  bar.className = 'ldm-demo';
  bar.innerHTML = '<span>Maquette de démonstration réalisée par <b>Webminds</b> · aucun formulaire n\u2019est enregistré</span>';
  document.body.appendChild(bar);

  /* Pastille de changement de version */
  var pill = document.createElement('a');
  pill.className = 'ldm-switch';
  if (version === 'corporate') {
    pill.href = base + 'v2/index.html';
    pill.innerHTML = '<span class="ldm-switch-dot"></span>Découvrir la version moderne';
  } else {
    pill.href = base + 'index.html';
    pill.innerHTML = '<span class="ldm-switch-dot"></span>Découvrir la version corporate';
  }
  document.body.appendChild(pill);

  /* Menu mobile */
  var burger = document.querySelector('[data-burger]');
  var nav = document.querySelector('[data-nav]');
  if (burger && nav) {
    burger.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('ldm-lock', open);
    });
    nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ nav.classList.remove('is-open'); document.body.classList.remove('ldm-lock'); }); });
  }

  /* Formulaires factices */
  document.querySelectorAll('form[data-fake]').forEach(function(f){
    f.addEventListener('submit', function(e){
      e.preventDefault();
      var ok = f.querySelector('.ldm-ok');
      if (!ok) { ok = document.createElement('p'); ok.className = 'ldm-ok'; f.appendChild(ok); }
      ok.textContent = f.getAttribute('data-fake') || 'Merci, votre message a bien été reçu. (Démonstration : rien n\u2019est envoyé.)';
      ok.hidden = false;
      f.querySelectorAll('input,textarea,select').forEach(function(i){ if(i.type!=='checkbox') i.value=''; });
    });
  });

  /* Image distante indisponible : carte de couleur */
  window.LDM_imgFallback = function(img){
    var w = img.closest('[data-pimg]');
    if (w) w.classList.add('is-fallback');
    img.remove();
  };

  /* Lien de nav actif */
  var page = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('[data-nav] a').forEach(function(a){
    if (a.getAttribute('href') === page) a.setAttribute('aria-current','page');
  });
})();
