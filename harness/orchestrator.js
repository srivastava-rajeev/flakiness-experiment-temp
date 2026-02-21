/**
 * Orchestrator: run Playwright test suite 'runs' times.
 * Writes each run stdout to data/raw/run-<i>.log
 * Writes structured NDJSON per test to data/raw/run-<i>.ndjson
 */
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const config = require('../config/experiment.config.json');
const runs = config.runs || 10;
const { tryParseJson, collectTestEntries } = require('./utils');

async function runOnce(i) {
  return new Promise((resolve) => {
    console.log('[orchestrator] starting run', i);
    // use JSON reporter so we can parse structured results
    const cmd = 'npx playwright test --reporter=json';
    const p = exec(cmd, { maxBuffer: 1024 * 1024 * 20 });
    let out = '';
    p.stdout.on('data', (d) => { out += d; process.stdout.write(d); });
    p.stderr.on('data', (d) => { out += d; process.stderr.write(d); });
    p.on('close', (code) => {
      const runId = String(i).padStart(3, '0');
      const rawLogPath = path.join('data', 'raw', `run-${runId}.log`);
      const ndjsonPath = path.join('data', 'raw', `run-${runId}.ndjson`);
      fs.writeFileSync(rawLogPath, out);

      // attempt to parse JSON output and write NDJSON per test
      try {
        const parsed = tryParseJson(out);
        const entries = collectTestEntries(parsed);
        if (entries.length === 0 && Array.isArray(parsed)) {
          // sometimes the top-level is an array of results
          for (const item of parsed) {
            const e = collectTestEntries(item);
            entries.push(...e);
          }
        }

        if (entries.length > 0) {
          const stream = fs.createWriteStream(ndjsonPath, { flags: 'w' });
          for (const t of entries) {
            const outObj = Object.assign({ run: i, ts: Date.now() }, t);
            stream.write(JSON.stringify(outObj) + '\n');
          }
          stream.end();
          console.log(`[orchestrator] wrote ${entries.length} test entries to ${ndjsonPath}`);
        } else {
          // fallback: write a single summary line
          fs.writeFileSync(ndjsonPath, JSON.stringify({ run: i, ts: Date.now(), note: 'no-entries-parsed' }) + '\n');
        }
      } catch (e) {
        // parsing failed; write a failure marker
        fs.writeFileSync(ndjsonPath, JSON.stringify({ run: i, ts: Date.now(), parse_error: String(e) }) + '\n');
      }

      resolve({ run: i, code });
    });
  });
}

(async () => {
  console.log('Orchestrator: running', runs, 'runs');
  // ensure data/raw exists
  try { fs.mkdirSync(path.join('data', 'raw'), { recursive: true }); } catch (e) { /* ignore */ }
  for (let i = 0; i < runs; i++) {
    // optionally rotate seed by posting to /__config if desired
    await runOnce(i);
    // small pause between runs
    await new Promise(r => setTimeout(r, 500));
  }
  console.log('Orchestrator: done');
})();
