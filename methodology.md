# Methodology

## 1. Introduction
This study aims to predict test flakiness in CI/CD pipelines using a controlled experimental framework. By designing a reproducible and tunable environment, we address the challenges of flakiness in software testing, which can lead to increased costs and reduced developer productivity.

## 2. Experimental Framework
The experimental framework is designed in six layers:

1. **System Under Test (SUT)**: A Node.js + Express web application with controlled flakiness injection points (timing, network, DOM, concurrency).
2. **Playwright Test Suite**: A set of stable and flaky tests to establish ground truth.
3. **Execution Harness**: Automates test execution, collects structured logs, and captures per-test metrics.
4. **Labeling Strategy**: Defines flakiness based on pass rate across repeated runs.
5. **Feature Engineering**: Extracts features from execution logs for ML modeling.
6. **ML Modeling**: Trains and evaluates models to predict test flakiness.

## 3. Dataset Construction
The dataset is constructed by running the Playwright test suite multiple times using the execution harness. Each run captures the following metrics:

- `test_name`: Identifier for the test.
- `run_id`: Unique identifier for the run.
- `duration_ms`: Execution time in milliseconds.
- `pass_fail`: Boolean indicating test outcome.
- `retry_count`: Number of retries before success.
- `browser`: Browser used for the test.
- `headless_mode`: Boolean indicating if the browser was headless.
- `timestamp`: Timestamp of the test run.
- Optional: `cpu_load`, `memory_usage`, `network_latency`.

The logs are stored in NDJSON format and aggregated into a CSV file for analysis.

## 4. Labeling Definition
A test is labeled as flaky if it has a pass rate between 0 and 1.0 across repeated runs without code changes. This operational definition is widely accepted in flakiness research.

## 5. Feature Engineering & Modeling
From the aggregated logs, the following features are computed:

- Failure rate
- Pass rate
- Mean duration
- Duration variance
- Retry frequency
- Browser instability variance
- Network abort exposure
- Time-to-first-failure

These features are used to train machine learning models, including Logistic Regression and Random Forest. The models are evaluated using metrics such as accuracy, precision, recall, F1-score, and ROC-AUC.

## 6. CI Simulation Policy
We simulate two CI policies:

1. **Baseline CI**: All failures trigger a rerun of the entire job.
2. **ML Policy**: If a test is predicted to be flaky, it is retried up to three times. Otherwise, it fails immediately.

The impact of these policies is measured in terms of:

- Reduction in reruns
- Reduction in pipeline time
- False positive cost
- False negative cost

## 7. Results
The results demonstrate the effectiveness of the ML-based policy in reducing CI pipeline costs and improving reliability.

## 8. Threats to Validity
To ensure experimental validity:

- **Internal Validity**: Controlled injection parameters, fixed code version, no dataset leakage.
- **External Validity**: Testing on multiple browsers (Chromium, Firefox), headless vs. headed modes, and varying flakiness probabilities.
- **Reproducibility**: The framework includes configuration files, seeded randomness, and detailed documentation.

## 9. Conclusion
This study presents a novel experimental framework for predicting test flakiness in CI/CD pipelines. By combining controlled flakiness injection, automated execution, and machine learning, we provide a reproducible and defendable approach to addressing the challenges of test flakiness.