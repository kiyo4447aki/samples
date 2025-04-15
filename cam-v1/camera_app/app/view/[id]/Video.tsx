import React, { useEffect, useRef, useState } from "react"
//import getUuid from "@/lib/uuid";
import { defaultOptions, connection } from "@open-ayame/ayame-web-sdk"
import Connection from "@open-ayame/ayame-web-sdk/dist/connection"
import { ConnectionOptions } from "@open-ayame/ayame-web-sdk/dist/connection/options"
import getSignalingKey from "../utils/getSignalingKey"
import { CameraDevice } from "@/types/camera"
import getUuid from "@/lib/uuid"

type Props = {
	cameraData: CameraDevice
}

const Video = ({ cameraData }: Props) => {
	const streamRef = useRef<HTMLVideoElement>(null!)
	const roomId: string = cameraData.id
	const signalingUrl: string = "wss://backend.skypics.jp:9000/signaling/"
	const options: ConnectionOptions = defaultOptions
	//options.clientId = getUuid();
	options.video.direction = "recvonly"
	options.audio.direction = "recvonly"
	const conn = useRef<Connection | null>(null)
	const [stream, setStream] = useState<MediaStream>(null!)
	const [signalingKey, setSignalingKey] = useState("")

	//uuid取得処理
	options.clientId = getUuid()

	useEffect(() => {
		if (streamRef.current.srcObject != stream) {
			streamRef.current.srcObject = stream
		}
	}, [stream])

	useEffect(() => {
		getSignalingKey(cameraData.id, cameraData.password, options.clientId).then((key) => {
			setSignalingKey(key)
		})
	}, [])

	useEffect(() => {
		if (signalingKey) {
			options.signalingKey = signalingKey
			conn.current = connection(signalingUrl, roomId, options)
			connect()
		}
		return () => {
			disconnect()
		}
	}, [signalingKey])

	async function connect() {
		if (conn.current) {
			await conn.current.connect(null)
			conn.current.on("open", () => console.log("signaling connection is established"))
			conn.current.on("disconnect", (e: string) => {
				console.log(e)
			})
			conn.current.on("addstream", (e: { stream: MediaStream; type: string }) => {
				setStream(e.stream)
			})
			conn.current.on("removestream", () => {
				setStream(null!)
			})
		}
	}

	//切断時に呼び出し
	function disconnect() {
		if (conn.current) {
			conn.current.disconnect()
			conn.current = null
		}
		setStream(null!)
	}

	return (
		<video
			className="w-full aspect-video"
			ref={streamRef}
			autoPlay
			playsInline
			controls
			controlsList="nodownload"
			muted
		></video>
	)
}

export default Video
