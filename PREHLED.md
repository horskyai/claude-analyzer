# Přehled všech konverzací s Claude Code

**Vygenerováno:** 22. dubna 2026
**Celkem konverzací:** 14
**Celkem výměn (ty + Claude):** 2 232
**Období:** 19. března 2026 — 22. dubna 2026

---

## Seznam konverzací

| # | Datum | Soubor | Výměny | O čem to bylo |
|---|---|---|---|---|
| 1 | 19.3.2026 | [01-Jarvis-Life-OS-import-Mem0](prepisy/01-Jarvis-Life-OS-import-Mem0-2026-03-19.md) | 540 | Import 1953 konverzací do Mem0 databáze, backend problémy |
| 2 | 19.3.2026 | [02-DataMAP-schemata-JSON](prepisy/02-DataMAP-schemata-JSON-2026-03-19.md) | 226 | Analýza JSON dat, návrh schémat (meal, payment, experience) |
| 3 | 23.3.2026 | [03-DataMAP-smazani-cross-agent-hub](prepisy/03-DataMAP-smazani-cross-agent-hub-2026-03-23.md) | 67 | Smazání modulu cross_agent_hub.py ze 6 agentů |
| 4 | 23.3.2026 | [04-Jarvis-kratke-spojeni-rate-limit](prepisy/04-Jarvis-kratke-spojeni-rate-limit-2026-03-23.md) | 2 | Přerušeno rate limitem |
| 5 | 24.3.2026 | [05-Jarvis-prehled-capabilities](prepisy/05-Jarvis-prehled-capabilities-2026-03-24.md) | 18 | Přehled projektu Life OS Agent (Mem0, CrewAI, Kiwi API, WhatsApp) |
| 6 | 24.3.2026 | [06-Jarvis-kontrola-stavu-projektu](prepisy/06-Jarvis-kontrola-stavu-projektu-2026-03-24.md) | 53 | Kontrola stavu projektu z předchozího dne |
| 7 | 24.3.2026 | [07-Jarvis-spusteni-localhost](prepisy/07-Jarvis-spusteni-localhost-2026-03-24.md) | 82 | Spuštění FastAPI (port 7777) + Next.js (port 3000) |
| 8 | 2.4.2026 | [08-awesome-design-md-GitHub-repo](prepisy/08-awesome-design-md-GitHub-repo-2026-04-02.md) | 35 | Stažení repozitáře awesome-design-md pro AI UI |
| 9 | 3.4.2026 | [09-Rocni-kontrola-firem-web](prepisy/09-Rocni-kontrola-firem-web-2026-04-03.md) | 120 | HTML stránka pro roční firemní povinnosti |
| 10 | 7.4.2026 | [10-Apple-webovka-3D-animace](prepisy/10-Apple-webovka-3D-animace-2026-04-07.md) | 5 | Apple web s 3D animacemi (Three.js, parallax) |
| 11 | 15.4.2026 | [11-Jarvis-kratke-uvitani](prepisy/11-Jarvis-kratke-uvitani-2026-04-15.md) | 2 | Krátké uvítání bez obsahu |
| 12 | 15.4.2026 | [12-Datova-mapa-osobni-data-QA](prepisy/12-Datova-mapa-osobni-data-QA-2026-04-15.md) | 28 | 100 Q&A záznamů s osobními daty pro chatbot |
| 13 | 16.4.2026 | [13-Ikonky-vizualni-mapa-konverzaci](prepisy/13-Ikonky-vizualni-mapa-konverzaci-2026-04-16.md) | 1049 | Vizuální mapa konverzací s ikonkami + počítání tokenů |
| 14 | 22.4.2026 | [14-Analyza-konverzaci-GitHub-skript](prepisy/14-Analyza-konverzaci-GitHub-skript-2026-04-22.md) | 5 | Tento analyzační skript pro GitHub |

---

## Tematické kategorie

### 🤖 Jarvis / Life OS Agent (5 konverzací)
Práce na osobním AI asistentovi — importy dat do Mem0, CrewAI orchestrace, integrace s WhatsApp, Telegram a Kiwi API, spouštění backendu a frontendu.

- #1 — Import 1953 konverzací do Mem0
- #5 — Přehled capabilities projektu
- #6 — Kontrola stavu projektu
- #7 — Spuštění localhost služeb
- #11 — Krátké uvítání

### 🗺️ DataMAP Tool (2 konverzace)
Práce na nástroji pro mapování dat — tvorba JSON schémat a správa agentů.

- #2 — Návrh datových schémat
- #3 — Smazání cross_agent_hub modulu

### 🌐 Webové stránky (2 konverzace)
Tvorba HTML/CSS webů s pokročilými animacemi.

- #9 — Web pro roční kontrolu firem
- #10 — Apple web s 3D animacemi

### 📊 Datové analýzy & mapování konverzací (3 konverzace)
Práce s daty — generování Q&A dat, vizuální mapa konverzací, analyzační skripty.

- #12 — 100 Q&A záznamů pro chatbot
- #13 — Vizuální mapa konverzací s ikonkami
- #14 — Tento GitHub skript

### 🔗 Externí projekty (1 konverzace)
- #8 — Awesome-design-md repozitář

### ⚡ Krátké / přerušené (1 konverzace)
- #4 — Rate limit

---

## Jak spustit analyzátor u sebe

```bash
# 1. Naklonuj repozitář
git clone https://github.com/...

# 2. Spusť skript (Node.js musí být nainstalovaný)
node claude-conversation-analyzer.js

# 3. Volitelně — ulož výstup
node claude-conversation-analyzer.js --output results.json --md results.md
```

Skript automaticky najde složku `~/.claude/projects/` a analyzuje všechny konverzace.
