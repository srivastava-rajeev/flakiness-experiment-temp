# Root Causes Taxonomy for Flaky Tests

This document maps common flaky-test causes to observable signals and actionable mitigations.

## 1) Async Timing and Race Conditions

### Typical Symptoms
- Intermittent timeout failures
- Assertions pass on retry without code change
- Non-deterministic ordering issues

### Observable Signals
- High variance in `duration_ms`
- Increased retry count near timeout boundaries
- Clustered failures under higher load

### Mitigations
- Replace fixed sleeps with explicit wait conditions
- Synchronize on deterministic events (API completion, DOM stable state)
- Increase isolation between concurrent operations

## 2) Shared Mutable State

### Typical Symptoms
- Tests pass in isolation but fail in suite
- Order-dependent failures
- Failures correlated with specific preceding tests

### Observable Signals
- Failure probability increases with suite position
- Cross-test contamination in DB/cache/session data

### Mitigations
- Enforce test-level setup/teardown with full state reset
- Use unique resource namespaces per test run
- Remove hidden global state from fixtures

## 3) Network and External Dependency Instability

### Typical Symptoms
- Sporadic HTTP errors and connection resets
- Flaky behavior concentrated in integration tests
- Recovery after immediate rerun

### Observable Signals
- Elevated `network_latency` and long-tail p95 durations
- Error spikes from third-party endpoints
- Strong correlation between flaky outcomes and transient 5xx/timeout responses

### Mitigations
- Use resilient test doubles for unstable external services
- Add deterministic retry with bounded backoff where appropriate
- Record and assert on dependency health in CI

## 4) Microservice Startup and Environment Drift

### Typical Symptoms
- First-run failures after deployment or cold start
- Failures tied to environment readiness
- Inconsistent behavior across runner types

### Observable Signals
- Failures concentrated in early pipeline stage
- Readiness check violations before tests start
- Divergent pass rates across environments/browsers

### Mitigations
- Add explicit readiness gates before test execution
- Version-pin test dependencies and test containers
- Standardize CI runtime configuration and startup ordering

## 5) Brittle Test Design

### Typical Symptoms
- Selector fragility and snapshot brittleness
- Assertions coupled to non-functional details
- High maintenance cost for minor UI/backend changes

### Observable Signals
- Frequent failures on harmless refactors
- Elevated false-failure share for specific test modules
- High flake rate without matching production incidents

### Mitigations
- Prefer semantic selectors and stable contract assertions
- Reduce over-specified snapshots
- Separate behavior assertions from presentation details

## Prioritization Matrix (Practical)

Use a two-axis approach to triage remediation:

- Impact: CI disruption cost (reruns, queue delays, blocked merges)
- Frequency: observed flaky occurrence rate

Prioritize causes with high impact + high frequency first, then validate improvements with before/after stability metrics.
