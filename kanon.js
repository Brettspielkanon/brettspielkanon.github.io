"use strict";

// Kanonübersicht: die Spieldaten werden aus spiele.json geladen.
const getElement = (id) => document.getElementById(id);
const state = { spiele: [] };

// HTML-Ausgabe absichern; die Inhalte aus JSON bleiben reine Textinhalte.
function escapeHtml(value) {
  const replacements = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(value).replace(/[&<>"']/g, (character) => replacements[character]);
}

// Akzente und Groß-/Kleinschreibung für die Suche vereinheitlichen.
function normalizeSearch(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("de");
}

function addFilterOptions(selectId, values) {
  [...new Set(values)]
    .sort((a, b) => a.localeCompare(b, "de"))
    .forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      getElement(selectId).append(option);
    });
}

function getFilteredGames() {
  const query = normalizeSearch(getElement("suchfeld").value.trim());
  const status = getElement("aufnahme").value;
  const mechanic = getElement("mechanik").value;
  const order = getElement("sortierung").value;

  return state.spiele
    .filter((game) => {
      const searchable = [game.titel, game.jahr, ...game.autoren, ...game.mechaniken].join(" ");
      return (!query || normalizeSearch(searchable).includes(query))
        && (!status || game.aufnahme === status)
        && (!mechanic || game.mechaniken.includes(mechanic));
    })
    .sort((a, b) => {
      if (order === "az") return a.titel.localeCompare(b.titel, "de");
      const yearDifference = order === "neu" ? b.jahr - a.jahr : a.jahr - b.jahr;
      return yearDifference || a.titel.localeCompare(b.titel, "de");
    });
}

function gameCard(game) {
  const title = escapeHtml(game.titel);
  return `
    <article class="card">
      <div class="art" role="img" aria-label="Grafischer Platzhalter für eine spätere Spielabbildung">
        <span class="art-title">${title}</span>
        <small>Abbildung folgt</small>
      </div>
      <div class="card-content">
        <span class="year">${escapeHtml(game.jahr)}</span>
        <h3>${title}</h3>
        <p class="byline">${game.autoren.map(escapeHtml).join(" · ")}</p>
        <p class="summary">${escapeHtml(game.kurz)}</p>
        <div class="tags">${game.mechaniken.map((value) => `<span class="tag">${escapeHtml(value)}</span>`).join("")}</div>
        <div class="phase">${escapeHtml(game.aufnahme || "Vorläufig aufgenommen")} · ${escapeHtml(game.beitrag)}</div>
      </div>
    </article>
  `;
}

function render() {
  const games = getFilteredGames();
  const count = games.length;
  getElement("anzahl").textContent = `${count} ${count === 1 ? "Spiel" : "Spiele"}`;
  getElement("karten").innerHTML = games.map(gameCard).join("");
  getElement("keine-treffer").style.display = count ? "none" : "block";
}

function resetFilters() {
  getElement("suchfeld").value = "";
  getElement("aufnahme").value = "";
  getElement("mechanik").value = "";
  getElement("sortierung").value = "alt";
  render();
}

async function init() {
  try {
    const response = await fetch("spiele.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const games = await response.json();
    if (!Array.isArray(games)) throw new Error("Ungültige Daten");
    state.spiele = games;

    addFilterOptions("mechanik", games.flatMap((game) => game.mechaniken));
    ["suchfeld", "aufnahme", "mechanik", "sortierung"].forEach((id) => {
      getElement(id).addEventListener(id === "suchfeld" ? "input" : "change", render);
    });
    getElement("zuruecksetzen").addEventListener("click", resetFilters);
    render();
  } catch (error) {
    console.error("Die Spieldaten konnten nicht geladen werden:", error);
    getElement("anzahl").textContent = "Spieldaten konnten nicht geladen werden.";
    getElement("karten").innerHTML = "<p>Bitte prüfen, ob spiele.json im selben Ordner liegt. Die Seite muss über GitHub Pages (nicht direkt als lokale Datei) geöffnet werden.</p>";
  }
}

document.addEventListener("DOMContentLoaded", init);
