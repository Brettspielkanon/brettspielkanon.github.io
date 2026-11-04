# Der Brettspielkanon – strukturelle Codebereinigung

Dies ist eine wartungsfreundlich strukturierte Fassung der bestehenden Webseite. Die Texte, Spieldaten,
Navigationsziele und inhaltlichen Entscheidungen wurden nicht neu bearbeitet.

## Dateien

- `index.html`, `kanon.html`, `methodik.html`, `projektplan.html`, `impressum.html` – Seiteninhalte
- `css/styles.css` – gemeinsames Design: Farbvariablen, Navigation, Titelbereich, Buttons, Footer
- `css/index.css`, `css/kanon.css`, `css/methodik.css`, `css/projektplan.css`, `css/impressum.css` – seitenspezifische Layouts
- `kanon.js` – Laden, Filtern, Sortieren und Anzeigen der Spielkarten
- `spiele.json` – 25 vorläufig aufgenommene Spiele, unveränderte Ausgangsdaten

## Was bereinigt wurde

1. Mehrere inline-Stylesheets je HTML-Seite durch externe, lesbar formatierte CSS-Dateien ersetzt.
2. Seitenübergreifende Regeln zentralisiert – insbesondere der einheitliche 380-px-Titelbereich für Desktopansichten.
3. Unbenutzte, aus anderen Seiten kopierte CSS-Regeln entfernt.
4. Die langen HTML-Zeilen strukturiert formatiert und die doppelte ID `quellen` in `methodik.html` korrigiert.
5. `kanon.js` in klar benannte Funktionen gegliedert; Suche, Sortierung und Statusfilter bleiben erhalten.

## Aktualisierung auf GitHub Pages

**Den gesamten Inhalt des ZIP-Archivs inklusive des Ordners `css/` in das Repository-Stammverzeichnis hochladen.**
Die bisherigen HTML-, JS- und JSON-Dateien ersetzen. Ohne `css/` würde das Layout fehlen.

## Hinweise

Die Footer-Texte zum Stand der Datenschutzerklärung wurden unverändert belassen.
Die historisch gewachsene visuelle Gestaltung soll weitgehend erhalten bleiben; geringe Unterschiede
in der Darstellung einzelner Abstände durch die entfernten widersprüchlichen CSS-Regeln sind möglich.
Eine Sichtprüfung im eigenen Browser nach dem Upload wird empfohlen.
