async function geocode(city){
  const u=`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
  const r=await fetch(u); if(!r.ok) throw new Error('Geocoding failed');
  const j=await r.json(); if(!j.results||!j.results[0]) throw new Error('City not found');
  const {latitude, longitude, name, country} = j.results[0];
  return { latitude, longitude, label: `${name}, ${country}` };
}
async function getWeather(lat, lon){
  const u=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
  const r=await fetch(u); if(!r.ok) throw new Error('Weather fetch failed');
  return r.json();
}
document.getElementById('form').addEventListener('submit', async e=>{
  e.preventDefault();
  err.textContent=''; result.hidden=true;
  try{
    const g=await geocode(city.value);
    const w=await getWeather(g.latitude, g.longitude);
    rCity.textContent=g.label;
    rTemp.textContent=`Temperature: ${w.current_weather.temperature}°C`;
    rDesc.textContent=`Windspeed: ${w.current_weather.windspeed} km/h`;
    result.hidden=false;
  }catch(ex){ err.textContent=ex.message; }
});
