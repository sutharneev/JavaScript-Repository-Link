const KEY='notes.v1';
let notes=JSON.parse(localStorage.getItem(KEY)||'[]');
const list=document.getElementById('list'), q=document.getElementById('q');
function save(){ localStorage.setItem(KEY, JSON.stringify(notes)); }
function render(){
  const term=q.value.toLowerCase(); list.innerHTML='';
  notes.filter(n=>n.title.toLowerCase().includes(term)||n.body.toLowerCase().includes(term))
    .forEach((n,i)=>{
      const d=document.createElement('div'); d.className='card';
      d.innerHTML=`<strong>${n.title}</strong><p>${n.body}</p>
        <div class="row"><button data-a="edit" data-i="${i}">Edit</button><button data-a="del" data-i="${i}">Delete</button></div>`;
      list.appendChild(d);
    });
}
document.getElementById('form').addEventListener('submit', e=>{
  e.preventDefault();
  notes.unshift({ title:title.value.trim(), body:body.value.trim(), ts: Date.now() });
  e.target.reset(); save(); render();
});
list.addEventListener('click', e=>{
  const i=e.target.dataset.i, a=e.target.dataset.a;
  if(a==='del'){ notes.splice(i,1); save(); render(); }
  if(a==='edit'){
    const t=prompt('Edit title', notes[i].title); if(t===null) return;
    const b=prompt('Edit body', notes[i].body); if(b===null) return;
    notes[i].title=t; notes[i].body=b; save(); render();
  }
});
q.addEventListener('input', render); render();
