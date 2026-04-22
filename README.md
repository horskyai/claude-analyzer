# Claude Code Conversation Analyzer

![Node.js](https://img.shields.io/badge/Node.js-16%2B-brightgreen?logo=node.js)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-blue)
![License](https://img.shields.io/badge/licence-MIT-orange)

> Automaticky analyzuje celou historii tvých konverzací s Claude Code — zjistí kolik jich máš, o čem byly, kolik výměn proběhlo a vygeneruje čitelné přepisy.

---

## Rychlý start

```bash
# 1. Stáhni skript
git clone https://github.com/JiriHorsky/claude-analyzer.git
cd claude-analyzer

# 2. Spusť
node claude-conversation-analyzer.js --output results.json --md results.md
```

To je vše. Výsledky najdeš v `results.md`.

---

## Co skript udělá

| Výstup | Popis |
|---|---|
| 📋 Soupis konverzací | Datum, projekt, počet výměn pro každou session |
| 💬 Čisté přepisy | Co jsi říkal ty a co odpověděl Claude |
| 🗂️ Tematický přehled | O čem jednotlivé konverzace byly |
| 📄 Markdown report | Přehledný soubor otevřitelný v jakémkoli editoru |
| 🔢 JSON export | Plná data pro další zpracování nebo vizualizaci |

---

## Požadavky

- [Node.js](https://nodejs.org/) verze 16 nebo novější
- Claude Code s alespoň jednou konverzací (složka `~/.claude/projects/` musí existovat)

---

## Instalace

### Varianta A — Git clone

```bash
git clone https://github.com/JiriHorsky/claude-analyzer.git
cd claude-analyzer
```

### Varianta B — Jen skript

```bash
curl -O https://raw.githubusercontent.com/JiriHorsky/claude-analyzer/main/claude-conversation-analyzer.js
```

---

## Použití

```bash
# Pouze výpis do terminálu
node claude-conversation-analyzer.js

# Uložení výsledků
node claude-conversation-analyzer.js --output results.json --md results.md
```

### Parametry

| Parametr | Popis |
|---|---|
| `--output <soubor.json>` | Uloží plná data včetně přepisů do JSON |
| `--md <soubor.md>` | Uloží přehledný Markdown report |

---

## Ukázka výstupu

```
🔍 Claude Code Conversation Analyzer
📂 Scanning: C:\Users\Jan\.claude\projects

✅ Nalezeno 14 sessions celkem
💬 Z toho neprázdných: 14
🔄 Celkem výměn (user+Claude): 2 232

#    Datum        Projekt                             Výměny   Téma
────────────────────────────────────────────────────────────────────────────
1    2026-03-19   Jarvis Life OS                        540    Import do Mem0
2    2026-03-19   DataMAP Tool                          226    Analýza JSON schémat
3    2026-03-24   Jarvis Life OS                         82    Spuštění localhost
...
```

---

## Struktura výstupních souborů

```
claude-analyzer/
├── results.md              ← hlavní přehled (otevři tady)
├── results.json            ← plná data s přepisy
└── prepisy/
    ├── 01-Jarvis-Life-OS-2026-03-19.md
    ├── 02-DataMAP-schemata-2026-03-19.md
    └── ...                 ← jeden soubor = jedna konverzace
```

---

## Kde Claude Code ukládá data

```
Windows:       C:\Users\<jméno>\.claude\projects\
macOS/Linux:   ~/.claude/projects/
```

Každý projekt = vlastní podsložka. Uvnitř jsou `.jsonl` soubory — jeden soubor = jedna session. Agenti jsou v podsložce `/subagents/` (skript je přeskakuje, analyzuje jen hlavní konverzace).

---

## Jak to funguje

```
~/.claude/projects/
        ↓
  prohledá všechny .jsonl soubory
        ↓
  vytáhne zprávy type: "user" a type: "assistant"
        ↓
  spočítá výměny, přiřadí téma, sestaví přepis
        ↓
  vygeneruje report (terminal / JSON / Markdown)
```

---

## Řešení problémů

**Skript nenajde žádné konverzace**
→ Ověř že existuje `~/.claude/projects/` a obsahuje `.jsonl` soubory.

**Chybí Node.js**
→ Stáhni na [nodejs.org](https://nodejs.org/) — doporučená verze LTS.

**Chci analyzovat jen jeden konkrétní projekt**
→ V kódu uprav proměnnou `CLAUDE_DIR` na konkrétní cestu ke složce projektu.

---

## Licence

MIT — volně k použití, uprav si podle svých potřeb.

---

## Autor

**Jiří Horský** — vzniklo jako replikovatelný pracovní postup pro analýzu vlastní historie s Claude Code.
