import bluetooth
from micropython import const
from logger import log_message
from calibration import save_calibration, calibration_probe1, calibration_probe2, calibration_file

_IRQ_CENTRAL_CONNECT = const(1)
_IRQ_CENTRAL_DISCONNECT = const(2)
_IRQ_GATTS_WRITE = const(3)

SERVICE_UUID = bluetooth.UUID("12345678-1234-5678-1234-56789abcdef0")
TEMP1_UUID = bluetooth.UUID("12345678-1234-5678-1234-56789abcdef1")
TEMP2_UUID = bluetooth.UUID("12345678-1234-5678-1234-56789abcdef2")
CALIB1_UUID = bluetooth.UUID("12345678-1234-5678-1234-56789abcdef3")
CALIB2_UUID = bluetooth.UUID("12345678-1234-5678-1234-56789abcdef4")

SERVICE = (
    SERVICE_UUID,
    (
        (TEMP1_UUID, bluetooth.FLAG_READ | bluetooth.FLAG_NOTIFY),
        (TEMP2_UUID, bluetooth.FLAG_READ | bluetooth.FLAG_NOTIFY),
        (CALIB1_UUID, bluetooth.FLAG_READ | bluetooth.FLAG_WRITE),
        (CALIB2_UUID, bluetooth.FLAG_READ | bluetooth.FLAG_WRITE),
    ),
)

class BLETemperature:
    def __init__(self, ble):
        self._ble = ble
        self._ble.active(True)
        self._ble.irq(self._irq)
        ((self._handle_temp1, self._handle_temp2,
          self._handle_calib1, self._handle_calib2),) = self._ble.gatts_register_services((SERVICE,))
        self._connections = set()
        self._advertise()

    def _irq(self, event, data):
        if event == _IRQ_CENTRAL_CONNECT:
            conn_handle, _, _ = data
            log_message(f"Connected: {conn_handle}")
            self._connections.add(conn_handle)
        elif event == _IRQ_CENTRAL_DISCONNECT:
            conn_handle, _, _ = data
            log_message(f"Disconnected: {conn_handle}")
            self._connections.remove(conn_handle)
            self._advertise()
        elif event == _IRQ_GATTS_WRITE:
            conn_handle, attr_handle = data
            if attr_handle == self._handle_calib1:
                self._write_calibration(1, self._ble.gatts_read(attr_handle))
            elif attr_handle == self._handle_calib2:
                self._write_calibration(2, self._ble.gatts_read(attr_handle))

    def _advertise(self):
        name = "PicoTemperature"
        adv_data = (
            b"\x02\x01\x06"  # Flags
            b"\x03\x03\x78\x12"  # Complete List of 16-bit Service UUIDs
            + bytes((len(name) + 1, 0x09))  # Complete Local Name
            + name.encode()
        )
        self._ble.gap_advertise(100, adv_data)

    def set_temperature(self, probe, value):
        if probe == 1:
            self._ble.gatts_write(self._handle_temp1, str(value).encode())
            for conn_handle in self._connections:
                self._ble.gatts_notify(conn_handle, self._handle_temp1)
        elif probe == 2:
            self._ble.gatts_write(self._handle_temp2, str(value).encode())
            for conn_handle in self._connections:
                self._ble.gatts_notify(conn_handle, self._handle_temp2)

    def _write_calibration(self, probe, data):
        try:
            if probe == 1:
                calibration_probe1.update(json.loads(data))
            elif probe == 2:
                calibration_probe2.update(json.loads(data))
            save_calibration(calibration_file, {
                "probe1": calibration_probe1,
                "probe2": calibration_probe2,
            })
            log_message(f"Updated calibration for Probe {probe}")
        except Exception as e:
            log_message(f"Error updating calibration for Probe {probe}: {e}")
