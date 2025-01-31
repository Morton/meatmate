import time

# Add a delay to allow REPL access before starting the main loop
print("Starting in 1 seconds. Press Ctrl+C to interrupt.")
time.sleep(1)
print("Starting...")

from machine import ADC, WDT
import bluetooth  # Import the Bluetooth module
from ble_manager import BLETemperature
from temperature import read_temperature, calibrate_temperature, moving_average
from logger import log_message
from led_status import set_led_status
from calibration import calibration_probe1, calibration_probe2

adc_probe1 = ADC(27)
adc_probe2 = ADC(28)
#wdt = WDT(timeout=8000)

buffer_size = 5
buffer_probe1 = []
buffer_probe2 = []

def main():
    ble = bluetooth.BLE()  # Initialize the BLE stack
    ble_temp = BLETemperature(ble)

    while True:
        try:
            adc_value_probe1 = adc_probe1.read_u16()
            adc_value_probe2 = adc_probe2.read_u16()

            raw_temperature1 = read_temperature(adc_value_probe1)
            raw_temperature2 = read_temperature(adc_value_probe2)

            calibrated_temperature1 = calibrate_temperature(raw_temperature1, calibration_probe1)
            calibrated_temperature2 = calibrate_temperature(raw_temperature2, calibration_probe2)

            smoothed_temperature1 = moving_average(calibrated_temperature1, buffer_probe1, buffer_size)
            smoothed_temperature2 = moving_average(calibrated_temperature2, buffer_probe2, buffer_size)

            ble_temp.set_temperature(1, smoothed_temperature1)
            ble_temp.set_temperature(2, smoothed_temperature2)

            log_message(f"Probe 1: {smoothed_temperature1:.2f} °C, Probe 2: {smoothed_temperature2:.2f} °C")
            set_led_status("on")

        except Exception as e:
            log_message(f"Error in main loop: {e}")
            set_led_status("error")

#        wdt.feed()
        time.sleep(1)

#if __name__ == "__main__":
#    
main()

