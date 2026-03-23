
var scrips=[
{day:'Sun',name:'Bhagavad Gita',desc:'Duty, devotion, knowledge - the eternal dialogue between Sri Krishna and Arjuna.',tag:'Today',icon:'📖'},
{day:'Mon',name:'Letters of Swamiji',desc:'Practical spirituality, organizational wisdom, and fiery inspiration.',tag:'Mon',icon:'✉️'},
{day:'Tue',name:'Sri Maa Life',desc:'The Holy Mother - extraordinary life of patience, love, and power.',tag:'Tue',icon:'🙏'},
{day:'Wed',name:'Kathamrita',desc:'Recorded conversations of the Master at Dakshineshwar.',tag:'Wed',icon:'📜'},
{day:'Thu',name:'Naradiya Bhakti',desc:'Sage Narada - aphorisms on supreme devotion and divine love.',tag:'Thu',icon:'💎'},
{day:'Fri',name:'Lila Prasanga',desc:'Biography of Sri Ramakrishna by Swami Saradananda.',tag:'Fri',icon:'📕'},
{day:'Sat',name:'Kathamrita / Gita',desc:'Alternating devotional and philosophical inquiry.',tag:'Sat',icon:'🕉️'}
];
var st=document.getElementById('scripTrack');
var sd=document.getElementById('scripDetail');
if(st&&sd){
  function renderChips(){
    var html='';
    for(var i=0;i<scrips.length;i++){
      html+='<div class="scrip__chip'+(i===0?' on':'')+'" data-i="'+i+'">';
      html+='<div class="scrip__chip-day">'+scrips[i].day+'</div>';
      html+='<div class="scrip__chip-name">'+scrips[i].name+'</div></div>';
    }
    st.innerHTML=html;
  }
  function showScrip(idx){
    var s=scrips[idx];
    sd.innerHTML='<h3><span class="scrip__detail-icon">'+s.icon+'</span> '+s.name+'</h3><p>'+s.desc+'</p><span class="tag">'+s.tag+'</span>';
  }
  renderChips();
  showScrip(0);
  st.addEventListener('click',function(e){
    var chip=e.target.closest('.scrip__chip');
    if(!chip)return;
    var all=st.querySelectorAll('.scrip__chip');
    for(var j=0;j<all.length;j++){all[j].classList.remove('on');}
    chip.classList.add('on');
    showScrip(parseInt(chip.getAttribute('data-i')));
  });
}



(function(){

  // Render photos from shared data
var galleryTrack = document.getElementById('galleryTrack');
if(galleryTrack && typeof PHOTO_ALBUMS !== 'undefined'){
  var html = '';
  for(var i = 0; i < PHOTO_ALBUMS.length; i++){
    var a = PHOTO_ALBUMS[i];
    html += '<a href="' + a.link + '" target="_blank" class="gallery__card">';
    html += '<img src="' + a.img + '" alt="' + a.title + '" loading="lazy">';
    html += '<div class="gallery__card__overlay">' + a.title + '<small>View Album →</small></div>';
    html += '</a>';
  }
  galleryTrack.innerHTML = html;
}
  // ===== PHOTO CAROUSEL =====
  var track=document.getElementById('galleryTrack');
  var prev=document.getElementById('galPrev');
  var next=document.getElementById('galNext');
  if(track&&prev&&next){
    var amt=300;
    next.addEventListener('click',function(){track.scrollBy({left:amt,behavior:'smooth'})});
    prev.addEventListener('click',function(){track.scrollBy({left:-amt,behavior:'smooth'})});
    var auto=setInterval(function(){
      if(track.scrollLeft+track.clientWidth>=track.scrollWidth-10){
        track.scrollTo({left:0,behavior:'smooth'});
      }else{
        track.scrollBy({left:amt,behavior:'smooth'});
      }
    },4000);
    track.addEventListener('mouseenter',function(){clearInterval(auto)});
    track.addEventListener('touchstart',function(){clearInterval(auto)},{passive:true});
  }

  // ===== VIDEO CAROUSEL (dynamic from YouTube RSS) =====
  var CHANNEL_ID = 'UCWQV-jSVceauuIA7nOFYndA';
  var MAX_VIDEOS = 6;
  var vtrack = document.getElementById('videoTrack');
  var vprev = document.getElementById('vidPrev');
  var vnext = document.getElementById('vidNext');

  if(vtrack){
    var rssUrl = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + CHANNEL_ID;
    var apiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl);

    fetch(apiUrl)
      .then(function(r){ return r.json() })
      .then(function(data){
        if(!data.items || data.items.length === 0){
          vtrack.innerHTML = '<p style="color:var(--earth-light);padding:2rem">No videos found. <a href="https://www.youtube.com/@DakshineshwarRamakrishnaMath/videos" target="_blank" style="color:var(--saffron)">Watch on YouTube →</a></p>';
          return;
        }
        var videos = data.items.slice(0, MAX_VIDEOS);
        var html = '';
        for(var i = 0; i < videos.length; i++){
          var v = videos[i];
          var videoId = '';
          if(v.link){
            var match = v.link.match(/[?&]v=([^&]+)/);
            if(match) videoId = match[1];
          }
          if(!videoId) continue;

          html += '<div style="flex:0 0 320px;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px var(--shadow);background:var(--white)">';
          html += '<div style="position:relative;padding-bottom:56.25%;height:0;background:#000">';
          html += '<iframe src="https://www.youtube.com/embed/' + videoId + '" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none" allowfullscreen loading="lazy"></iframe>';
          html += '</div>';
          html += '<div style="padding:.7rem 1rem">';
          html += '<div style="font-family:var(--serif);font-size:.95rem;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + (v.title || '') + '</div>';
          var date = v.pubDate ? new Date(v.pubDate).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}) : '';
          html += '<div style="font-size:.68rem;color:var(--earth-light);margin-top:.2rem">' + date + '</div>';
          html += '</div></div>';
        }
        vtrack.innerHTML = html;
      })
      .catch(function(){
        vtrack.innerHTML = '<p style="color:var(--earth-light);padding:2rem">Could not load videos. <a href="https://www.youtube.com/@DakshineshwarRamakrishnaMath/videos" target="_blank" style="color:var(--saffron)">Watch on YouTube →</a></p>';
      });

    if(vprev&&vnext){
      vnext.addEventListener('click',function(){vtrack.scrollBy({left:340,behavior:'smooth'})});
      vprev.addEventListener('click',function(){vtrack.scrollBy({left:-340,behavior:'smooth'})});
    }
  }

  // ===== TAB SWITCHING =====
  var tabs = document.querySelectorAll('#mediaTabs button');
  var photosPanel = document.getElementById('photosPanel');
  var videosPanel = document.getElementById('videosPanel');
  tabs.forEach(function(tab){
    tab.addEventListener('click',function(){
      tabs.forEach(function(t){t.classList.remove('active')});
      tab.classList.add('active');
      if(tab.getAttribute('data-tab') === 'videos'){
        photosPanel.style.display = 'none';
        videosPanel.style.display = 'block';
      } else {
        photosPanel.style.display = 'block';
        videosPanel.style.display = 'none';
      }
    });
  });
})();


(function(){
  // ===== DAILY QUOTE =====
  var quoteEl = document.getElementById('dailyQuote');
  var attrEl = document.getElementById('dailyQuoteAttr');
  if(quoteEl && attrEl && typeof SPIRITUAL_QUOTES !== 'undefined'){
    // Pick a quote based on the day of the year (changes daily, same all day)
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var dayOfYear = Math.floor((now - start) / 86400000);
    var idx = dayOfYear % SPIRITUAL_QUOTES.length;
    var q = SPIRITUAL_QUOTES[idx];
    quoteEl.textContent = q.text;
    attrEl.textContent = ' -  ' + q.author;
  }

  // ===== TODAY AT THE MATH =====
  var heading = document.getElementById('todayHeading');
  var grid = document.getElementById('todayGrid');
  if(heading && grid && typeof DAILY_SCHEDULE !== 'undefined'){
    var now = new Date();
    var dayNum = now.getDay(); // 0=Sun, 1=Mon, ...
    var schedule = DAILY_SCHEDULE[dayNum];

    // Format: "Sunday, 23 March 2026"
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    heading.textContent = schedule.day + ', ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();

    // Render cards
    var html = '';
    for(var i = 0; i < schedule.cards.length; i++){
      var c = schedule.cards[i];
      var delay = (i % 2 === 0) ? 'd1' : 'd2';
      var metaHtml = '';
      if(c.meta === 'link' && c.url){
        metaHtml = '<a href="' + c.url + '" target="_blank" style="color:var(--saffron)">Visit Channel →</a>';
      } else {
        metaHtml = c.meta;
      }
      html += '<div class="tcard reveal ' + delay + '">';
      html += '<div class="tcard__icon">' + c.icon + '</div>';
      html += '<div class="tcard__title">' + c.title + '</div>';
      html += '<div class="tcard__text">' + c.text + '</div>';
      html += '<div class="tcard__meta">' + metaHtml + '</div>';
      html += '</div>';
    }
    grid.innerHTML = html;

    // Re-trigger reveal for dynamically added cards
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(x){ if(x.isIntersecting) x.target.classList.add('vis') });
    },{threshold:0.1});
    grid.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el) });
  }

// ===== QUICKBAR DYNAMIC =====
if(typeof DAILY_SCHEDULE !== 'undefined'){
  var now = new Date();
  var dayNum = now.getDay();
  var schedule = DAILY_SCHEDULE[dayNum];
  var tomorrowSchedule = DAILY_SCHEDULE[(dayNum + 1) % 7];

  // Helper: parse "7:00 AM" or "6:00 PM" into hours (24h)
  function parseTime(str){
    var match = str.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if(!match) return -1;
    var h = parseInt(match[1]);
    var m = parseInt(match[2]);
    var ampm = match[3].toUpperCase();
    if(ampm === 'PM' && h !== 12) h += 12;
    if(ampm === 'AM' && h === 12) h = 0;
    return h + m/60;
  }

  // Helper: get start time from meta like "7:00 AM – 7:30 AM"
  function getStartTime(meta){
    var parts = meta.split('–');
    if(parts.length === 0) return '';
    return parts[0].trim();
  }

  // Find aarti cards from a schedule
  function getAartiCards(sched){
    var results = [];
    for(var i = 0; i < sched.cards.length; i++){
      var c = sched.cards[i];
      if(c.title === 'Morning Worship' || c.title === 'Evening Aarti'){
        results.push(c);
      }
    }
    return results;
  }

  // Today's scripture class
  var qbToday = document.getElementById('qbToday');
  if(qbToday && schedule){
    for(var i = 0; i < schedule.cards.length; i++){
      var c = schedule.cards[i];
      if(c.title !== 'Morning Worship' && c.title !== 'Evening Aarti' && c.meta !== 'link'){
        qbToday.textContent = c.title;
        break;
      }
    }
  }

  // Temple timings  -  from first Morning Worship start to Evening Aarti end
  var qbTemple = document.getElementById('qbTemple');
  if(qbTemple && schedule){
    var open = '';
    var close = '';
    for(var i = 0; i < schedule.cards.length; i++){
      var c = schedule.cards[i];
      if(c.title === 'Morning Worship'){
        open = getStartTime(c.meta);
      }
      if(c.title === 'Evening Aarti'){
        var parts = c.meta.split('–');
        if(parts.length > 1) close = parts[1].trim();
      }
    }
    if(open && close) qbTemple.textContent = open + ' – ' + close;
  }

  // Next aarti
  var qbAarti = document.getElementById('qbAarti');
  if(qbAarti && schedule){
    var currentHour = now.getHours() + now.getMinutes()/60;
    var todayAartis = getAartiCards(schedule);
    var found = false;

    // Check today's aartis  -  find the next one that hasn't started
    for(var i = 0; i < todayAartis.length; i++){
      var startStr = getStartTime(todayAartis[i].meta);
      var startHour = parseTime(startStr);
      if(startHour > currentHour){
        qbAarti.textContent = startStr;
        found = true;
        break;
      }
    }

    // If all today's aartis have passed, show tomorrow's first aarti
    if(!found){
      var tomorrowAartis = getAartiCards(tomorrowSchedule);
      if(tomorrowAartis.length > 0){
        var startStr = getStartTime(tomorrowAartis[0].meta);
        qbAarti.textContent = startStr + ' (Tomorrow)';
      }
    }
  }
}


})();
