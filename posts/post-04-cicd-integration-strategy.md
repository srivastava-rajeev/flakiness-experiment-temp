# Post #4: Integrating Flaky Test Prediction into CI Pipelines

## Where Prediction Runs
- Post-test scoring from latest execution logs (recommended first)
- Optional pre-test risk scoring for selective retries

## Probability Thresholding
Use a configurable threshold `p_flaky >= t` to decide mitigation actions.

## Risk-Based Gating
- High risk: retry/quarantine with alerts
- Medium risk: allow run but flag
- Low risk: normal policy

## Do Not Block Pipelines by Default
Start with soft actions and observability before hard blocking.

## Simulation Artifacts in This Repo

- `ci_integration/policy_simulator.py`
- `ci_integration/threshold_scenarios.csv`

Current baseline simulation (Logistic Regression):

- `t=0.30`: precision `0.6537`, recall `0.9282`, estimated policy cost `980.03`
- `t=0.50`: precision `0.6864`, recall `0.6409`, estimated policy cost `1391.83`
- `t=0.70`: precision `0.8393`, recall `0.2597`, estimated policy cost `1953.38`

This shows that in a high false-negative-cost CI context, lower thresholds can reduce total disruption cost.

## Reproducible Command
```bash
python3 ci_integration/policy_simulator.py \
  --metrics models/results/baseline_metrics.json \
  --model logistic_regression \
  --output ci_integration/threshold_scenarios.csv
```
