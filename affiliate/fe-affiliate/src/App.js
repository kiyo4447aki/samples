import { Route, Routes, BrowserRouter } from "react-router-dom"
import LoginPage from "./routes/loginPage/LoginPage"
import SignedUpPage from "./routes/signedUpPage/SignedUpPage"
import SignUpPage from "./routes/signUpPage/SignUpPage"
import { AuthProvider } from "./utils/auth/auth"
import NotificationProvider from "./notification/Notification"
import EnterpriseTop from "./routes/enterpriseTop/EnterpriseTop"

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<Routes>
					<Route path="/" element={<EnterpriseTop />} />
					<Route path="login">
						<Route path="enterprise" element={<LoginPage />} />
					</Route>
					<Route path="signup">
						<Route path="enterprise" element={<SignUpPage />} />
						<Route path="enterprise/done" element={<SignedUpPage />} />
					</Route>

					<Route path="enterprise">
						<Route path="top" element={<EnterpriseTop />}></Route>
					</Route>
				</Routes>
			</AuthProvider>
			<NotificationProvider />
		</BrowserRouter>
	)
}

export default App
