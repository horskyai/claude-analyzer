# Konverzace 8 — C Users Ji Horsk

> **O čem to bylo:** Stažení a vysvětlení GitHub repozitáře awesome-design-md — sbírka DESIGN.md souborů pro AI-generované UI s různými design systémy.

**Datum:** 2026-04-02  
**Téma:** Understand awesome-design-md project  
**Session ID:**   
**Výměny:** 13× ty + 22× Claude = **35 celkem**

---

## 👤 Ty

Ahoj Claude, potřebuji od tebe vysvětlit co dělá tenhle projekt https://github.com/VoltAgent/awesome-design-md ?

---

## 🤖 Claude

Projekt **awesome-design-md** je kurátorovaná kolekce souborů `DESIGN.md` inspirovaných populárními weby pro vývojáře.

## Co to je?

`DESIGN.md` je nový koncept od **Google Stitch** — jednoduchý Markdown soubor, který popisuje design systém projektu (barvy, typografii, komponenty, layout...). AI agenti ho čtou a na základě něj generují UI, které vizuálně odpovídá danému stylu.

Analogie:
| Soubor | Čte ho | Co popisuje |
|--------|--------|-------------|
| `AGENTS.md` | Coding agenti | Jak projekt buildovat |
| `DESIGN.md` | Design agenti | Jak má projekt vypadat |

## Jak to funguje v praxi?

1. Zkopíruješ `DESIGN.md` ze sbírky do kořene svého projektu
2. Řekneš AI agentovi: *"Build me a page that looks like this"*
3. Agent vygeneruje UI, které vizuálně odpovídá danému webu

## Co obsahuje každý DESIGN.md?

- Barevná paleta (hex kódy + sémantické role)
- Typografie (fonty, hierarchie)
- Styly komponent (tlačítka, karty, inputs)
- Layout principy, spacing, responzivita
- Do's and Don'ts
- Připravené prompty pro agenty

## Kolekce

Aktuálně **55 souborů** pro weby jako: Claude, Vercel, Linear, Stripe, Notion, Figma, Supabase, Cursor, Spotify, Apple, SpaceX a mnoho dalších — rozdělené do kategorií (AI nástroje, dev tools, fintech, enterprise...).

Každý web má i `preview.html` a `preview-dark.html` — vizuální katalog barev, typografie a komponent.

---

Stručně řečeno: je to **knihovna hotových design systémů**, kterou můžeš předhodit AI agentovi a říct mu "udělej stránku ve stylu Stipe/Notion/Apple" — a on to skutečně dokáže.

---

## 👤 Ty

a dá se to stáhnout?

---

## 🤖 Claude

Ano, několik možností:

**1. Celé repo jako ZIP** (nejjednodušší)
```
https://github.com/VoltAgent/awesome-design-md/archive/refs/heads/main.zip
```

**2. Git clone**
```bash
git clone https://github.com/VoltAgent/awesome-design-md.git
```

**3. Jeden konkrétní DESIGN.md** (přes raw GitHub)
Například pro Stripe:
```
https://raw.githubusercontent.com/VoltAgent/awesome-design-md/main/design-md/stripe/DESIGN.md
```

Chceš, abych ti stáhl konkrétní soubor nebo celou kolekci přímo sem?

---

## 👤 Ty

git clone https://github.com/VoltAgent/awesome-design-md.git

---

## 🤖 Claude

Hotovo. Repo je naklonované do `C:\Users\Jiří Horský\awesome-design-md`.

---

## 🤖 Claude

Staženo úspěšně. Ve složce `design-md/` je 55 podadresářů — každý s `DESIGN.md`, `preview.html` a `preview-dark.html`. Chceš použít nějaký konkrétní?

---

## 👤 Ty

https://github.com/horskyai?tab=repositories - nemám to tam

---

## 🤖 Claude

Nemohu načíst obsah té URL — nemám přístup k webu. Ale pokud chceš, můžu ti místo toho ukázat, co je naklonované lokálně, nebo ti pomoci s něčím konkrétním s těmi DESIGN.md soubory.

Co jsi měl na mysli — že repo není ve tvém GitHub profilu? Chceš ho tam forknout nebo pushout?

---

## 👤 Ty

ano, není pusni mi to tam

---

## 🤖 Claude

Než to pushnu, potřebuji pár věcí ověřit. Máš na GitHubu repo `awesome-design-md` vytvořené, nebo ho mám vytvořit jako nové? A jaký je tvůj GitHub username — `horskyai`?

Také potřebuji vědět, jak se chceš autentizovat — máš nastavený `gh` CLI nebo SSH klíč?

---

## 🤖 Claude

`gh` CLI není nainstalovaný. Možnosti:

**Možnost A — Fork přes GitHub web** (nejjednodušší):
Jdi na [github.com/VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) a klikni na **Fork** vpravo nahoře. Za 2 sekundy to máš ve svém profilu.

**Možnost B — Ruční push** (pokud chceš vlastní kopii, ne fork):
1. Vytvoř prázdné repo na GitHubu jako `horskyai/awesome-design-md`
2. Řekni mi a já přenastavím remote a pushnu

Která varianta ti víc vyhovuje?

---

## 👤 Ty

gh repo clone VoltAgent/awesome-design-md

---

## 🤖 Claude

Tenhle příkaz by ti naklonoval repo lokálně (to už máme). Na push/fork do tvého profilu potřebuješ `gh` CLI nainstalovaný.

Chceš ho nainstalovat?

---

## 🤖 Claude

`gh` CLI není nainstalovaný. Nainstaluju ho přes winget:

---

## 🤖 Claude

`gh` je nainstalovaný, jen není v PATH v tomto shellu. Zkusím ho najít:

---

## 🤖 Claude

`gh` je nainstalovaný, ale nejsi přihlášený. Potřebuješ se přihlásit — to musíš udělat ručně v terminálu, protože vyžaduje interaktivní vstup:

```bash
"C:\Program Files\GitHub CLI\gh.exe" auth login
```

Zvol:
- **GitHub.com**
- **HTTPS**
- **Login with a web browser** (nejjednodušší)

Až se přihlásíš, řekni mi a já forkneme repo do tvého profilu.

---

## 👤 Ty

jsem tam přihlášení

---

## 🤖 Claude

Zdá se, že přihlášení proběhlo v jiném terminálu/okně, ale tato session ho nevidí. Zkus spustit přímo v příkazovém řádku (CMD nebo PowerShell):

```
"C:\Program Files\GitHub CLI\gh.exe" repo fork VoltAgent/awesome-design-md --clone=false
```

Nebo pokud chceš, abych to udělal já, otevři nový terminál, přihlas se tam přes `gh auth login` a pak spusť ten příkaz. Výsledek mi sem zkopíruj.

---

## 👤 Ty

jsem přihlášen https://github.com/horskyai?tab=overview&from=2026-03-01&to=2026-03-31

---

## 🤖 Claude

Vidím, že jsi přihlášen na GitHub. Zkusím fork přímo:

---

## 🤖 Claude

`gh` CLI v tomto shellu stále není přihlášený. Nejrychlejší řešení je přes **GitHub token**:

1. Jdi na [github.com/settings/tokens](https://github.com/settings/tokens) → **Generate new token (classic)**
2. Zaškrtni scope `repo`
3. Vygeneruj a zkopíruj token
4. Řekni mi token a já ho použiju pro fork

Nebo ještě jednodušeji — jdi přímo na [github.com/VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) a klikni na tlačítko **Fork** vpravo nahoře. Za 2 sekundy hotovo.

---

## 👤 Ty

Vyzkoušíme něco?

---

## 🤖 Claude

Jasně, co máš na mysli?

---

## 👤 Ty

Webovou stránku podle awesome-design-md ?

---

## 🤖 Claude

Super nápad! Podle kterého DESIGN.md chceš stránku postavit? Máme 55 možností, například:

- **Vercel** — černobílá preciznost
- **Stripe** — fialové gradienty, elegance
- **Linear** — ultra-minimální, fialový akcent
- **Notion** — teplý minimalismus, serif nadpisy
- **Supabase** — tmavá emerald témata
- **Apple** — prémium bílý prostor
- **SpaceX** — strohá černobílá, futurismus

A co má stránka dělat / zobrazovat? Můžeme udělat třeba portfolio, landing page, dashboard...

---

## 👤 Ty

Apple, udělej základ stránky.

---

## 🤖 Claude

Mám DESIGN.md přečtený. Vytvořím základní stránku:

---

## 🤖 Claude

Hotovo! Stránka je uložena v [C:/Users/Jiří Horský/apple-page/index.html](C:/Users/Jiří Horský/apple-page/index.html).

Co je implementováno přesně podle DESIGN.md:

- **Navigace** — skleněný blur efekt (`rgba(0,0,0,0.8)` + `backdrop-filter`), 48px výška
- **Hero sekce** — černé pozadí, SF Pro Display 56px, line-height 1.07, letter-spacing -0.28px
- **Tlačítka** — Apple Blue `#0071e3` primární, pill shape 980px radius pro "Více informací"
- **Produktové karty** — bílé kardy na `#f5f5f7` pozadí, card shadow `rgba(0,0,0,0.22) 3px 5px 30px`
- **Střídání sekcí** — černá → světle šedá → černá (kinematický rytmus)
- **Typografie** — negativní letter-spacing na všech velikostech

Otevři soubor v prohlížeči. Chceš něco upravit nebo přidat?

---

## 👤 Ty

pošli mi localhost

---

## 🤖 Claude

Spustím lokální server:

---

## 🤖 Claude

Server běží: **http://localhost:8080**

---

## 👤 Ty

<task-notification>
<task-id>bu4xe4dqs</task-id>
<tool-use-id>toolu_01R2Td3iCpqZfPokS54b7ET3</tool-use-id>
<output-file>C:\Users\JIHORS~1\AppData\Local\Temp\claude\C--Users-Ji---Horsk-\bf1369f3-162d-45c7-9308-3ccc35812834\tasks\bu4xe4dqs.output</output-file>
<status>completed</status>
<summary>Background command "Start local HTTP server on port 8080" completed (exit code 0)</summary>
</task-notification>
Read the output file to retrieve the result: C:\Users\JIHORS~1\AppData\Local\Temp\claude\C--Users-Ji---Horsk-\bf1369f3-162d-45c7-9308-3ccc35812834\tasks\bu4xe4dqs.output

---

## 🤖 Claude

Server se ukončil hned po startu. Zkusím jinak:

---

## 🤖 Claude

Server by měl běžet na **http://localhost:8080**

Pokud se stránka neotevře, otevři si sám terminál a spusť:
```
cd "C:\Users\Jiří Horský\apple-page"
python -m http.server 8080
```

---

