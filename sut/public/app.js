(async function(){
  // fetch SUT config (server provides)
  let config = {};
  try {
    const r = await fetch('/__config');
    config = await r.json();
  } catch(e) {
    config = { seed: Date.now(), dom_delay_ms: {min:0,max:200}, dom_delay_enabled:true };
  }

  // local RNG derived from seed
  function mulberry32(a){ return function(){ a |= 0; a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
  const rnd = mulberry32((config.seed || Date.now()) >>> 0);
  const rng = { float: ()=>rnd(), intRange:(min,max)=>Math.floor(rnd()*(max-min+1))+min };

  const resultEl = document.getElementById('result');
  document.getElementById('runBtn').addEventListener('click', onClick);

  function setResult(text){ resultEl.textContent = text; }

  async function worker(label, extraDelay){
    try {
      const res = await fetch('/api/data');
      const json = await res.json().catch(()=>({ok:false}));
      const domDelay = (config.dom_delay_enabled && config.dom_delay_ms) ? rng.intRange(config.dom_delay_ms.min, config.dom_delay_ms.max) : 0;
      await new Promise(r => setTimeout(r, domDelay + (extraDelay||0)));
      setResult(label + ':' + (json.ok ? 'OK' : 'ERR') + ' d=' + (json.ts ? (Date.now()-json.ts) : 'na'));
    } catch (e) {
      setResult(label + ':NETWORK-ERR');
    }
  }

  // two competing async updates -> race
  function onClick(){
    setResult('running...');
    // slight offsets to make race more likely
    worker('A', 0);
    worker('B', 10);
  }

})();
