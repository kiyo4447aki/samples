import { useEffect } from "react"
import { useAuth } from "./auth"
import { useNavigate } from "react-router-dom"

const CheckLogin = ({ children }) => {
	const { getAuthinfo } = useAuth()
	const navigate = useNavigate()
	useEffect(() => {
		const info = getAuthinfo()
		if (info.isLoggedIn && info.token) {
			return children
		} else {
			navigate("/")
		}
	}, [])
	return <div>CheckLogin</div>
}

export default CheckLogin
