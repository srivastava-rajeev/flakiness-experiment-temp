import os
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import classification_report, roc_auc_score

# Load data
def load_data(csv_path):
    return pd.read_csv(csv_path)

def preprocess_data(data):
    X = data.drop(columns=['pass_fail', 'note'])
    y = data['pass_fail']
    return X, y

def train_model(X_train, y_train, model):
    model.fit(X_train, y_train)
    return model

def evaluate_model(model, X_test, y_test):
    preds = model.predict(X_test)
    print(classification_report(y_test, preds))
    if hasattr(model, 'predict_proba'):
        print("ROC-AUC:", roc_auc_score(y_test, model.predict_proba(X_test)[:, 1]))

# Train and evaluate models
def train_and_evaluate(csv_path):
    data = load_data(csv_path)
    X, y = preprocess_data(data)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)

    print("Logistic Regression Report:")
    lr = train_model(X_train, y_train, LogisticRegression())
    evaluate_model(lr, X_test, y_test)

    print("Random Forest Report:")
    rf = train_model(X_train, y_train, RandomForestClassifier())
    evaluate_model(rf, X_test, y_test)

if __name__ == "__main__":
    csv_path = os.path.abspath("data/raw/aggregated_logs.csv")
    train_and_evaluate(csv_path)
