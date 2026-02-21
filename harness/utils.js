function tryParseJson(s) {
  try { return JSON.parse(s); }
  catch (e) {
    const firstObj = s.indexOf('{');
    const lastObj = s.lastIndexOf('}');
    if (firstObj !== -1 && lastObj !== -1 && lastObj > firstObj) {
      try { return JSON.parse(s.slice(firstObj, lastObj + 1)); } catch (e2) {}
    }
    const firstArr = s.indexOf('[');
    const lastArr = s.lastIndexOf(']');
    if (firstArr !== -1 && lastArr !== -1 && lastArr > firstArr) {
      try { return JSON.parse(s.slice(firstArr, lastArr + 1)); } catch (e3) {}
    }
    throw e;
  }
}

function collectTestEntries(obj) {
  const tests = [];
  function walk(o, parents) {
    if (!o) return;
    if (Array.isArray(o)) return o.forEach(x => walk(x, parents));
    if (typeof o === 'object') {
      if (o.title && o.status) {
        const full = parents.concat([o.title]).join(' > ');
        tests.push({ title: full, status: o.status, duration: o.duration || null });
      }
      Object.keys(o).forEach(k => walk(o[k], parents.concat([k])));
    }
  }
  walk(obj, []);
  return tests;
}

module.exports = { tryParseJson, collectTestEntries };