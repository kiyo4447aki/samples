import axios from "axios"

export const create_user = async (url, email, password) => {
	const data = { email: email, password: password }
	const res = await axios.post(url, data)
	return res
}
