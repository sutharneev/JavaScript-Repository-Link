const f=document.getElementById('form'), ok=document.getElementById('ok');
f.addEventListener('submit', e=>{
  e.preventDefault(); ok.textContent='';
  const d=Object.fromEntries(new FormData(f).entries());
  let valid=true;
  const set=(id,msg)=>{ document.getElementById(id).textContent=msg||''; if(msg) valid=false; };
  set('eName', d.name.trim()? '':'Name is required');
  set('eEmail', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)? '':'Enter a valid email');
  set('eMsg', d.msg.trim().length>=10? '':'Message must be at least 10 characters');
  if(valid){ ok.textContent='Form is valid ✔ — prevented submit for demo.'; f.reset(); }
});
