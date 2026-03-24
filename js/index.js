// ===== SCRIPTURE CHIPS (static data, runs immediately) =====
var scrips=[
{day:'Sun',name:'Bhagavad Gita',desc:'The eternal dialogue between Sri Krishna and Arjuna — on duty, devotion, and the path to liberation. The foundational text of the Ramakrishna Order.',tag:'Sunday',icon:'📖',source:'Vyasa'},
{day:'Mon',name:'Letters of Swamiji',desc:'Practical spirituality, organizational wisdom, and fiery inspiration from the letters of Swami Vivekananda to disciples and friends.',tag:'Monday',icon:'✉️',source:'Swami Vivekananda'},
{day:'Tue',name:'Sri Maa\'s Life',desc:'The Holy Mother Sri Sarada Devi — her extraordinary life of patience, unconditional love, and spiritual power.',tag:'Tuesday',icon:'🙏',source:'Swami Gambhirananda'},
{day:'Wed',name:'Kathamrita',desc:'Sri Sri Ramakrishna Kathamrita — the recorded conversations of the Master at Dakshineshwar, as noted by Mahendranath Gupta (M).',tag:'Wednesday',icon:'📜',source:'Mahendranath Gupta'},
{day:'Thu',name:'Naradiya Bhakti',desc:'Sage Narada\'s aphorisms on supreme devotion — the nature of divine love and the path to attain it.',tag:'Thursday',icon:'💎',source:'Sage Narada'},
{day:'Fri',name:'Lila Prasanga',desc:'Sri Ramakrishna — the Great Master. The authoritative biography by Swami Saradananda, a direct disciple.',tag:'Friday',icon:'📕',source:'Swami Saradananda'},
{day:'Sat',name:'Kathamrita / Gita',desc:'Alternating between the Gospel and the Gita — devotional and philosophical inquiry in harmony.',tag:'Saturday',icon:'🕉️',source:'Alternating'}
];

var st=document.getElementById('scripTrack');
var sd=document.getElementById('scripDetail');
if(st&&sd){
  var today = new Date().getDay();
  var defaultIdx = (today === 0) ? 0 : today;
  if(defaultIdx >= scrips.length) defaultIdx = 0;

  function renderChips(){
    var html='';
    for(var i=0;i<scrips.length;i++){
      var isToday = (i === defaultIdx);
      html+='<button class="scrip__chip'+(isToday?' on':'')+'" data-i="'+i+'" style="position:relative">';
      if(isToday) html+='<span style="position:absolute;top:-6px;right:-6px;background:var(--saffron);color:var(--white);font-size:.5rem;font-weight:700;padding:1px 5px;border-radius:100px;letter-spacing:.04em">TODAY</span>';
      html+='<div class="scrip__chip-day">'+scrips[i].day+'</div>';
      html+='<div class="scrip__chip-name">'+scrips[i].name+'</div></button>';
    }
    st.innerHTML=html;
  }

  function showScrip(idx){
    var s=scrips[idx];
    var isToday = (idx === defaultIdx);
    var html='';
    html+='<div style="background:var(--white);border-radius:16px;padding:1.8rem;border:1px solid rgba(212,168,84,0.2);box-shadow:0 4px 20px var(--shadow);text-align:center">';
    html+='<div style="font-size:2.5rem;margin-bottom:.6rem">'+s.icon+'</div>';
    html+='<h3 style="font-family:var(--serif);font-size:1.4rem;font-weight:600;color:var(--ink);margin-bottom:.3rem">'+s.name+'</h3>';
    html+='<p style="font-size:.88rem;color:var(--earth-light);line-height:1.65;margin-bottom:.8rem">'+s.desc+'</p>';
    html+='<div style="display:flex;justify-content:center;gap:.5rem;flex-wrap:wrap">';
    html+='<span style="display:inline-block;background:var(--saffron);color:var(--white);font-size:.6rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:.25rem .7rem;border-radius:100px">'+s.tag+'</span>';
    html+='<span style="display:inline-block;background:var(--cream);color:var(--earth);font-size:.6rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:.25rem .7rem;border-radius:100px">By '+s.source+'</span>';
    if(isToday) html+='<span style="display:inline-block;background:var(--ink);color:var(--gold-light);font-size:.6rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:.25rem .7rem;border-radius:100px">📖 Being Studied Today</span>';
    html+='</div>';
    html+='</div>';
    sd.innerHTML=html;
  }

  renderChips();
  showScrip(defaultIdx);

  st.addEventListener('click',function(e){
    var chip=e.target.closest('.scrip__chip');
    if(!chip)return;
    var all=st.querySelectorAll('.scrip__chip');
    for(var j=0;j<all.length;j++){all[j].classList.remove('on');}
    chip.classList.add('on');
    showScrip(parseInt(chip.getAttribute('data-i')));
  });
}


// ===== VIDEO CAROUSEL (YouTube RSS, runs immediately) =====
(function(){
  

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


// ===== ALL SHEET-DEPENDENT CODE (waits for Google Sheet data) =====
onAllSheetsLoaded(function(){

  // ----- DAILY QUOTE -----
  var quoteEl = document.getElementById('dailyQuote');
  var attrEl = document.getElementById('dailyQuoteAttr');
  if(quoteEl && attrEl && SPIRITUAL_QUOTES.length > 0){
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var dayOfYear = Math.floor((now - start) / 86400000);
    var idx = dayOfYear % SPIRITUAL_QUOTES.length;
    var q = SPIRITUAL_QUOTES[idx];
    quoteEl.textContent = q.text;
    attrEl.textContent = '— ' + q.author;
  }

  // ----- TODAY AT THE MATH -----
  var heading = document.getElementById('todayHeading');
  var grid = document.getElementById('todayGrid');
  if(heading && grid && DAILY_SCHEDULE){
    var now = new Date();
    var dayNum = now.getDay();
    var schedule = DAILY_SCHEDULE[dayNum];
    if(schedule && schedule.cards && schedule.cards.length > 0){
      var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      heading.textContent = schedule.day + ', ' + now.getDate() + ' ' + months[now.getMonth()] + ' ' + now.getFullYear();
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
      var obs = new IntersectionObserver(function(entries){
        entries.forEach(function(x){ if(x.isIntersecting) x.target.classList.add('vis') });
      },{threshold:0.1});
      grid.querySelectorAll('.reveal').forEach(function(el){ obs.observe(el) });
    }
  }

  // ----- QUICKBAR DYNAMIC -----
  if(DAILY_SCHEDULE){
    var now = new Date();
    var dayNum = now.getDay();
    var schedule = DAILY_SCHEDULE[dayNum];
    var tomorrowSchedule = DAILY_SCHEDULE[(dayNum + 1) % 7];

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

    function getStartTime(meta){
      var parts = meta.split('–');
      if(parts.length === 0) return '';
      return parts[0].trim();
    }

    function getAartiCards(sched){
      var results = [];
      if(!sched || !sched.cards) return results;
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
    if(qbToday && schedule && schedule.cards){
      for(var i = 0; i < schedule.cards.length; i++){
        var c = schedule.cards[i];
        if(c.title !== 'Morning Worship' && c.title !== 'Evening Aarti' && c.meta !== 'link'){
          qbToday.textContent = c.title;
          break;
        }
      }
    }

    // Temple timings
    var qbTemple = document.getElementById('qbTemple');
    if(qbTemple && schedule && schedule.cards){
      var open = '';
      var close = '';
      for(var i = 0; i < schedule.cards.length; i++){
        var c = schedule.cards[i];
        if(c.title === 'Morning Worship') open = getStartTime(c.meta);
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
      for(var i = 0; i < todayAartis.length; i++){
        var startStr = getStartTime(todayAartis[i].meta);
        var startHour = parseTime(startStr);
        if(startHour > currentHour){
          qbAarti.textContent = startStr;
          found = true;
          break;
        }
      }
      if(!found){
        var tomorrowAartis = getAartiCards(tomorrowSchedule);
        if(tomorrowAartis.length > 0){
          var startStr2 = getStartTime(tomorrowAartis[0].meta);
          qbAarti.textContent = startStr2 + ' (Tomorrow)';
        }
      }
    }
  }

  // ----- PHOTO GALLERY -----
  var galleryTrack = document.getElementById('galleryTrack');
  if(galleryTrack && PHOTO_ALBUMS.length > 0){
    var html = '';
    for(var i = 0; i < PHOTO_ALBUMS.length; i++){
      var a = PHOTO_ALBUMS[i];
      html += '<a href="' + a.link + '" target="_blank" class="gallery__card">';
      html += '<img src="' + a.img + '" alt="' + a.title + '" loading="lazy">';
      html += '<div class="gallery__card__overlay">' + a.title + '<small>View Album →</small></div>';
      html += '</a>';
    }
    galleryTrack.innerHTML = html;

    // Start auto-scroll after photos are loaded
    var track = galleryTrack;
    var prev = document.getElementById('galPrev');
    var next = document.getElementById('galNext');
    if(track && prev && next){
      var amt = 300;
      next.addEventListener('click',function(){track.scrollBy({left:amt,behavior:'smooth'})});
      prev.addEventListener('click',function(){track.scrollBy({left:-amt,behavior:'smooth'})});
      var auto = setInterval(function(){
        if(track.scrollLeft + track.clientWidth >= track.scrollWidth - 10){
          track.scrollTo({left:0,behavior:'smooth'});
        } else {
          track.scrollBy({left:amt,behavior:'smooth'});
        }
      },4000);
      track.addEventListener('mouseenter',function(){clearInterval(auto)});
      track.addEventListener('touchstart',function(){clearInterval(auto)},{passive:true});
    }
  }

  // ===== VIDEO CAROUSEL (from Google Sheet) =====
  var vtrack = document.getElementById('videoTrack');
  var vprev = document.getElementById('vidPrev');
  var vnext = document.getElementById('vidNext');
  //console.log(YT_VIDEOS)
 
  if(vtrack && YT_VIDEOS.length > 0){
    var html = '';
    var count = Math.min(YT_VIDEOS.length, 6);
    for(var i = 0; i < count; i++){
      var v = YT_VIDEOS[i];
      var date = '';
      if(v.published){
        var d = new Date(v.published);
        date = d.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
      }
      html += '<div style="flex:0 0 320px;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px var(--shadow);background:var(--white)">';
      html += '<div style="position:relative;padding-bottom:56.25%;height:0;background:#000">';
      html += '<iframe src="https://www.youtube.com/embed/' + v.videoId + '" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none" allowfullscreen loading="lazy"></iframe>';
      html += '</div>';
      html += '<div style="padding:.7rem 1rem">';
      html += '<div style="font-family:var(--serif);font-size:.95rem;font-weight:600;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + v.title + '</div>';
      html += '<div style="font-size:.68rem;color:var(--earth-light);margin-top:.2rem">' + date + '</div>';
      html += '</div></div>';
       //console.log(html)
    }
    vtrack.innerHTML = html;
  }
//console.log(vtrack.innerHTML)
  if(vprev && vnext){
    vnext.addEventListener('click',function(){vtrack.scrollBy({left:340,behavior:'smooth'})});
    vprev.addEventListener('click',function(){vtrack.scrollBy({left:-340,behavior:'smooth'})});
  }

  // ----- UPCOMING PROGRAMS -----
  var upGrid = document.getElementById('upcomingGrid');
  if(upGrid && UPCOMING_PROGRAMS.length > 0){
    var now = new Date();
    var todayStr = now.getFullYear() + '-' + String(now.getMonth()+1).padStart(2,'0') + '-' + String(now.getDate()).padStart(2,'0');
    var shown = 0;
    var html = '';
    for(var i = 0; i < UPCOMING_PROGRAMS.length; i++){
      var p = UPCOMING_PROGRAMS[i];
      if(p.date && p.date < todayStr) continue;
      if(shown >= 4) break;
      var delay = ['d1','d2','d3','d1'][shown];
      var isEvent = !!p.date;
      html += '<div class="reveal ' + delay + '" style="background:var(--white);border-radius:16px;padding:1.5rem;border:1px solid rgba(212,168,84,0.25);box-shadow:0 2px 12px var(--shadow);position:relative;overflow:hidden;transition:all .3s var(--ease)">';
      html += '<div style="position:absolute;top:0;left:0;bottom:0;width:4px;background:' + (isEvent ? 'var(--saffron)' : 'var(--gold)') + '"></div>';
      html += '<div style="padding-left:.8rem">';
      html += '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem">';
      html += '<div style="font-size:.66rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--saffron)">' + p.when + '</div>';
      html += '<span style="font-size:1.3rem">' + p.icon + '</span>';
      html += '</div>';
      html += '<h3 style="font-family:var(--serif);font-size:1.1rem;font-weight:600;color:var(--ink);margin-bottom:.3rem">' + p.title + '</h3>';
      html += '<p style="font-size:.82rem;color:var(--earth-light);line-height:1.6;margin-bottom:.5rem">' + p.desc + '</p>';
      html += '<span style="display:inline-block;background:var(--cream);padding:.2rem .6rem;border-radius:6px;font-size:.64rem;font-weight:600;color:var(--earth);letter-spacing:.04em;text-transform:uppercase">' + p.tag + '</span>';
      html += '</div></div>';
      shown++;
    }
    upGrid.innerHTML = html;
    var obs2 = new IntersectionObserver(function(entries){
      entries.forEach(function(x){ if(x.isIntersecting) x.target.classList.add('vis') });
    },{threshold:0.1});
    upGrid.querySelectorAll('.reveal').forEach(function(el){ obs2.observe(el) });
  }

}); // end onAllSheetsLoaded


// ===== FALLBACK if sheets take too long =====
setTimeout(function(){
  if(!_sheetLoaded.quotes){
    var quoteEl = document.getElementById('dailyQuote');
    if(quoteEl && !quoteEl.textContent){
      quoteEl.textContent = 'The world is the great gymnasium where we come to make ourselves strong.';
      document.getElementById('dailyQuoteAttr').textContent = '— Swami Vivekananda';
    }
  }
}, 3000);



