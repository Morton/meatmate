import json
from logger import log_message

calibration_file = "calibration.json"

# Default calibration data
calibration_probe1 = {"offset": 0.0, "scale": 1.0}
calibration_probe2 = {"offset": 0.0, "scale": 1.0}

def load_calibration(file_path=calibration_file):
    """
    Load calibration data from a JSON file.
    """
    global calibration_probe1, calibration_probe2
    try:
        with open(file_path, "r") as file:
            data = json.load(file)
            calibration_probe1 = data.get("probe1", calibration_probe1)
            calibration_probe2 = data.get("probe2", calibration_probe2)
            log_message("Calibration data loaded successfully.")
    except Exception as e:
        log_message(f"Error loading calibration data: {e}")
        # Keep default calibration if loading fails

def save_calibration(file_path=calibration_file, data=None):
    """
    Save calibration data to a JSON file.
    """
    global calibration_probe1, calibration_probe2
    try:
        if data is None:
            data = {"probe1": calibration_probe1, "probe2": calibration_probe2}
        with open(file_path, "w") as file:
            json.dump(data, file)
            log_message("Calibration data saved successfully.")
    except Exception as e:
        log_message(f"Error saving calibration data: {e}")

# Load calibration data on import
load_calibration()
