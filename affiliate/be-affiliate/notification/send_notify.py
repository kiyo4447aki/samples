import firebase_admin
from firebase_admin import credentials, messaging

cred = credentials.Certificate("./serviceAccountKey.json")

firebase_admin.initialize_app(cred)

registration_token = "dCiNXJRM3qIhSH8TYWRfTL:APA91bGglAWfWDBDnw_o8KSCwXJhNphehPic3bxiOsg6KHcrM6YB9eGx2Da_QK7P9CkfteC-NL2HlOI6MMTAbTw39cg4BJ9NqTQk4FX4vCu50wrYCjHMK3m0HbIsFA18kE8dZbcx0nJH"


def send_notification(token,title,body):
    message = messaging.Message(
        notification=messaging.Notification(
            title=title,
            body=body
        ),
        token=token
    )
    response = messaging.send(message)
    return response