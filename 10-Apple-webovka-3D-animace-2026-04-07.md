# Konverzace 10 — C Users Ji Horsk

> **O čem to bylo:** Tvorba elegantní webové stránky pro Apple s 3D animacemi pomocí Three.js, CSS 3D, parallax efektů a interaktivních prvků.

**Datum:** 2026-04-07  
**Téma:** Create website for Apple company  
**Session ID:**   
**Výměny:** 2× ty + 3× Claude = **5 celkem**

---

## 👤 Ty

Vytvoř mi webovou stránku pro společnost Apple

---

## 🤖 Claude

Stránka byla vytvořena v [apple.html](apple.html).

**Co obsahuje:**

- **Navigace** — fixní průhledný panel s Apple logem a 7 navigačními odkazy
- **Hero sekce** — animované gradientové pozadí s CSS ilustrací iPhone a CTA tlačítky
- **Pohyblivý ticker** — specifikace iPhone 16 Pro
- **Produktové karty** — Mac, iPhone, iPad, Apple Watch, AirPods s CSS ilustracemi zařízení
- **M3 chip banner** — animovaná vizualizace čipu s výkonovými statistikami
- **Sekce hodnot** — Privacy, Environment, Accessibility
- **Newsletter** — formulář s validací
- **Footer** — 5-sloupcové menu s odkazy

**Design funkce:**
- Čistý Apple design (bílá/šedá/černá + modrý akcent `#0071e3`)
- Tmavý režim (`prefers-color-scheme: dark`)
- Animace při scrollování, hover efekty, parallax
- Plně responsivní pro mobil i desktop

Otevři soubor v prohlížeči a podívej se na výsledek!

---

## 👤 Ty

<ide_opened_file>The user opened the file c:\Users\Jiří Horský\apple.html in the IDE. This may or may not be related to the current task.</ide_opened_file> tak mi udělej 3D animaci

---

## 🤖 Claude

Přidám 3D animace do stránky. Nejdřív se podívám na současný stav souboru.

---

## 🤖 Claude

Stránka je hotová s plnohodnotnými 3D animacemi. Tady je co přibylo:

**Three.js (WebGL) hero scéna**
- 3D iPhone tvar s vlastním GLSL shader materiálem — animovaný modrý/růžový gradient přes povrch
- 180 plovoucích částic kolem zařízení
- Při scrollování se telefon zmenšuje a naklání — filmový efekt

**CSS 3D produktové karty**
- Naklopení karty sleduje přesnou pozici kurzoru myši (rotateX/rotateY)
- Lesklý světelný odraz sleduje pohyb myši
- Ikona se "přibližuje" v Z-ose při hoveru

**3D rotující chip kostka**
- M3 chip jako šestistěnná CSS 3D kostka s průhledností a circuit vzorem
- Neustálá rotace na Y-ose se sklonem pro hloubku

**Parallax 3D vrstvy**
- Pozadí hero sekce má 3 vrstvy pohybující se různou rychlostí při pohybu myši

**3D text reveal**
- Nadpisy sekcí přilétají s 3D převratem (z 80° rotateX na 0°) při scrollování do pohledu

**Scroll-driven transformace**
- Celá Three.js scéna reaguje na scrollování — 3D pozice, rotace i scale se mění cinematicky

Otevři [apple.html](apple.html) v prohlížeči!

---

