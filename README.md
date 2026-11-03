# Brettspielkanon – Webseitenupdate (3. November 2026)

GitHub-Pages-fertige Dateien. Alle Dateien ins Stammverzeichnis des GitHub-Pages-Repositories kopieren bzw. bestehende Dateien ersetzen.

## Inhalt
- `index.html`: neue Texte in „Die Idee“ und „Die Methodik“, drei Beispielkacheln entfernt und Button zum Projektplan
- `kanon.html`: Einleitung entfernt, Headertext reduziert, Hinweiskasten aktualisiert und Aufnahmestatus statt Entwicklungsphase
- `kanon.js`: funktionierender Filter nach Aufnahmestatus; neutraler Ergebniszähler und dynamische Statusanzeige
- `spiele.json`: 25 vorläufig aufgenommene Titel (keine endgültige Aufnahme)
- `methodik.html`: einheitlicher Titelbereich ohne Eyebrow
- `projektplan.html`: neue Unterseite mit fünf Projektphasen, Phase 3 aktuell

## Layout
Die dunkelblauen Titelbereiche nutzen auf Desktop auf allen vier Seiten dieselbe Mindesthöhe (342 px) und eine gemeinsame vertikale Ausrichtung. Auf schmalen Bildschirmen richtet sich die Höhe responsiv nach dem Inhalt. Die kleine Eyebrow oberhalb der Seitenüberschrift entfällt überall; nummerierte Abschnittsüberschriften im Seiteninhalt bleiben bestehen.

## Hinweis
Das ZIP enthält statische Dateien, aber keine automatische Veröffentlichung. GitHub Pages muss für das Repository aktiviert sein. Spieldaten werden über `fetch('spiele.json')` geladen; zum Testen bitte einen lokalen HTTP-Server oder GitHub Pages verwenden, nicht `file://`.
