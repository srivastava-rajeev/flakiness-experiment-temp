# Post #5: The Engineering Causes Behind Flaky Tests in Modern Systems

## Common Root Causes
- Async timing/race conditions
- Shared mutable state
- Network and dependency instability
- Microservice startup/order issues
- Brittle test design and weak isolation

## Practical Direction
Map each failure pattern to a remediation playbook and track recurrence.

## Repo Artifact (Technical Depth)

- Taxonomy doc: `docs/root-causes-taxonomy.md`

The taxonomy links each root cause to:

- observable signals (duration variance, retries, latency spikes, order dependence)
- likely failure modes
- concrete mitigation patterns

## Why This Matters for Flaky Prediction

Prediction flags unstable tests, but long-term reliability only improves when each predicted risk is mapped to a root-cause class and fixed at source.

## Example Mapping

- Signal: rising `duration_var_ms` + retry spikes
- Candidate cause: async timing/race conditions
- Mitigation: event-based waits, deterministic synchronization points, and reduced concurrency coupling
