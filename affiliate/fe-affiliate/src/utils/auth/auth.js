import { createContext, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie"
const AuthContext = createContext()

//AuthContextのprovider
export const AuthProvider = ({ children }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [cookies, setCookie, removeCookie] = useCookies(["authToken", "user"])

	useEffect(() => {
		const info = getAuthInfo()
		if (info.authToken) {
			setIsLoggedIn(true)
		} else {
			setIsLoggedIn(false)
		}
	}, [])

	const getAuthInfo = () => {
		const info = { ...cookies, isLoggedIn: isLoggedIn }
		return info
	}

	const deleteAuthInfo = () => {
		removeCookie("authToken")
		setIsLoggedIn(false)
	}

	const setAuthInfo = (token, user) => {
		setCookie("authToken", token)
		setCookie("user", user)
		setIsLoggedIn(true)
	}

	return (
		<AuthContext.Provider value={{ getAuthInfo, deleteAuthInfo, setAuthInfo }}>
			{children}
		</AuthContext.Provider>
	)
}

//認証用カスタムフック
export const useAuth = () => {
	return useContext(AuthContext)
}
