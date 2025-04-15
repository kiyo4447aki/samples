import axios from "axios"

const getToken = async (url, user, password) => {
	const formData = new FormData()
	formData.append("grant_type", "password")
	formData.append("username", user)
	formData.append("password", password)

	const res = await axios.post(url, formData)
	return res.data.access_token
}

export default getToken
