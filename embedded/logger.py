import time

log_file = "log.txt"

def log_message(message, log_to_console=True, log_to_file_enabled=True):
    """
    Logs a message to the console and/or a log file.
    
    Parameters:
    - message (str): The message to log.
    - log_to_console (bool): Whether to print the message to the console.
    - log_to_file_enabled (bool): Whether to write the message to the log file.
    """
    timestamped_message = f"{time.time()}: {message}"
    if log_to_console:
        print(timestamped_message)
    if log_to_file_enabled:
        try:
            with open(log_file, "a") as file:
                file.write(timestamped_message + "\n")
        except Exception as e:
            print(f"Error writing to log file: {e}")
