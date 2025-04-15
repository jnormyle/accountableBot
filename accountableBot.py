import smtplib
import schedule
import time
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Email settings
sender_email = "normylejacob7@gmail.com"
receiver_email = "normylejacob7@gmail.com"
password = "naqe xieb cihi swtz"  # This is an app password

def send_email():
    try:
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = receiver_email
        msg['Subject'] = 'Accountable Bot Testing'

        body = "https://jnormyle.github.io/accountableBot/"
        msg.attach(MIMEText(body, 'plain'))

        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, password)
            server.sendmail(sender_email, receiver_email, msg.as_string())
            print(f"[{datetime.now()}] ✅ Email sent to {receiver_email}")
    except Exception as e:
        print(f"[{datetime.now()}] ❌ Error sending email: {e}")

# Schedule task for 9:00 AM
schedule_time = "16:00"
schedule.every().day.at(schedule_time).do(send_email)

print(f"📆 Bot is running. Next email scheduled at {schedule_time} daily.")

# Main loop
try:
    while True:
        schedule.run_pending()
        time.sleep(1)
except KeyboardInterrupt:
    print("🛑 Bot stopped by user.")
