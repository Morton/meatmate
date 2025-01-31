from picozero import pico_led, LED
#from machine import Pin
import time

status_led = LED(16)

def set_led_status(status):
    if status == "on":
        pico_led.on()
        status_led.on()
    elif status == "error":
        pico_led.off()
        status_led.off()
