import styled from "styled-components"

export const LoginForm = styled.form`
	max-width: 400px;
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	display: flex;
	flex: 1;
	flex-direction: column;
`

export const FieldName = styled.label`
	height: 40px;
	max-width: 172px;
	color: #000;
	font-family: "Noto Sans JP";
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
	margin: 15px 0 0 0;
	white-space: nowrap;
`

export const Input = styled.input`
	max-width: 400px;
	height: 50px;
	margin: 0;
	padding: 0;
	border: none;
	font-size: 100%;
	padding-left: 5px;
`

export const ShowPasswordWrapper = styled.div`
	margin-top: 10px;
	margin-bottom: 25px;
`

export const ShowPasswordButton = styled.input`
	background: rgba(217, 217, 217, 0);
	display: none;
	&:checked + label:after {
		opacity: 1;
	}
`

export const ShowPasswordText = styled.label`
	height: 23px;
	color: #000;
	text-align: center;
	font-family: "Noto Sans JP";
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	margin: 0;
	position: relative;
	padding-left: 1.2em;
	top: -8px;
	&::before {
		content: "";
		display: block;
		box-sizing: border-box;
		height: 16px;
		width: 16px;
		position: absolute;
		border: solid 1px #000;
		top: 47%;
		bottom: 0;
		margin-top: -5px;
		transition: 0.3s;
		border-radius: 5px;
		background: rgba(217, 217, 217, 0);
	}
	&::after {
		content: "";
		display: block;
		box-sizing: border-box;
		height: 10px;
		width: 10px;
		position: absolute;
		border-radius: 4px;
		border: 1px solid #000;
		background: #040000;
		top: 47%;
		left: 3px;
		margin-top: -2px;
		transition: 0.3s;
		opacity: 0;
	}
`

export const Button = styled.button`
	border: none;
	max-width: 400px;
	height: 70px;
	background-color: #82ad24;
	color: #fff;
	text-align: center;
	font-family: "Noto Sans JP";
	font-size: 20px;
	font-style: normal;
	font-weight: 400;
	line-height: normal;
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
	position: relative;
	top: 15px;
	left: 25px;
`
