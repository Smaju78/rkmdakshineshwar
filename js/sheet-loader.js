var SHEET_ID = '1d1nqvyplJcx_CTeM0qJA4mKe3k9t4Nxz0DsrLzJbKW0';

// Global data
var PHOTO_ALBUMS = [];
var DAILY_SCHEDULE = {};
var UPCOMING_PROGRAMS = [];
var SPIRITUAL_QUOTES = [];
var YT_VIDEOS = [];
var ACTIVITY_REPORTS = [];

// Track loading
var _sheetLoaded = {photos:false, schedule:false, programs:false, quotes:false, videos:false, reports:false};
var _sheetCallbacks = [];
var _cacheHit = false;

// ===== CACHE FUNCTIONS (defined first, before anything calls them) =====
var CACHE_KEY = 'rkm_sheet_cache';
var CACHE_DURATION = 2400 * 60 * 1000; // 1 day

function _saveToCache(){
  try {
    var data = {
      ts: Date.now(),
      photos: PHOTO_ALBUMS,
      schedule: DAILY_SCHEDULE,
      programs: UPCOMING_PROGRAMS,
      quotes: SPIRITUAL_QUOTES,
      videos: YT_VIDEOS,
      reports: ACTIVITY_REPORTS
    };
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch(e){}
}

function _loadFromCache(){
  try {
    var raw = sessionStorage.getItem(CACHE_KEY);
    if(!raw) return false;
    var data = JSON.parse(raw);
    if(Date.now() - data.ts > CACHE_DURATION){
      sessionStorage.removeItem(CACHE_KEY);
      return false;
    }
    PHOTO_ALBUMS = data.photos || [];
    DAILY_SCHEDULE = data.schedule || {};
    UPCOMING_PROGRAMS = data.programs || [];
    SPIRITUAL_QUOTES = data.quotes || [];
    YT_VIDEOS = data.videos || [];
    ACTIVITY_REPORTS = data.reports || [];
    _sheetLoaded = {photos:true, schedule:true, programs:true, quotes:true, videos:true, reports:true};
    return true;
  } catch(e){ return false; }
}

// ===== CALLBACK SYSTEM =====
function onAllSheetsLoaded(fn){
  _sheetCallbacks.push(fn);
  _checkAllLoaded();
}

function _checkAllLoaded(){
  if(_sheetLoaded.photos && _sheetLoaded.schedule && _sheetLoaded.programs && _sheetLoaded.quotes && _sheetLoaded.videos && _sheetLoaded.reports){
    if(!_cacheHit) _saveToCache();
    for(var i=0;i<_sheetCallbacks.length;i++) _sheetCallbacks[i]();
    _sheetCallbacks=[];
  }
}

// ===== CSV PARSING =====
function _fetchTab(tabName, callback){
  var url = 'https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?tqx=out:csv&headers=1&sheet=' + encodeURIComponent(tabName);
  fetch(url)
    .then(function(r){ return r.text() })
    .then(function(csv){ callback(_parseCSV(csv)) })
    .catch(function(err){
      console.warn('Could not load sheet tab: ' + tabName, err);
      callback([]);
    });
}

function _parseCSV(text){
  var rows = [];
  var lines = _splitCSVLines(text);
  if(lines.length < 2) return rows;
  var headers = _parseCSVLine(lines[0]);
  var numCols = headers.length;
  for(var i=1;i<lines.length;i++){
    if(!lines[i].trim()) continue;
    var vals = _parseCSVLine(lines[i]);
    while(vals.length < numCols) vals.push('');
    var obj = {};
    for(var j=0;j<headers.length;j++){
      obj[headers[j].trim()] = (vals[j]||'').trim();
    }
    rows.push(obj);
  }
  return rows;
}

function _splitCSVLines(text){
  var lines = [];
  var current = '';
  var inQuote = false;
  for(var i=0;i<text.length;i++){
    var ch = text[i];
    if(ch==='"'){ inQuote=!inQuote; current+=ch; }
    else if((ch==='\n'||ch==='\r') && !inQuote){
      if(current.trim()) lines.push(current);
      current='';
      if(ch==='\r' && text[i+1]==='\n') i++;
    }
    else{ current+=ch; }
  }
  if(current.trim()) lines.push(current);
  return lines;
}

function _parseCSVLine(line){
  var result=[];
  var current='';
  var inQuote=false;
  for(var i=0;i<line.length;i++){
    var ch=line[i];
    if(ch==='"'){
      if(inQuote && line[i+1]==='"'){ current+='"'; i++; }
      else{ inQuote=!inQuote; }
    }
    else if(ch===',' && !inQuote){ result.push(current); current=''; }
    else{ current+=ch; }
  }
  result.push(current);
  return result;
}

function _normalizeRow(row){
  var r={};
  var keys=Object.keys(row);
  for(var k=0;k<keys.length;k++) r[keys[k].toLowerCase().trim()]=row[keys[k]];
  return r;
}

// ===== LOAD DATA: cache first, then fetch =====
_cacheHit = _loadFromCache();

if(_cacheHit){
  console.log('Loaded from session cache');
  setTimeout(function(){ _checkAllLoaded(); }, 0);
} else {
  PHOTO_ALBUMS = [];
  DAILY_SCHEDULE = {};
  UPCOMING_PROGRAMS = [];
  SPIRITUAL_QUOTES = [];
  YT_VIDEOS = [];
  ACTIVITY_REPORTS = [];

  _fetchTab('Photos', function(rows){
    for(var i=0;i<rows.length;i++){
      var r=_normalizeRow(rows[i]);
      if(r.img && r.title) PHOTO_ALBUMS.push({img:r.img, title:r.title, link:r.link||'#', cat:r.cat||r.category||'events'});
    }
    _sheetLoaded.photos=true;
    _checkAllLoaded();
  });

  _fetchTab('Schedule', function(rows){
    for(var d=0;d<7;d++) DAILY_SCHEDULE[d]={day:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d], cards:[]};
    for(var i=0;i<rows.length;i++){
      var r=_normalizeRow(rows[i]);
      var dayNum=parseInt(r.daynum||r.dayNum||r.day_num||'');
      if(isNaN(dayNum)||dayNum<0||dayNum>6) continue;
      var card={icon:r.icon||'📖', title:r.title||'', text:r.text||r.description||'', meta:r.meta||r.time||''};
      if(r.meta==='link'||r.type==='link') card.url='https://www.youtube.com/@DakshineshwarRamakrishnaMath';
      DAILY_SCHEDULE[dayNum].cards.push(card);
    }
    _sheetLoaded.schedule=true;
    _checkAllLoaded();
  });

  _fetchTab('Programs', function(rows){
    for(var i=0;i<rows.length;i++){
      var r=_normalizeRow(rows[i]);
      if(!r.title) continue;
      var prog={title:r.title, desc:r.desc||r.description||'', when:r.when||'', tag:r.tag||'', icon:r.icon||'📖'};
      if(r.date) prog.date=r.date;
      UPCOMING_PROGRAMS.push(prog);
    }
    _sheetLoaded.programs=true;
    _checkAllLoaded();
  });

  _fetchTab('Quotes', function(rows){
    for(var i=0;i<rows.length;i++){
      var r=_normalizeRow(rows[i]);
      if(r.text && r.author) SPIRITUAL_QUOTES.push({text:r.text, author:r.author});
    }
    _sheetLoaded.quotes=true;
    _checkAllLoaded();
  });

  _fetchTab('Videos', function(rows){
    for(var i=0;i<rows.length;i++){
      var r=_normalizeRow(rows[i]);
      if(r.videoid && r.title) YT_VIDEOS.push({videoId:r.videoid, title:r.title, published:r.published||''});
    }
    _sheetLoaded.videos=true;
    _checkAllLoaded();
  });

  _fetchTab('ActivityReports', function(rows){
    for(var i=0;i<rows.length;i++){
      var r=_normalizeRow(rows[i]);
      if(r.month && r.event){
        ACTIVITY_REPORTS.push({month:r.month, year:r.year||'2025', event:r.event, description:r.description||r.desc||'', stat:r.stat||''});
      }
    }
    _sheetLoaded.reports=true;
    _checkAllLoaded();
  });
}