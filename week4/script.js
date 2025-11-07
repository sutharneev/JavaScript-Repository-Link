const k = {
  CtoF:c=>c*9/5+32, FtoC:f=>(f-32)*5/9, CtoK:c=>c+273.15, KtoC:k=>k-273.15,
};
function convertTemp(v, from, to){
  const map = {Celsius:'C', Fahrenheit:'F', Kelvin:'K'};
  from = map[from]; to = map[to];
  if(from===to) return v;
  let C;
  if(from==='C') C=v;
  else if(from==='F') C=k.FtoC(v);
  else C=k.KtoC(v);
  if(to==='C') return C;
  if(to==='F') return k.CtoF(C);
  return k.CtoK(C);
}
const lenMap = { Meter:1, Kilometer:1000, Centimeter:0.01 };
function convertLen(v, from, to){ return v*lenMap[from]/lenMap[to]; }
document.getElementById('tempBtn').onclick=()=>{
  const v=Number(tempVal.value);
  tempOut.textContent = convertTemp(v, tempFrom.value, tempTo.value).toFixed(2);
};
document.getElementById('lenBtn').onclick=()=>{
  const v=Number(lenVal.value);
  lenOut.textContent = convertLen(v, lenFrom.value, lenTo.value).toFixed(3);
};
