// Clock
setInterval(()=>{
  const now=new Date();
  const pad=n=>n.toString().padStart(2,'0');
  const hh=pad(now.getHours()), mm=pad(now.getMinutes()), ss=pad(now.getSeconds());
  document.getElementById('clock').textContent = `${hh}:${mm}:${ss}`;
}, 200);

// Stopwatch
let startTime=0, running=false, elapsed=0, raf;
const sw=document.getElementById('sw'); const laps=document.getElementById('laps');
function fmt(ms){const m=Math.floor(ms/60000), s=Math.floor(ms%60000/1000), ms2=ms%1000;return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(ms2).padStart(3,'0')}`;}
function tick(){
  if(!running) return; const now=performance.now(); elapsed = now - startTime; sw.textContent=fmt(elapsed); raf=requestAnimationFrame(tick);
}
document.getElementById('start').onclick=()=>{
  if(running) return; running=true; startTime=performance.now()-elapsed; tick();
};
document.getElementById('pause').onclick=()=>{ running=false; cancelAnimationFrame(raf); };
document.getElementById('reset').onclick=()=>{ running=false; cancelAnimationFrame(raf); elapsed=0; sw.textContent=fmt(0); laps.innerHTML=''; };
document.getElementById('lap').onclick=()=>{ if(!running) return; const li=document.createElement('li'); li.textContent=fmt(elapsed); laps.appendChild(li); };
