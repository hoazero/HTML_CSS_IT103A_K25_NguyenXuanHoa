const movies = [
  {
    id:1,
    title:'Big Buck Bunny',
    src:'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
    poster:'https://picsum.photos/seed/bunny/320/200',
    desc:'Hoạt hình ngắn mẫu - Big Buck Bunny.'
  },
  {
    id:2,
    title:'Sintel (sample)',
    src:'https://media.w3.org/2010/05/sintel/trailer_hd.mp4',
    poster:'https://picsum.photos/seed/sintel/320/200',
    desc:'Trailer Sintel - sample video.'
  },
  {
    id:3,
    title:'Tốc hành mẫu (small)',
    src:'https://www.w3schools.com/html/mov_bbb.mp4',
    poster:'https://picsum.photos/seed/fast/320/200',
    desc:'Một video mẫu khác để thử giao diện.'
  }
];

const listEl = document.getElementById('list');
const videoEl = document.getElementById('video');
const videoSrc = document.getElementById('videoSrc');
const titleEl = document.getElementById('title');
const descEl = document.getElementById('desc');
const searchEl = document.getElementById('search');

function renderList(items){
  listEl.innerHTML = '';
  items.forEach(m=>{
    const li = document.createElement('li');
    li.className = 'movie-item';
    li.tabIndex = 0;
    li.dataset.id = m.id;

    li.innerHTML = `
      <img class="movie-thumb" src="${m.poster}" alt="${m.title} poster">
      <div class="movie-info">
        <div class="movie-title">${m.title}</div>
        <div class="movie-sub">${m.desc}</div>
      </div>
    `;

    li.addEventListener('click',()=>loadMovie(m));
    li.addEventListener('keydown',(e)=>{ if(e.key==='Enter') loadMovie(m) });
    listEl.appendChild(li);
  });
}

function loadMovie(m){
  // update active state
  [...listEl.children].forEach(li=>li.classList.toggle('active', li.dataset.id==m.id));
  videoSrc.src = m.src;
  videoEl.poster = m.poster;
  titleEl.textContent = m.title;
  descEl.textContent = m.desc;
  videoEl.load();
  videoEl.play().catch(()=>{});
}

searchEl.addEventListener('input',()=>{
  const q = searchEl.value.toLowerCase().trim();
  const filtered = movies.filter(m=>m.title.toLowerCase().includes(q) || m.desc.toLowerCase().includes(q));
  renderList(filtered);
});

// keyboard: Space to play/pause when focused on body
document.body.addEventListener('keydown', (e)=>{
  if(e.code==='Space' && document.activeElement.tagName !== 'INPUT'){
    e.preventDefault();
    if(videoEl.paused) videoEl.play(); else videoEl.pause();
  }
});

// initial render
renderList(movies);
// load first movie by default
if(movies.length) setTimeout(()=>loadMovie(movies[0]),150);
