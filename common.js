(function(){
  // Load header
  var headerEl = document.getElementById('site-header');
  var footerEl = document.getElementById('site-footer');

  if(headerEl){
    fetch('header.html').then(function(r){return r.text()}).then(function(html){
      headerEl.innerHTML = html;
      // Init nav after loading
      window.addEventListener('scroll',function(){
        var nb = document.getElementById('navbar');
        if(nb) nb.classList.toggle('scrolled',window.scrollY>40);
      });
      var menuBtn = document.getElementById('menuBtn');
      var mmClose = document.getElementById('mmClose');
      var mm = document.getElementById('mm');
      if(menuBtn) menuBtn.addEventListener('click',function(){mm.classList.add('open')});
      if(mmClose) mmClose.addEventListener('click',function(){mm.classList.remove('open')});
      document.querySelectorAll('.mmenu a').forEach(function(a){
        a.addEventListener('click',function(){mm.classList.remove('open')});
      });
    });
  }

if(footerEl){
    fetch('footer.html').then(function(r){return r.text()}).then(function(html){
      footerEl.innerHTML = html;
      if(window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')){
        var banner = document.querySelector('.support-banner');
        if(banner) banner.style.display = 'none';
      }
    });
  }

  // Scroll reveal
  var obs = new IntersectionObserver(function(entries){
    entries.forEach(function(x){if(x.isIntersecting) x.target.classList.add('vis')});
  },{threshold:0.1});
  document.querySelectorAll('.reveal').forEach(function(el){obs.observe(el)});
})();