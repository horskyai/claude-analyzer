#!/usr/bin/env node

/**
 * Claude Code Conversation Analyzer
 * ===================================
 * Analyzes all conversations stored in ~/.claude/projects/
 * Works on Windows, macOS, and Linux.
 *
 * Usage:
 *   node claude-conversation-analyzer.js
 *   node claude-conversation-analyzer.js --output results.json
 *   node claude-conversation-analyzer.js --md results.md
 *
 * Output:
 *   - List of all conversations with session ID, project, date, exchange count
 *   - Per-conversation: what the user asked about (topic summary)
 *   - Clean conversation transcript (user ↔ Claude)
 *   - Optional Markdown report
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

// ─── CONFIG ──────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const OUTPUT_JSON = args.includes('--output') ? args[args.indexOf('--output') + 1] : null;
const OUTPUT_MD   = args.includes('--md')     ? args[args.indexOf('--md')     + 1] : null;

const CLAUDE_DIR = path.join(os.homedir(), '.claude', 'projects');

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function extractText(content) {
  if (!content) return '';
  if (typeof content === 'string') return content.trim();
  if (Array.isArray(content)) {
    return content
      .filter(c => c.type === 'text')
      .map(c => (c.text || '').trim())
      .join(' ');
  }
  return '';
}

function truncate(str, n = 120) {
  if (!str) return '';
  const clean = str.replace(/\n+/g, ' ').trim();
  return clean.length > n ? clean.slice(0, n) + '…' : clean;
}

function projectFolderToName(folder) {
  // Convert encoded folder name like c--Users-Ji---Horsk--Desktop-Jarvis
  // back to a readable project label
  return folder
    .replace(/^c--Users-[^-]+-[^-]+-Desktop-/, '')  // strip common prefix
    .replace(/-{2,}/g, ' ')
    .replace(/-/g, ' ')
    .trim() || folder;
}

// ─── PARSE ONE JSONL FILE ────────────────────────────────────────────────────

function parseSession(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const lines = raw.split('\n').filter(l => l.trim());

  const exchanges = [];   // { role: 'user'|'assistant', text, timestamp }
  let sessionId = null;
  let startTime = null;
  let endTime   = null;
  let aiTitle   = null;
  let entrypoint = null;
  let model      = null;

  for (const line of lines) {
    let obj;
    try { obj = JSON.parse(line); } catch { continue; }

    if (!sessionId && obj.sessionId) sessionId = obj.sessionId;
    if (obj.type === 'ai-title') aiTitle = obj.aiTitle;

    if (obj.type === 'user') {
      const text = extractText(obj.message?.content);
      if (!text) continue;
      const ts = obj.timestamp || null;
      if (ts && !startTime) startTime = ts;
      if (ts) endTime = ts;
      if (!entrypoint && obj.entrypoint) entrypoint = obj.entrypoint;
      exchanges.push({ role: 'user', text, timestamp: ts });
    }

    if (obj.type === 'assistant') {
      const msg = obj.message;
      if (!msg) continue;
      if (msg.model && !model) model = msg.model;
      const parts = Array.isArray(msg.content) ? msg.content : [];
      const textParts = parts.filter(p => p.type === 'text').map(p => p.text || '');
      const text = textParts.join(' ').trim();
      if (!text) continue;
      const ts = obj.timestamp || null;
      if (ts) endTime = ts;
      exchanges.push({ role: 'assistant', text, timestamp: ts });
    }
  }

  return { sessionId, startTime, endTime, aiTitle, entrypoint, model, exchanges };
}

// ─── TOPIC SUMMARY ───────────────────────────────────────────────────────────

function guessTopic(session) {
  if (session.aiTitle) return session.aiTitle;
  const firstUser = session.exchanges.find(e => e.role === 'user');
  return firstUser ? truncate(firstUser.text, 80) : '(empty)';
}

// ─── SCAN ALL PROJECTS ───────────────────────────────────────────────────────

function findAllSessions(baseDir) {
  const sessions = [];

  if (!fs.existsSync(baseDir)) {
    console.error(`Directory not found: ${baseDir}`);
    process.exit(1);
  }

  const projectFolders = fs.readdirSync(baseDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  for (const projFolder of projectFolders) {
    const projPath = path.join(baseDir, projFolder);
    const projName = projectFolderToName(projFolder);

    const entries = fs.readdirSync(projPath, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.jsonl')) {
        const filePath = path.join(projPath, entry.name);
        try {
          const session = parseSession(filePath);
          session.project     = projName;
          session.projectRaw  = projFolder;
          session.filePath    = filePath;
          session.topic       = guessTopic(session);
          session.userTurns   = session.exchanges.filter(e => e.role === 'user').length;
          session.claudeTurns = session.exchanges.filter(e => e.role === 'assistant').length;
          session.totalTurns  = session.userTurns + session.claudeTurns;
          sessions.push(session);
        } catch (err) {
          console.warn(`  ⚠ Skipped ${filePath}: ${err.message}`);
        }
      }

      // Also scan session subdirectories (but skip /subagents)
      if (entry.isDirectory() && entry.name !== 'subagents') {
        const subPath = path.join(projPath, entry.name);
        const subEntries = fs.readdirSync(subPath, { withFileTypes: true });
        for (const sub of subEntries) {
          if (sub.isFile() && sub.name.endsWith('.jsonl')) {
            const filePath = path.join(subPath, sub.name);
            try {
              const session = parseSession(filePath);
              session.project    = projName;
              session.projectRaw = projFolder;
              session.filePath   = filePath;
              session.topic      = guessTopic(session);
              session.userTurns   = session.exchanges.filter(e => e.role === 'user').length;
              session.claudeTurns = session.exchanges.filter(e => e.role === 'assistant').length;
              session.totalTurns  = session.userTurns + session.claudeTurns;
              sessions.push(session);
            } catch (err) {
              console.warn(`  ⚠ Skipped ${filePath}: ${err.message}`);
            }
          }
        }
      }
    }
  }

  // Sort by start time
  sessions.sort((a, b) => {
    if (!a.startTime) return 1;
    if (!b.startTime) return -1;
    return a.startTime.localeCompare(b.startTime);
  });

  return sessions;
}

// ─── MARKDOWN REPORT ─────────────────────────────────────────────────────────

function buildMarkdown(sessions) {
  const nonEmpty = sessions.filter(s => s.totalTurns > 0);
  const totalExchanges = nonEmpty.reduce((s, c) => s + c.totalTurns, 0);
  const uniqueProjects = [...new Set(nonEmpty.map(s => s.project))];

  let md = `# Claude Code – Analýza konverzací\n\n`;
  md += `**Datum generování:** ${new Date().toLocaleString('cs-CZ')}\n\n`;
  md += `## Souhrn\n\n`;
  md += `| Metrika | Hodnota |\n|---|---|\n`;
  md += `| Celkem konverzací (sessions) | ${nonEmpty.length} |\n`;
  md += `| Celkem výměn (otázka + odpověď) | ${totalExchanges} |\n`;
  md += `| Unikátních projektů | ${uniqueProjects.length} |\n`;
  md += `| Datum nejstarší konverzace | ${nonEmpty[0]?.startTime?.slice(0,10) || 'N/A'} |\n`;
  md += `| Datum nejnovější konverzace | ${nonEmpty[nonEmpty.length-1]?.startTime?.slice(0,10) || 'N/A'} |\n\n`;

  md += `## Přehled projektů\n\n`;
  const byProject = {};
  for (const s of nonEmpty) {
    if (!byProject[s.project]) byProject[s.project] = [];
    byProject[s.project].push(s);
  }
  for (const [proj, slist] of Object.entries(byProject)) {
    md += `### 📁 ${proj}\n\n`;
    md += `| # | Datum | Téma | Výměny (ty / Claude) |\n|---|---|---|---|\n`;
    slist.forEach((s, i) => {
      const date = s.startTime?.slice(0,10) || 'N/A';
      const topic = s.topic.replace(/\|/g, '/');
      md += `| ${i+1} | ${date} | ${truncate(topic, 80)} | ${s.userTurns} / ${s.claudeTurns} |\n`;
    });
    md += `\n`;
  }

  md += `## Detailní přepisy konverzací\n\n`;
  md += `> Zkrácené verze — plný text v JSON výstupu.\n\n`;

  nonEmpty.forEach((s, idx) => {
    const date = s.startTime?.slice(0,10) || 'N/A';
    md += `---\n\n### Konverzace ${idx+1} — ${s.project} (${date})\n\n`;
    md += `**Téma:** ${s.topic}  \n`;
    md += `**Session ID:** \`${s.sessionId}\`  \n`;
    md += `**Výměny:** ${s.userTurns}× uživatel + ${s.claudeTurns}× Claude = ${s.totalTurns} celkem\n\n`;

    const preview = s.exchanges.slice(0, 6);
    for (const ex of preview) {
      const icon = ex.role === 'user' ? '👤 **Ty:**' : '🤖 **Claude:**';
      md += `${icon}\n> ${truncate(ex.text, 200)}\n\n`;
    }
    if (s.exchanges.length > 6) {
      md += `_… a dalších ${s.exchanges.length - 6} zpráv …_\n\n`;
    }
  });

  return md;
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

console.log(`\n🔍 Claude Code Conversation Analyzer`);
console.log(`📂 Scanning: ${CLAUDE_DIR}\n`);

const allSessions = findAllSessions(CLAUDE_DIR);
const nonEmpty    = allSessions.filter(s => s.totalTurns > 0);

console.log(`✅ Nalezeno ${allSessions.length} sessions celkem`);
console.log(`💬 Z toho neprázdných: ${nonEmpty.length}`);
console.log(`🔄 Celkem výměn (user+Claude): ${nonEmpty.reduce((s,c) => s + c.totalTurns, 0)}\n`);

// Console table overview
console.log(`${'#'.padEnd(4)} ${'Datum'.padEnd(12)} ${'Projekt'.padEnd(35)} ${'Výměny'.padEnd(8)} Téma`);
console.log('─'.repeat(120));
nonEmpty.forEach((s, i) => {
  const date  = (s.startTime || '').slice(0,10).padEnd(12);
  const proj  = s.project.slice(0,33).padEnd(35);
  const turns = String(s.totalTurns).padEnd(8);
  const topic = truncate(s.topic, 50);
  console.log(`${String(i+1).padEnd(4)} ${date} ${proj} ${turns} ${topic}`);
});

// Save JSON
if (OUTPUT_JSON) {
  const out = nonEmpty.map(s => ({
    index: nonEmpty.indexOf(s) + 1,
    sessionId:    s.sessionId,
    project:      s.project,
    startDate:    s.startTime?.slice(0,10),
    startTime:    s.startTime,
    endTime:      s.endTime,
    topic:        s.topic,
    model:        s.model,
    entrypoint:   s.entrypoint,
    userTurns:    s.userTurns,
    claudeTurns:  s.claudeTurns,
    totalTurns:   s.totalTurns,
    transcript:   s.exchanges.map(e => ({ role: e.role, text: e.text, timestamp: e.timestamp }))
  }));
  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(out, null, 2), 'utf-8');
  console.log(`\n💾 JSON uložen: ${OUTPUT_JSON}`);
}

// Save Markdown
if (OUTPUT_MD) {
  const md = buildMarkdown(nonEmpty);
  fs.writeFileSync(OUTPUT_MD, md, 'utf-8');
  console.log(`📄 Markdown uložen: ${OUTPUT_MD}`);
}

if (!OUTPUT_JSON && !OUTPUT_MD) {
  console.log(`\nTip: Spusť s --output results.json a/nebo --md results.md pro uložení výstupu.`);
}

console.log(`\n✨ Hotovo!\n`);
