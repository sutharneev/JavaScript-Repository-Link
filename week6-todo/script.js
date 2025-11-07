let items=[]; let filter='all';

function render(){
  const ul=document.getElementById('list'); ul.innerHTML='';
  const visible = items.filter(i=>filter==='all'||(filter==='open'&&!i.done)||(filter==='done'&&i.done));
  visible.forEach((i,visibleIdx)=>{
    const idx = items.indexOf(i); // actual index in the master array
    const li=document.createElement('li');
    li.innerHTML = `
      <span class="${i.done?'done':''}"><strong>${visibleIdx+1}.</strong> ${i.text}</span>
      <div class="actions">
        <button data-a="toggle" data-idx="${idx}">${i.done?'Undo':'Done'}</button>
        <button data-a="del" data-idx="${idx}">Delete</button>
      </div>`;
    ul.appendChild(li);
  });
}

document.getElementById('form').addEventListener('submit', e=>{
  e.preventDefault();
  const input = document.getElementById('task');
  const t = input.value.trim();
  if(!t) return;
  items.push({text:t, done:false}); // append to keep natural order
  input.value='';
  render(); // add on the same screen immediately
});

document.getElementById('list').addEventListener('click', e=>{
  const a=e.target.dataset.a;
  if(!a) return;
  const i=Number(e.target.dataset.idx);
  if(Number.isNaN(i)) return;
  if(a==='toggle'){ items[i].done=!items[i].done; }
  if(a==='del'){ items.splice(i,1); } // deletion makes next tasks shift up naturally
  render();
});

document.querySelector('.filters').addEventListener('click', e=>{
  if(e.target.tagName!=='BUTTON') return;
  document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));
  e.target.classList.add('active'); filter=e.target.dataset.f; render();
});

render();
