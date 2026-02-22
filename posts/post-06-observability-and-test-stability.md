# Post #6: Observability Signals That Reveal Test Instability

## Signals to Use
- Logs: error signatures and retry traces
- Metrics: failure rate and duration variance
- Traces: cross-service timing anomalies

## Stability Indicators
Combine outcome volatility with latency variance and retry behavior to rank unstable tests.

## Reliability Loop
Prediction -> mitigation -> root-cause fix -> metric validation.

## Repo Artifact (Hands-On)

- Notebook: `notebooks/observability_signals.ipynb`

The notebook computes an `instability_score` from:

- `fail_rate`
- `retry_rate`
- `duration_cv` (duration variability signal)
- normalized `network_latency_mean`

Then it ranks tests by instability to prioritize remediation.

## Practical Use in CI

1. Run signal extraction after each CI window.
2. Track top unstable tests weekly.
3. Feed top-ranked tests into root-cause triage and fix loops.
