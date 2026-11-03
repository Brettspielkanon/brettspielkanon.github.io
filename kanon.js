"use strict";
const el = (id) => document.getElementById(id);
const state = { spiele: [] };
const esc = (s) => String(s).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const norm = (s) => String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('de');
function filterOptions(id, values) {
  [...new Set(values)].sort((a,b)=>a.localeCompare(b,'de')).forEach(value => {
    const o = document.createElement('option');o.value=value;o.textContent=value;el(id).append(o);
  });
}
function render(){
 const q=norm(el('suchfeld').value.trim()), aufnahme=el('aufnahme').value, mechanic=el('mechanik').value, sort=el('sortierung').value;
 const matches=state.spiele.filter(s => (!q || norm([s.titel,s.jahr,...s.autoren,...s.mechaniken].join(' ')).includes(q)) && (!aufnahme||s.aufnahme===aufnahme) && (!mechanic||s.mechaniken.includes(mechanic)));
 matches.sort((a,b)=>sort==='az'?a.titel.localeCompare(b.titel,'de'):(sort==='neu'?b.jahr-a.jahr:a.jahr-b.jahr)||a.titel.localeCompare(b.titel,'de'));
 el('anzahl').textContent=`${matches.length} ${matches.length===1?'Spiel':'Spiele'}`;
 el('karten').innerHTML=matches.map(s=>`<article class="card"><div class="art" role="img" aria-label="Grafischer Platzhalter für eine spätere Spielabbildung"><span class="art-title">${esc(s.titel)}</span><small>Abbildung folgt</small></div><div class="card-content"><span class="year">${esc(s.jahr)}</span><h3>${esc(s.titel)}</h3><p class="byline">${s.autoren.map(esc).join(' · ')}</p><p class="summary">${esc(s.kurz)}</p><div class="tags">${s.mechaniken.map(m=>`<span class="tag">${esc(m)}</span>`).join('')}</div><div class="phase">${esc(s.aufnahme || "Vorläufig aufgenommen")} · ${esc(s.beitrag)}</div></div></article>`).join('');
 el('keine-treffer').style.display=matches.length?'none':'block';
}
async function init(){
 try{
  const response=await fetch('spiele.json',{cache:'no-cache'});
  if(!response.ok)throw new Error('HTTP '+response.status);
  const data=await response.json();if(!Array.isArray(data))throw Error('Ungültige Daten');
  state.spiele=data;
    filterOptions('mechanik',data.flatMap(s=>s.mechaniken));
  ['suchfeld','aufnahme','mechanik','sortierung'].forEach(id=>el(id).addEventListener(id==='suchfeld'?'input':'change',render));
  el('zuruecksetzen').addEventListener('click',()=>{el('suchfeld').value='';el('aufnahme').value='';el('mechanik').value='';el('sortierung').value='alt';render()});
  render();
 }catch(e){el('anzahl').textContent='Spieldaten konnten nicht geladen werden.';el('karten').innerHTML='<p>Bitte prüfen, ob spiele.json im selben Ordner liegt. Die Seite muss über GitHub Pages (nicht direkt als lokale Datei) geöffnet werden.</p>';}
}
document.addEventListener('DOMContentLoaded',init);
