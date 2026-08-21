import pytest
import numpy as np
from backend.ml.forecasting import DemandForecaster

def test_forecaster_initialization():
    forecaster = DemandForecaster(alpha=0.3, beta=0.1, gamma=0.2)
    weights = forecaster.get_weights()
    assert len(weights) == 3
    assert weights[0] == 0.3
    assert weights[1] == 0.1

def test_forecaster_weight_import_export():
    forecaster = DemandForecaster()
    new_weights = np.array([0.45, 0.15, 0.25])
    forecaster.set_weights(new_weights)
    updated = forecaster.get_weights()
    assert updated[0] == 0.45
    assert updated[1] == 0.15

def test_forecaster_fit_predict_confidence_bands():
    history = [35, 38, 42, 45, 50, 55, 60, 68, 75, 82, 90, 98, 105]
    forecaster = DemandForecaster()
    res = forecaster.fit_predict(history, horizon_days=14)

    assert "predictions" in res
    assert "ci_upper" in res
    assert "ci_lower" in res
    assert len(res["predictions"]) == 14
    assert len(res["ci_upper"]) == 14
    assert len(res["ci_lower"]) == 14

    # Verify 95% confidence band ordering
    for p, u, l in zip(res["predictions"], res["ci_upper"], res["ci_lower"]):
        assert u >= p
        assert l <= p

def test_forecaster_metrics_evaluation():
    actual = [40, 50, 60, 70, 80]
    predicted = [42, 48, 63, 67, 82]
    forecaster = DemandForecaster()
    eval_res = forecaster.evaluate(actual, predicted)

    assert "mae" in eval_res
    assert "rmse" in eval_res
    assert "mape_pct" in eval_res
    assert eval_res["mae"] > 0
    assert eval_res["rmse"] >= eval_res["mae"]
