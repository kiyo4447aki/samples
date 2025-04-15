import { useState, useEffect } from "react"
import { getMessaging, getToken, onMessage } from "firebase/messaging"
import firebaseApp from "../firebase"

const messaging = getMessaging(firebaseApp)

const vapidKey =
	"BDRRBehbAv_5IJh0alW48Zop4KNIYf1BCAVlmLJPFYoLUszThIZLuUPAA_kzzc8NqCvadX2vns65q09DJz1XkLE"

/*
const requestForToken = () => {
	return getToken(messaging, { vapidKey: vapidKey })
		.then((currentToken) => {
			if (currentToken) {
				console.log("current token: ", currentToken)
				alert(`current token: ${currentToken}`)
			} else {
				console.log("cant get token")
			}
		})
		.catch((err) => {
			console.log("An error occured ehile getting token: in fcm", err)
		})
}
*/

export const getNotifyPermission = () => {
	navigator.serviceWorker
		.register(`${process.env.REACT_APP_BASE_URL}/firebase-messaging-sw.js`)
		.then((registration) => {
			console.log("Service Worker registered with scope:", registration.scope)
			Notification.requestPermission()
				.then(async (permission) => {
					if (permission === "granted") {
						alert("通知が許可されました")
						return await getToken(messaging, {
							vapidKey: vapidKey,
							serviceWorkerRegistration: registration,
						})
					} else {
						console.error("Unable to get permission to notify.")
					}
				})
				.then((token) => {
					if (token != null) {
						alert(`token: ${token}`)
						//tokenをDBに保存
					}
				})
				.catch((err) => {
					console.error("An error occurred while retrieving token.", err)
				})
		})
		.catch((err) => {
			console.error("Service Worker registration failed:", err)
		})
}

const onMessageListener = () => {
	return new Promise((resolve) => {
		onMessage(messaging, (payload) => {
			console.log("payload")
			resolve(payload)
		})
	})
}

const NotificationProvider = () => {
	const [notification, setNotification] = useState({ title: "", body: "" })
	useEffect(() => {
		if (notification?.title) {
			alert("title: " + notification?.title + "\nbody: " + notification?.body)
		}
	}, [notification])

	useEffect(() => {
		getNotifyPermission()
		//requestForToken()
	}, [])

	onMessageListener()
		.then((payload) => {
			setNotification({
				title: payload?.notification?.title,
				body: payload?.notification?.body,
			})
		})
		.catch((err) => {
			console.log("failed: ", err)
		})

	return <div />
}

export default NotificationProvider
