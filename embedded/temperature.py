def read_temperature(adc_value):
    voltage = adc_value * (3.3 / 65535)
    try:
        resistance = 10000 / (3.3 / voltage - 1)
    except ZeroDivisionError:
        resistance = float('inf')
    try:
        temperature = 1 / (0.001129148 + (0.000234125 * (resistance / 1000)))
    except ValueError:
        temperature = float('nan')
    return temperature

def calibrate_temperature(raw_temperature, calibration):
    return (raw_temperature * calibration["scale"]) + calibration["offset"]

def moving_average(new_value, history, size=5):
    history.append(new_value)
    if len(history) > size:
        history.pop(0)
    return sum(history) / len(history)
