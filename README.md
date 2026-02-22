# Flaky Test Prediction Using Machine Learning in CI/CD

A reproducible experimental framework that applies supervised machine learning to detect and predict flaky tests in CI/CD environments.

![License](https://img.shields.io/github/license/srivastava-rajeev/flaky-test-prediction-ml)

![Last Commit](https://img.shields.io/github/last-commit/srivastava-rajeev/flaky-test-prediction-ml)

![Repo Size](https://img.shields.io/github/repo-size/srivastava-rajeev/flaky-test-prediction-ml)

![CI](https://github.com/srivastava-rajeev/flaky-test-prediction-ml/actions/workflows/python-ci.yml/badge.svg)

---
## About This Project

This repository contains an experimental research framework exploring machine learning approaches to predict flaky tests in CI/CD pipelines.

The goal is to proactively identify unstable tests using historical execution patterns, behavioral signals, and statistical modeling techniques.

## Overview

Flaky tests introduce instability in CI/CD pipelines, causing false failures, increased triage effort, delayed releases, and reduced confidence in automation systems. Traditional retry mechanisms often mask symptoms rather than addressing root causes.

This project demonstrates how supervised machine learning can proactively detect flaky behavior using historical execution data, enabling more reliable and intelligent CI pipelines.

## Project Structure

- data/                # Test execution logs & synthetic datasets
- feature_engineering/ # Feature extraction scripts
- models/              # ML training & evaluation
- ml/                  # Current ML training and aggregation scripts
- notebooks/           # Exploratory analysis
- posts/               # Draft markdown for research series posts

## Research Series Roadmap

This repository includes a 6-post research series with code-backed artifacts:

1. [Post #1: Problem and ML approach](posts/post-01-problem-and-approach.md)
2. [Post #2: Dataset and feature engineering](posts/post-02-dataset-feature-engineering.md)
3. [Post #3: Modeling and evaluation](posts/post-03-modeling-and-evaluation.md)
4. [Post #4: CI/CD integration strategy](posts/post-04-cicd-integration-strategy.md)
5. [Post #5: Root causes of flaky tests](posts/post-05-root-causes-of-flaky-tests.md)
6. [Post #6: Observability and test stability](posts/post-06-observability-and-test-stability.md)

Foundation artifact:

- [Minimal reproducible notebook](notebooks/flaky_test_prediction_baseline.ipynb): synthetic flaky/stable dataset generation, baseline Logistic Regression, printed metrics, and confusion matrix.

Post #2 implementation artifacts:

- `feature_engineering/generate_synthetic_logs.py` (run-level synthetic CI logs)
- `feature_engineering/build_features.py` (per-test feature generation + flaky labeling)
- `data/processed/synthetic_ci_runs.csv` (generated run-level dataset)
- `data/processed/sample_features.csv` (sample feature table for modeling)

Post #3 implementation artifacts:

- `models/train_baselines.py` (Logistic Regression vs Random Forest training)
- `models/evaluate.py` (threshold-oriented evaluation summary)
- `models/results/baseline_metrics.json` (ROC-AUC + precision/recall metrics at multiple thresholds)

Post #4 implementation artifacts:

- `ci_integration/policy_simulator.py` (risk-threshold CI policy simulation)
- `ci_integration/threshold_scenarios.csv` (threshold-by-threshold cost and confusion estimate)

---

## Key Contributions

- End-to-end experimental framework for flaky test research  
- Controlled flakiness injection within a System Under Test (SUT)  
- Automated execution harness for repeated test runs  
- Feature engineering from historical test outcomes  
- Supervised ML-based flaky test prediction  
- CI policy simulation to evaluate reliability impact  
- Fully reproducible pipeline with versioned dependencies  

---

## Architecture

The framework consists of the following layers:

### 1. System Under Test (SUT)
Node.js + Express application with controlled flakiness injection.

### 2. Playwright Test Suite
Stable and intentionally flaky tests to generate ground truth.

### 3. Execution Harness
Automates repeated test execution and collects logs.

### 4. Log Aggregation & Feature Engineering
Extracts statistical features from historical runs.

### 5. Machine Learning Pipeline
Trains classification models (Scikit-learn / XGBoost).

### 6. Evaluation & CI Simulation
Measures predictive performance and potential CI stability improvements.

---
## Experimental Pipeline Overview

The experimental workflow follows a structured end-to-end pipeline:

SUT → Playwright Tests → Execution Harness → Log Aggregation → Feature Engineering → ML Model → CI Simulation

### Pipeline Description

1. **System Under Test (SUT)**  
   A Node.js + Express application with controlled flakiness injection.

2. **Playwright Tests**  
   Stable and intentionally flaky test cases executed repeatedly.

3. **Execution Harness**  
   Automates multiple test executions and captures historical outcomes.

4. **Log Aggregation**  
   Consolidates execution results into structured datasets.

5. **Feature Engineering**  
   Extracts statistical signals such as failure rate, streak patterns, and variability.

6. **Machine Learning Model**  
   Trains supervised classifiers to predict flaky behavior.

7. **CI Simulation**  
   Evaluates how predictive detection improves CI pipeline stability.

### Architecture Diagram

![Experimental Pipeline Overview](docs/architecture.png)

---

## Project Structure

```text
flaky-test-prediction-ml/
├── config/
├── data/
│   └── raw/
├── docs/
├── feature_engineering/
├── harness/
├── ml/
│   ├── aggregate_logs.py
│   └── train.py
├── models/
├── notebooks/
├── posts/
├── sut/
├── tests/
│   └── playwright/
├── package.json
├── requirements.txt
└── README.md
```

---

## Technology Stack

- Python  
- Node.js / Express  
- Playwright  
- Pandas  
- Scikit-learn  
- XGBoost  
- GitHub Actions (CI)  

---

## Quick Start (Full Reproducible Run)

### 1. Clone Repository

```bash
git clone https://github.com/srivastava-rajeev/flaky-test-prediction-ml.git
cd flaky-test-prediction-ml
```

### 2. Setup Python Environment

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### 3. Install Node Dependencies

```bash
npm install
npx playwright install
```

### 4. Run Current Pipeline

```bash
node sut/server.js
npx playwright test
python3 ml/aggregate_logs.py
python3 ml/train.py
```

---

## Manual Execution (Step-by-Step)

Start SUT:

```bash
node sut/server.js
```

Run Playwright tests:

```bash
npx playwright test
```

Aggregate logs:

```bash
python3 ml/aggregate_logs.py
```

Train ML model:

```bash
python3 ml/train.py
```

---

## Example Model Performance (Sample Run)

- Accuracy: 0.87  
- Precision: 0.84  
- Recall: 0.81  
- ROC-AUC: 0.90  

*(Metrics may vary depending on dataset size and random seed.)*

---

## Output Artifacts

- `data/raw/aggregated_logs.csv`  
- Classification report (terminal output)  
- ROC-AUC score  
- Confusion matrix (if generated)  

---

## Reproducibility

- Controlled flakiness injection  
- Seeded randomness  
- Version-pinned dependencies  
- CI-based automated validation  

To recreate environment:

```bash
pip install -r requirements.txt
npm install
```

---

## Target Audience

- QA Architects exploring ML-based reliability strategies  
- DevOps engineers analyzing CI stability  
- Researchers studying flaky test behavior  
- Engineering teams building intelligent test pipelines  

---

## Future Enhancements

- Real-time CI pipeline integration  
- Root-cause clustering for flaky failures  
- Explainability analysis (feature importance / SHAP)  
- Reinforcement learning-based adaptive retry strategies  

---

## License

MIT License
