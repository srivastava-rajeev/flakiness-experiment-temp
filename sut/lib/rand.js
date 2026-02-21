/**
 * Small seeded RNG (mulberry32)
 * Usage: const rng = makeRand(seed); rng.float(); rng.bernoulli(p); rng.intRange(a,b)
 */
function mulberry32(a) {
  return function() {
    a |= 0;
    a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

module.exports = function makeRand(seed) {
  const next = mulberry32(seed >>> 0);
  return {
    float: () => next(),
    bernoulli: (p) => next() < (p || 0.5),
    intRange: (min, max) => Math.floor(next() * (max - min + 1)) + min,
    pick: (arr) => arr[Math.floor(next() * arr.length)]
  };
};
