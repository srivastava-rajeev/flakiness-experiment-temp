# Detecting Flaky Tests Using Machine Learning in CI/CD Pipelines
```bash
✅ Problem Statement
Explain:
What are flaky tests?
Why are they harmful in CI/CD?
Cost impact
```
```bash
✅ Objectives
Detect flaky tests
Engineer features from historical runs
Train ML models
Evaluate performance
```
```bash
✅ Methodology
Dataset description
Feature extraction approach
ML algorithms used
Evaluation metrics
```
```bash
✅ Tech Stack
Python
Playwright / Selenium
GitHub Actions
Pandas
Scikit-learn
XGBoost (if used)
```
```bash
✅ How to Run
Installation steps
   pip install -r requirements.txt
   python train_model.py
   ```
```bash
✅ Results Section
Include:
Accuracy
Precision/Recall
Confusion matrix
Any charts
```
```bash
✅ Future Work
Real-time CI integration
Reinforcement learning
Flakiness root-cause clustering
```

# Flakiness Experiment

This project is a research framework for studying test flakiness in CI/CD pipelines. It includes a System Under Test (SUT), a Playwright test suite, an execution orchestrator, and an ML pipeline for flakiness prediction.

## Project Structure

```
flakiness-experiment/
├── config/                 # Configuration files
│   └── experiment.config.json
├── data/                   # Data storage
│   └── raw/                # Raw execution logs
├── harness/                # Execution orchestrator
│   └── orchestrator.js
├── ml/                     # Machine learning pipeline
│   ├── requirements.txt
│   └── train.py
├── sut/                    # System Under Test (SUT)
│   ├── server.js
│   ├── config/             # SUT configuration
│   ├── lib/                # SUT libraries
│   └── public/             # Frontend files
│       ├── app.js
│       └── index.html
├── tests/                  # Test suite
│   └── playwright/         # Playwright tests
│       ├── playwright.config.js
│       └── tests/          # Test cases
│           ├── flaky.spec.js
│           └── stable.spec.js
└── package.json            # Project dependencies and scripts
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

3. Start the SUT:
   ```bash
   npm start
   ```

4. Run Playwright tests:
   ```bash
   npm run test:playwright
   ```

5. Run the orchestrator:
   ```bash
   npm run orchestrator
   ```

## Execution

1. **Start the SUT**:
   ```bash
   node sut/server.js
   ```

2. **Run Playwright Tests**:
   ```bash
   npx playwright test
   ```

3. **Execute the Orchestrator**:
   ```bash
   node harness/orchestrator.js
   ```

4. **Aggregate Logs**:
   ```bash
   python3 ml/aggregate_logs.py
   ```

5. **Train ML Models**:
   ```bash
   python3 ml/train.py
   ```

## Layers

1. **System Under Test (SUT)**: A Node.js + Express web application with controlled flakiness injection.
2. **Playwright Test Suite**: Stable and flaky tests for ground truth generation.
3. **Execution Harness**: Automates test execution and logs results.
4. **Labeling Strategy**: Defines flakiness based on pass rate across runs.
5. **Feature Engineering**: Extracts features from execution logs for ML modeling.
6. **ML Modeling**: Predicts test flakiness using machine learning models.
7. **CI Policy Simulation**: Evaluates the impact of flakiness prediction on CI pipelines.

## Results

- The `aggregated_logs.csv` file is generated in `data/raw/`.
- ML model training results are displayed in the terminal, including classification reports and ROC-AUC scores.

## Reproducibility

- Configuration files for flakiness injection.
- Seeded randomness for reproducibility.
- Detailed documentation for setup and usage.

To recreate the environment:
```bash
pip install -r requirements.txt
```

## License

MIT License
