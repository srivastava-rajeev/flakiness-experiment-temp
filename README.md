# Machine Learning–Driven Flaky Test Detection in CI/CD Pipelines

A reproducible experimental framework that applies supervised machine learning to detect and predict flaky tests in CI/CD environments.

![License](https://img.shields.io/github/license/srivastava-rajeev/flakiness-experiment-temp)

![Last Commit](https://img.shields.io/github/last-commit/srivastava-rajeev/flakiness-experiment-temp)

![Repo Size](https://img.shields.io/github/repo-size/srivastava-rajeev/flakiness-experiment-temp)

![CI](https://github.com/srivastava-rajeev/flakiness-experiment-temp/actions/workflows/python-ci.yml/badge.svg)

---

## Overview

Flaky tests introduce instability in CI/CD pipelines, causing false failures, increased triage effort, delayed releases, and reduced confidence in automation systems. Traditional retry mechanisms often mask symptoms rather than addressing root causes.

This project demonstrates how supervised machine learning can proactively detect flaky behavior using historical execution data, enabling more reliable and intelligent CI pipelines.

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

## Project Structure

```
flakiness-experiment/
├── config/
├── data/
│   └── raw/
├── harness/
├── ml/
│   ├── aggregate_logs.py
│   ├── train.py
├── sut/
├── tests/
│   └── playwright/
├── package.json
├── requirements.txt
└── run_experiment.py
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
git clone https://github.com/srivastava-rajeev/flakiness-experiment-temp.git
cd flakiness-experiment-temp
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

### 4. Run Full Experiment

```bash
python run_experiment.py
```

This will:

- Start the SUT  
- Execute Playwright tests multiple times  
- Aggregate logs  
- Train ML models  
- Output evaluation metrics  

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