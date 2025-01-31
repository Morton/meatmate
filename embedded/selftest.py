from picozero import pico_led, LED
from time import sleep
from machine import ADC, WDT, Pin
from temperature import read_temperature, calibrate_temperature, moving_average
from battery import read_battery_voltage, battery_percentage
import network

def countdown(prefix, n):
    for x in range(n):
        print(prefix + str(n - x) + "s")
        sleep(1)
    return



print("   _____                 __     _____          __          ")
print("  /     \   ____ _____ _/  |_  /     \ _____ _/  |_  ____  ")
print(" /  \ /  \_/ __ \\__  \\   __\/  \ /  \\__  \\   __\/ __ \ ")
print("/    Y    \  ___/ / __ \|  | /    Y    \/ __ \|  | \  ___/ ")
print("\____|__  /\___  >______/__| \____|__  (____  /__|  \___  >")
print("        \/     \/ Hardware Self-Test \/     \/          \/ ")
print("")

print("[LED] Testing LED")
status_led = LED(16)
print("[LED]   LED should be on")
status_led.on()
countdown("[LED]     ", 3)
print("[LED]   LED should be off")
status_led.off()
countdown("[LED]     ", 3)
print()

print("[BAT] Testing Battery voltage")
battery_level = read_battery_voltage()
print(f"[BAT]   battery voltage: {battery_level:.2f}V")
percentage = battery_percentage(battery_level)
print(f"[BAT]   battery level: {percentage:.1f}%")
print()

print("[TEMP1] Testing Temperature Probe 1")
adc_probe1 = ADC(27)
adc_value_probe1 = adc_probe1.read_u16()
print("[TEMP1]   raw value: " + str(adc_value_probe1))
raw_temperature1 = read_temperature(adc_value_probe1)
print("[TEMP1]   raw temperature: " + str(raw_temperature1))
print()

print("[TEMP2] Testing Temperature Probe 2")
adc_probe2 = ADC(28)
adc_value_probe2 = adc_probe2.read_u16()
print("[TEMP2]   raw value: " + str(adc_value_probe2))
raw_temperature2 = read_temperature(adc_value_probe2)
print("[TEMP2]   raw temperature: " + str(raw_temperature2))
print()

