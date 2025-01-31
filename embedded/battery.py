from machine import ADC, Pin
import time

# Set up ADC pin (using GP26/ADC0)
adc = ADC(26)

# Voltage divider ratio (R1 = 100kΩ, R2 = 100kΩ)
divider_ratio = (100 + 100) / 100  # 2x scaling factor

# Pico's ADC reference voltage
ADC_REF_VOLTAGE = 3.3

def read_battery_voltage():
    raw_value = adc.read_u16()  # Read 16-bit ADC value (0-65535)
    voltage = (raw_value / 65535) * ADC_REF_VOLTAGE  # Convert to voltage
    battery_voltage = voltage * divider_ratio  # Scale back to battery voltage
    return battery_voltage

def battery_percentage(voltage, min_v=2.0, max_v=2.4):
    return max(0, min(100, ((voltage - min_v) / (max_v - min_v)) * 100))
