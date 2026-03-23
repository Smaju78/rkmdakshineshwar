var DAILY_SCHEDULE = {
  0: { // Sunday
    day: 'Sunday',
    cards: [
      {icon:'🌅', title:'Morning Worship', text:'Mangal Aarti followed by meditation.', meta:'7:00 AM – 7:30 AM'},
      {icon:'📖', title:'Bhagavad Gita Class', text:'Sunday Gita study  -  open to all seekers.', meta:'Sunday Special'},
      {icon:'🪔', title:'Evening Aarti', text:'Sandhya Aarti with devotional singing.', meta:'6:00 PM – 6:30 PM'},
      {icon:'🎥', title:'YouTube', text:'Watch discourses and celebrations.', meta:'link', url:'https://www.youtube.com/@DakshineshwarRamakrishnaMath'}
    ]
  },
  1: { // Monday
    day: 'Monday',
    cards: [
      {icon:'🌅', title:'Morning Worship', text:'Mangal Aarti followed by meditation.', meta:'7:00 AM – 7:30 AM'},
      {icon:'✉️', title:'Letters of Swami Vivekananda', text:'Study of Swamiji\'s letters  -  practical spirituality and inspiration.', meta:'Evening Class'},
      {icon:'🪔', title:'Evening Aarti', text:'Sandhya Aarti with devotional singing.', meta:'6:00 PM – 6:30 PM'},
      {icon:'🎥', title:'YouTube', text:'Watch discourses and celebrations.', meta:'link', url:'https://www.youtube.com/@DakshineshwarRamakrishnaMath'}
    ]
  },
  2: { // Tuesday
    day: 'Tuesday',
    cards: [
      {icon:'🌅', title:'Morning Worship', text:'Mangal Aarti followed by meditation.', meta:'7:00 AM – 7:30 AM'},
      {icon:'🙏', title:'Life of Sri Sarada Devi', text:'Study of the Holy Mother\'s extraordinary life of patience and love.', meta:'Evening Class'},
      {icon:'🪔', title:'Evening Aarti', text:'Sandhya Aarti with devotional singing.', meta:'6:00 PM – 6:30 PM'},
      {icon:'🎥', title:'YouTube', text:'Watch discourses and celebrations.', meta:'link', url:'https://www.youtube.com/@DakshineshwarRamakrishnaMath'}
    ]
  },
  3: { // Wednesday
    day: 'Wednesday',
    cards: [
      {icon:'🌅', title:'Morning Worship', text:'Mangal Aarti followed by meditation.', meta:'7:00 AM – 7:30 AM'},
      {icon:'📜', title:'Kathamrita', text:'The Gospel of Sri Ramakrishna  -  conversations of the Master.', meta:'Evening Class'},
      {icon:'🪔', title:'Evening Aarti', text:'Sandhya Aarti with devotional singing.', meta:'6:00 PM – 6:30 PM'},
      {icon:'🎥', title:'YouTube', text:'Watch discourses and celebrations.', meta:'link', url:'https://www.youtube.com/@DakshineshwarRamakrishnaMath'}
    ]
  },
  4: { // Thursday
    day: 'Thursday',
    cards: [
      {icon:'🌅', title:'Morning Worship', text:'Mangal Aarti followed by meditation.', meta:'7:00 AM – 7:30 AM'},
      {icon:'💎', title:'Naradiya Bhakti Sutra', text:'Sage Narada\'s aphorisms on supreme devotion and divine love.', meta:'Evening Class'},
      {icon:'🪔', title:'Evening Aarti', text:'Sandhya Aarti with devotional singing.', meta:'6:00 PM – 6:30 PM'},
      {icon:'🎥', title:'YouTube', text:'Watch discourses and celebrations.', meta:'link', url:'https://www.youtube.com/@DakshineshwarRamakrishnaMath'}
    ]
  },
  5: { // Friday
    day: 'Friday',
    cards: [
      {icon:'🌅', title:'Morning Worship', text:'Mangal Aarti followed by meditation.', meta:'7:00 AM – 7:30 AM'},
      {icon:'📕', title:'Lila Prasanga', text:'Biography of Sri Ramakrishna by Swami Saradananda.', meta:'Evening Class'},
      {icon:'🪔', title:'Evening Aarti', text:'Sandhya Aarti with devotional singing.', meta:'6:00 PM – 6:30 PM'},
      {icon:'🎥', title:'YouTube', text:'Watch discourses and celebrations.', meta:'link', url:'https://www.youtube.com/@DakshineshwarRamakrishnaMath'}
    ]
  },
  6: { // Saturday
    day: 'Saturday',
    cards: [
      {icon:'🌅', title:'Morning Worship', text:'Mangal Aarti followed by meditation.', meta:'7:00 AM – 7:30 AM'},
      {icon:'🕉️', title:'Kathamrita / Bhagavad Gita', text:'Alternating between the Gospel and the Gita.', meta:'Evening Class'},
      {icon:'🪔', title:'Evening Aarti', text:'Sandhya Aarti with devotional singing.', meta:'6:00 PM – 6:30 PM'},
      {icon:'🎥', title:'YouTube', text:'Watch discourses and celebrations.', meta:'link', url:'https://www.youtube.com/@DakshineshwarRamakrishnaMath'}
    ]
  }
};

var TEMPLE_TIMINGS = {
  // months 0-indexed: 0=Jan, 9=Oct, 3=Apr, 4=May, 8=Sep
  winter: {label:'Oct – Apr', morning:'7:00 AM – 11:30 AM', evening:'3:30 PM – 8:00 PM', aarti:'6:00 PM'},
  summer: {label:'May – Sep', morning:'7:00 AM – 11:30 AM', evening:'4:00 PM – 8:30 PM', aarti:'6:30 PM'}
};

function getCurrentSeason(){
  var month = new Date().getMonth(); // 0-indexed
  // May(4) to Sep(8) = summer, Oct(9) to Apr(3) = winter
  return (month >= 4 && month <= 8) ? 'summer' : 'winter';
}