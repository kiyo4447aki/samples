import axios from "axios"

const getSignalingKey = async (camera_id: string, password: string, client_id: string) => {
	const url = "https://backend.skypics.jp:9000/auth/get_signaling_key"

	const reqest_body = { camera_id, password, client_id }
	const response = await axios.post(url, reqest_body)
	return response.data.signaling_key
}

export default getSignalingKey
