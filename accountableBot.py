#import crython
import schedule
import time
from datetime import datetime, timedelta

# Target time of day (e.g., 3:45 PM)
target_hour = 8
target_minute = 35
target_second = 0

# Time to stop the script (for efficiency)
target_hour_end = 8
target_minute_end = 36
target_second_end = 0

# Function to run at the target time each day
def schedule_task():
    """Scheduled task that checks if the time is right, and if so, sends the email"""
    current_time = datetime.now()

    # Check if the target time has passed for today
    target_time_today = current_time.replace(hour=target_hour, minute=target_minute, second=target_second, microsecond=0)

    # If the target time has passed today, adjust to the same time on the next day
    if current_time > target_time_today:
        target_time_today += timedelta(days=1)
    
    # Calculate the delay until the next scheduled time
    delay = (target_time_today - current_time).total_seconds()

    print(f"Next task scheduled for: {target_time_today}")

while True:
    current_time = datetime.now()

    # If the current time is past the stop time, exit the script
    if current_time.hour == target_hour_end and current_time.minute == target_minute_end and current_time.second == target_second_end:
        print(f"Exiting script after task completion at {current_time}")
        break
    
    # Sleep for a small amount of time (e.g., 1 second) to reduce CPU usage
    time.sleep(1)
