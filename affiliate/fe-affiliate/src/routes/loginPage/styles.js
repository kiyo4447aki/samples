import styled from "styled-components"
import * as FormItems from "../../components/loginForm/FormItems"

export const Wrapper = styled.div`
	width: 100%;
	background-color: #fff;
	margin: 0;
	padding: 40px 0 110px 0;
	box-sizing: border-box;
`

export const TitleWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 55px;
	align-items: flex-end;
	gap: 1.4vw;
	margin: 0 auto 5px auto;
	max-width: 1000px;
`

export const MainTitle = styled.h1`
	height: 54px;
	color: #000;
	text-align: center;
	font-family: Roboto;
	font-size: 40px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin: 0;
`

export const SubTitle = styled.p`
	height: 35px;
	color: #000;
	text-align: center;
	vertical-align: bottom;
	font-family: "Noto Sans JP";
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: 35px;
	margin: 0;
`

export const ContentWrapper = styled.div`
	min-height: 500px;
	max-width: 1000px;
	display: flex;
	padding: 60px 68px 60px 68px;
	margin: 0 auto;
	justify-content: space-between;
	border: 0px solid #000;
	background: #faf8f5;
	box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
	box-sizing: border-box;
	gap: min(16.5%, 50px);
`

export const ResetPasswordText = styled.p`
	width: 27.7vw;
	height: 54px;
	color: #000;
	text-align: center;
	font-family: "Noto Sans JP";
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 54px;
	margin: 0;
	align-self: center;
`

export const ResetPasswordLink = styled.a`
	text-decoration: none;
`

export const SingUpWrapper = styled.div`
	max-width: 350px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	flex: 1;
`

export const SingUpTitle = styled.h2`
	margin: 0;
	height: 40px;
	color: #000;
	text-align: center;
	font-family: "Noto Sans JP";
	font-size: 24px;
	font-style: normal;
	font-weight: 700;
	line-height: 40px;
	display: flex;
	align-self: center;
`

export const SingUpText = styled.p`
	margin: 20 0 10 0;
	margin: 0;
	height: 40px;
	color: #000;
	text-align: center;
	font-family: "Noto Sans JP";
	font-size: 16px;
	font-style: normal;
	font-weight: 500;
	line-height: 40px;
	display: flex;
	align-self: center;
`
export const LabelWrapper = styled.div`
	display: flex;
`

export const ValidateErrorMessage = styled.p`
	color: #c30;
	text-align: center;
	font-family: "Noto Sans JP";
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
`

export const LoginForm = styled(FormItems.LoginForm)`
	max-width: 350px;
`

export const Input = styled(FormItems.Input)`
	width: 100%;
`
export const Button = styled(FormItems.Button)`
	max-width: 350px;
	height: 60px;
`
export const FormItemWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`
