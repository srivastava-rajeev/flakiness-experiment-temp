const fs = require('fs');

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

// export helpers
module.exports = {
  async maybeInject(req, res, config, rng) {
    // Network abort (abrupt): destroy socket
    if (config.network_abort_enabled && rng.bernoulli(config.network_failure_prob)) {
      console.warn('Injected network abort for', req.path);
      try { res.socket.destroy(); } catch (e) { /* ignore */ }
      return { aborted: true, injectedDelay: 0, injectedFailure: false };
    }

    // Delay injection
    let d = 0;
    if (config.delay_enabled) {
      d = rng.intRange(config.delay_ms.min, config.delay_ms.max);
      await sleep(d);
    }

    // Determine success/failure
    const ok = rng.bernoulli(config.success_prob);
    if (!ok) {
      res.status(500).json({ ok: false, reason: 'injected-failure' });
      return { aborted: false, injectedDelay: d, injectedFailure: true };
    }

    // DOM rendering delay
    if (config.dom_delay_enabled) {
      const domDelay = rng.intRange(config.dom_delay_ms.min, config.dom_delay_ms.max);
      console.warn(`Injected DOM delay: ${domDelay}ms`);
      await sleep(domDelay);
    }

    // Random failure injection
    if (config.random_failure_enabled && rng.bernoulli(config.random_failure_prob)) {
      console.warn('Injected random failure');
      return { aborted: false, injectedDelay: d, injectedFailure: true };
    }

    return { aborted: false, injectedDelay: d, injectedFailure: false };
  }
};
