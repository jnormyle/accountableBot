#accountableBot email sender
#Stolen from https://stackoverflow.com/questions/6270782/how-to-send-an-email-with-python

import textwrap
import smtplib

def sendMail(FROM, TO, SUBJECT, TEXT, SERVER, USERNAME=None, PASSWORD=None, USE_TLS=True):
    """
    Sends an email using an SMTP server.

    Parameters:
    - FROM: Sender's email address
    - TO: List of recipient(s) email addresses
    - SUBJECT: Subject of the email
    - TEXT: Body of the email
    - SERVER: SMTP server address (e.g., 'smtp.gmail.com')
    - USERNAME: Email username for authentication (if required)
    - PASSWORD: Password for the email account (if required)
    - USE_TLS: Whether to use TLS encryption (default is True)
    """
    
    # Format the message
    message = textwrap.dedent(f"""\
        From: {FROM}
        To: {", ".join(TO)}
        Subject: {SUBJECT}

        {TEXT}
    """)

    try:
        # Establish SMTP connection
        print(f"Connecting to SMTP server {SERVER}...")
        server = smtplib.SMTP(SERVER, 587) #set to gmail port 587 as ChatGPT told me
        
        # If using TLS, start TLS encryption
        if USE_TLS:
            print("Starting TLS encryption...")
            server.starttls()  # Secure the connection with TLS

        # Log in if a username and password are provided (for authentication)
        if USERNAME and PASSWORD:
            print("Logging in...")
            server.login(USERNAME, PASSWORD)

        # Send the email
        # The message will soon contain the requirements listed in my Google Doc 
        print("Sending email...")
        server.sendmail(FROM, TO, message)
        print("Email sent successfully!")

    except smtplib.SMTPAuthenticationError as e:
        print(f"Authentication failed: {e}")
    except smtplib.SMTPException as e:
        print(f"SMTP error occurred: {e}")
    except Exception as e:
        print(f"Failed to send email: {e}")
    
    finally:
        # Close the connection
        print("Closing the SMTP connection...")
        server.quit()

# Example usage:
FROM = 'normylejacob7@gmail.com'        # Your email address
TO = ['normylejacob7@gmail.com']       # List of recipients
SUBJECT = 'Test Email'
TEXT = 'Soon to add requirements of accountability bot.'
SERVER = 'smtp.gmail.com'            # For example, using Gmail's SMTP server
USERNAME = 'normylejacob7@gmail.com'    # Your Gmail username
PASSWORD = 'gbtg nzgq jjsp fetm'       # Your Gmail app password (if 2FA is enabled)
sendMail(FROM, TO, SUBJECT, TEXT, SERVER, USERNAME, PASSWORD)
