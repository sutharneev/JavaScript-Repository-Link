const QUESTIONS=[
 {q:'Which keyword declares a block-scoped variable?', opts:['var','let','function','const'], a:1},
 {q:'What does DOM stand for?', opts:['Document Object Model','Data Object Method','Display Oriented Markup','Document Oriented Map'], a:0},
 {q:'Which method adds an element to the end of an array?', opts:['push','pop','shift','unshift'], a:0},
 {q:'Which comparison is strict equality?', opts:['==','!=','===','<='], a:2},
 {q:'How do you write an arrow function?', opts:['function => {}','() -> {}','() => {}','{} <= ()'], a:2},
 {q:'What does JSON.parse do?', opts:['Converts object to JSON','Parses JSON string to object','Clones an object','Stringifies object'], a:1},
 {q:'Which API is used for network requests?', opts:['fetch','localStorage','console','window'], a:0},
 {q:'Where do you link a JS file in HTML?', opts:['<head> only','<body> only','Either head or body','Nowhere'], a:2},
 {q:'Which loop iterates over array values?', opts:['for...in','for...of','while','do...while'], a:1},
 {q:'localStorage stores values as...', opts:['numbers','objects','strings','booleans'], a:2},
];
const TMAX=60, PENALTY=1;
const KEYS={HIGH:'quiz.high'};
let t=TMAX, timer, i=0, score=0;

const qs=document.getElementById('screen-q');
const startScr=document.getElementById('screen-start');
const endScr=document.getElementById('screen-end');
const qText=document.getElementById('qText');
const opts=document.getElementById('opts');
const statusEl=document.getElementById('status');
const timeEl=document.getElementById('time');
const highEl=document.getElementById('high');
const scoreEl=document.getElementById('score');

function setHigh(n){ localStorage.setItem(KEYS.HIGH, String(n)); }
function getHigh(){ return Number(localStorage.getItem(KEYS.HIGH)||0); }
highEl.textContent=getHigh();

function start(){
  t=TMAX; i=0; score=0; timeEl.textContent=t;
  startScr.hidden=true; endScr.hidden=true; qs.hidden=false;
  clearInterval(timer);
  timer=setInterval(()=>{ t--; timeEl.textContent=t; if(t<=0) finish(); }, 1000);
  render();
}
function render(){
  const cur=QUESTIONS[i];
  qText.textContent=`Q${i+1}. ${cur.q}`;
  opts.innerHTML='';
  cur.opts.forEach((opt, idx)=>{
    const div=document.createElement('button');
    div.className='opt';
    div.textContent=opt;
    div.onclick=()=>choose(idx);
    opts.appendChild(div);
  });
  statusEl.textContent=`Question ${i+1}/${QUESTIONS.length}`;
}
function choose(sel){
  const cur=QUESTIONS[i];
  const children=[...opts.children];
  children.forEach((el,idx)=>{
    el.classList.toggle('correct', idx===cur.a);
    if(idx===sel && sel!==cur.a) el.classList.add('wrong');
    el.disabled=true;
  });
  if(sel===cur.a){ score++; } else { t=Math.max(0, t-PENALTY); timeEl.textContent=t; }
  setTimeout(()=>{
    i++; if(i>=QUESTIONS.length) finish(); else render();
  }, 600);
}
function finish(){
  clearInterval(timer);
  qs.hidden=true; endScr.hidden=false;
  scoreEl.textContent=score;
  if(score>getHigh()){ setHigh(score); highEl.textContent=score; }
}
document.getElementById('start').onclick=start;
document.getElementById('again').onclick=()=>{ startScr.hidden=false; endScr.hidden=true; };
