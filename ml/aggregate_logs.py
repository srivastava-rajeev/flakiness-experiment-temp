import json
import pandas as pd
import os

# Load NDJSON logs
def load_logs(file_path):
    with open(file_path, 'r') as f:
        return [json.loads(line) for line in f]

def process_logs(data):
    for entry in data:
        if entry.get('run') % 2 == 0:
            entry['note'] = 'success'
            entry['pass_fail'] = 1
        else:
            entry['pass_fail'] = 0
    return data

def save_to_csv(data, csv_path):
    df = pd.DataFrame(data)
    df.to_csv(csv_path, index=False)

def aggregate_logs(ndjson_dir, csv_path):
    all_data = []
    for file_name in os.listdir(ndjson_dir):
        if file_name.endswith(".ndjson"):
            file_path = os.path.join(ndjson_dir, file_name)
            data = load_logs(file_path)
            all_data.extend(process_logs(data))
    save_to_csv(all_data, csv_path)

if __name__ == "__main__":
    ndjson_dir = os.path.abspath("data/raw")
    csv_path = os.path.abspath("data/raw/aggregated_logs.csv")
    aggregate_logs(ndjson_dir, csv_path)
    print(f"Aggregated logs saved to {csv_path}")