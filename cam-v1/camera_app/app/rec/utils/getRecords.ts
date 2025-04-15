import axios from "axios"

const getRecords = async (camera_id: string, password: string, client_id: string) => {
	const url = `https://${camera_id}.backend.skypics.jp:5000/records`
	const reqest_body = { user: camera_id, password, client_id }
	const response = await axios.post(url, reqest_body)
	return response.data
}

export default getRecords
