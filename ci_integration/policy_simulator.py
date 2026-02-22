import argparse
import csv
import json
from pathlib import Path


# Simple CI cost model (minutes-equivalent per test decision)
COST_FALSE_POSITIVE = 1.2  # unnecessary mitigation (retry/quarantine/manual check)
COST_FALSE_NEGATIVE = 4.0  # flaky test slips and destabilizes pipeline
COST_TRUE_POSITIVE = 0.8   # correct mitigation overhead
COST_TRUE_NEGATIVE = 0.0   # no extra action


def load_metrics(path: Path) -> dict:
    return json.loads(path.read_text())


def confusion_parts(precision: float, recall: float, prevalence: float, total: int) -> tuple[float, float, float, float]:
    positives = prevalence * total
    negatives = (1.0 - prevalence) * total

    tp = recall * positives
    fn = positives - tp

    # precision = tp / (tp + fp) => fp = tp * (1-p)/p
    fp = tp * (1.0 - precision) / precision if precision > 0 else negatives
    fp = min(max(fp, 0.0), negatives)
    tn = negatives - fp
    return tp, fp, fn, tn


def compute_policy_cost(tp: float, fp: float, fn: float, tn: float) -> float:
    return (
        tp * COST_TRUE_POSITIVE
        + fp * COST_FALSE_POSITIVE
        + fn * COST_FALSE_NEGATIVE
        + tn * COST_TRUE_NEGATIVE
    )


def main() -> None:
    parser = argparse.ArgumentParser(description="Simulate CI policy cost from model threshold metrics.")
    parser.add_argument("--metrics", default="models/results/baseline_metrics.json")
    parser.add_argument("--output", default="ci_integration/threshold_scenarios.csv")
    parser.add_argument("--model", default="logistic_regression", choices=["logistic_regression", "random_forest"])
    parser.add_argument("--decisions", type=int, default=1000, help="Number of simulated test decisions.")
    args = parser.parse_args()

    metrics = load_metrics(Path(args.metrics))
    prevalence = float(metrics["dataset"]["positive_rate"])
    model_metrics = metrics["models"][args.model]

    rows = []
    baseline_cost = None
    for item in model_metrics["threshold_metrics"]:
        threshold = float(item["threshold"])
        precision = float(item["precision"])
        recall = float(item["recall"])

        tp, fp, fn, tn = confusion_parts(precision, recall, prevalence, args.decisions)
        policy_cost = compute_policy_cost(tp, fp, fn, tn)

        if baseline_cost is None:
            baseline_cost = policy_cost

        rows.append(
            {
                "model": args.model,
                "threshold": f"{threshold:.2f}",
                "accuracy": f"{item['accuracy']:.4f}",
                "precision": f"{precision:.4f}",
                "recall": f"{recall:.4f}",
                "tp": f"{tp:.2f}",
                "fp": f"{fp:.2f}",
                "fn": f"{fn:.2f}",
                "tn": f"{tn:.2f}",
                "estimated_policy_cost": f"{policy_cost:.2f}",
                "cost_delta_vs_t0_30": f"{(policy_cost - baseline_cost):.2f}",
            }
        )

    output_path = Path(args.output)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    with output_path.open("w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        writer.writeheader()
        writer.writerows(rows)

    print(f"Wrote threshold scenarios: {output_path}")
    for row in rows:
        print(
            f"t={row['threshold']} cost={row['estimated_policy_cost']} "
            f"delta={row['cost_delta_vs_t0_30']} prec={row['precision']} rec={row['recall']}"
        )


if __name__ == "__main__":
    main()
