import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import * as Styled from "./styles"
import {
	FieldName,
	ShowPasswordButton,
	ShowPasswordText,
	ShowPasswordWrapper,
	LabelWrapper,
	ValidateErrorMessage,
} from "../../components/loginForm/FormItems"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import getToken from "../../utils/auth/getToken"
import { useAuth } from "../../utils/auth/auth"
import { TOKEN_URL } from "../../utils/api/urls"

const LoginPage = () => {
	const [showPassword, setShowPassword] = useState(false)
	const { setAuthinfo } = useAuth()

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm({
		defaultValues: {
			mail: "",
			password: "",
		},
		reValidateMode: "onSubmit",
	})

	const navigate = useNavigate()

	const onSubmit = (data) => {
		alert(`email: ${data.mail} \npassword: ${data.password}`)
		getToken(TOKEN_URL.ENTERPRISE, data.mail, data.password).then((token) => {
			//setAuthinfo(token, user)
			alert(token)
		})
	}

	return (
		<>
			<Header />
			<Styled.Wrapper>
				<Styled.TitleWrapper>
					<Styled.MainTitle>LOGIN</Styled.MainTitle>
					<Styled.SubTitle>ログイン</Styled.SubTitle>
				</Styled.TitleWrapper>
				<Styled.ContentWrapper>
					<Styled.LoginForm onSubmit={handleSubmit(onSubmit)}>
						<Styled.FormItemWrapper>
							<div>
								<LabelWrapper>
									<FieldName>メールアドレス</FieldName>
									{errors.mail?.message && (
										<ValidateErrorMessage>
											{errors.mail.message}
										</ValidateErrorMessage>
									)}
								</LabelWrapper>
								<Styled.Input
									type="text"
									placeholder="メールアドレスを入力してください"
									{...register("mail", {
										required: "※メールアドレスを入力してください",
										pattern: {
											value: /^[\w\-._]+@[\w\-._]+\.[A-Za-z]+$/,
											message: "※不正なメールアドレスの形式です",
										},
									})}
								/>
							</div>
							<div>
								<LabelWrapper>
									<FieldName>パスワード</FieldName>
									{errors.password?.message && (
										<ValidateErrorMessage>
											{errors.password.message}
										</ValidateErrorMessage>
									)}
								</LabelWrapper>
								<Styled.Input
									type={showPassword ? "text" : "password"}
									placeholder="パスワードを入力してください"
									{...register("password", {
										required: "※パスワードを入力してください",
										minLength: {
											value: 8,
											message: "※パスワードは8文字以上で入力してください",
										},
										maxLength: {
											value: 64,
											message: "※パスワードは64文字以内で入力してください",
										},
									})}
								/>
							</div>
						</Styled.FormItemWrapper>
						<ShowPasswordWrapper>
							<ShowPasswordButton
								type="checkbox"
								checked={showPassword}
								onClick={() => {
									setShowPassword((prevState) => !prevState)
								}}
								id="showPasswordButton"
							/>
							<ShowPasswordText for="showPasswordButton">
								パスワードを表示する
							</ShowPasswordText>
						</ShowPasswordWrapper>
						<Styled.Button>ログイン</Styled.Button>
						<Styled.ResetPasswordText>
							パスワードをお忘れの方は
							<Styled.ResetPasswordLink href="">こちら</Styled.ResetPasswordLink>
						</Styled.ResetPasswordText>
					</Styled.LoginForm>
					<Styled.SingUpWrapper>
						<Styled.SingUpTitle>新規会員登録</Styled.SingUpTitle>
						<Styled.SingUpText>※ご利用には会員登録が必要です</Styled.SingUpText>
						<Styled.Button
							onClick={() => {
								navigate("/signup/enterprise")
							}}
						>
							会員登録
						</Styled.Button>
					</Styled.SingUpWrapper>
				</Styled.ContentWrapper>
			</Styled.Wrapper>
			<Footer />
		</>
	)
}

export default LoginPage
