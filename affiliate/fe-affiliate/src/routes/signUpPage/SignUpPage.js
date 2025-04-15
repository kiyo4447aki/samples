import React from "react"
import * as Styled from "./styles"
import {
	FieldName,
	LoginForm,
	Input,
	ShowPasswordWrapper,
	ShowPasswordText,
	ShowPasswordButton,
	Button,
	LabelWrapper,
	ValidateErrorMessage,
} from "../../components/loginForm/FormItems"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { create_user } from "../../utils/auth/create_user"
import { CREATE_USER_URL } from "../../utils/api/urls"

const SignUpPage = () => {
	const [showPassword, setShowPassword] = useState(false)

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
		create_user(CREATE_USER_URL.ENTERPRISE, data.mail, data.password)
		navigate("/signup/enterprise/done", {
			state: { mail: data.mail, password: data.password },
		})
	}

	return (
		<>
			<Header />
			<Styled.Wrapper>
				<Styled.Title>新規会員登録</Styled.Title>
				<Styled.ContentWrapper>
					<LoginForm onSubmit={handleSubmit(onSubmit)}>
						<LabelWrapper>
							<FieldName>メールアドレス</FieldName>
							{errors.mail?.message && (
								<ValidateErrorMessage>{errors.mail.message}</ValidateErrorMessage>
							)}
						</LabelWrapper>
						<Input
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
						<LabelWrapper>
							<FieldName>パスワード</FieldName>
							{errors.password?.message && (
								<ValidateErrorMessage>
									{errors.password.message}
								</ValidateErrorMessage>
							)}
						</LabelWrapper>
						<Input
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
						<ShowPasswordWrapper>
							<ShowPasswordButton
								type="checkbox"
								checked={showPassword}
								onClick={() => {
									setShowPassword((prevState) => !prevState)
								}}
								id="showPasswordButton"
							></ShowPasswordButton>
							<ShowPasswordText for="showPasswordButton">
								パスワードを表示する
							</ShowPasswordText>
						</ShowPasswordWrapper>
						<Button>会員登録</Button>
					</LoginForm>
				</Styled.ContentWrapper>
			</Styled.Wrapper>
			<Footer />
		</>
	)
}

export default SignUpPage
