const data=[];
function grade(m){ if(m>=90)return'A'; if(m>=80)return'B'; if(m>=70)return'C'; if(m>=60)return'D'; return'F'; }
function render(){
  const tb=document.getElementById('tbody');
  tb.innerHTML='';
  data.forEach((s,i)=>{
    const tr=document.createElement('tr');
    tr.innerHTML=`<td>${i+1}</td><td>${s.name}</td><td>${s.marks}</td><td>${grade(s.marks)}</td>`;
    tb.appendChild(tr);
  });
  const avg = data.reduce((a,c)=>a+c.marks,0)/(data.length||1);
  document.getElementById('avg').textContent = avg.toFixed(2);
}
document.getElementById('form').addEventListener('submit', e=>{
  e.preventDefault();
  const f=new FormData(e.target);
  data.push({ name:f.get('name'), marks:Number(f.get('marks')) });
  e.target.reset(); render();
});
document.getElementById('sortName').onclick=()=>{ data.sort((a,b)=>a.name.localeCompare(b.name)); render(); };
document.getElementById('sortMarks').onclick=()=>{ data.sort((a,b)=>b.marks-a.marks); render(); };
render();
