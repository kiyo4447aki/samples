import styled from "styled-components"

export const Wrapper = styled.div`
	width: 1440px;
	background-color: #fff;
	margin: 0 auto;
	padding: 30px 4.1vw 0 4.1vw;
	box-sizing: border-box;
	display: flex;
`

export const NavWrapper = styled.div`
	max-width: 195px;
	height: 370px;
	flex: 1;
	background-color: #f3edf7;
	padding-top: 20px;
	padding-bottom: 20px;
`

export const NavItem = styled.button`
	//reset default styles
	background-color: transparent;
	border: none;
	cursor: pointer;
	outline: none;
	padding: 0;
	appearance: none;

	display: flex;
	align-items: center;
	width: 100%;
	height: 61px;
	margin: 0;
	padding-left: 30px;
	box-sizing: border-box;
	gap: 10px;
`

export const NavText = styled.p`
	margin: 0;
	color: #000000;
	font-family: Roboto;
	font-size: 16px;
	font-style: normal;
	font-weight: 400;
	line-height: 24px;
	letter-spacing: 0.5px;
`

export const MainWrapper = styled.div`
	flex: 1;
	margin: 0 auto;
`

export const SwitchWrapper = styled.div`
	padding-left: 30px;
	padding-right: 30px;
	height: 56px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	gap: 30px;
`

export const SwitchItem = styled.button`
	//reset default styles
	background-color: transparent;
	border: none;
	cursor: pointer;
	outline: none;
	padding: 0;
	appearance: none;

	display: flex;
	max-width: 160px;
	background-color: #f3edf7;
	padding: 16px 20px 16px 16px;
	justify-content: center;
	align-items: center;
	gap: 12px;
	flex: 1;
	align-self: stretch;
	border-radius: 20px;
`

export const SwitchText = styled.p`
	margin: 0;
	color: #65558f;
	text-align: center;
	font-family: Roboto;
	font-size: 14px;
	font-style: normal;
	font-weight: 500;
	line-height: 20px;
	letter-spacing: 0.1px;
`

export const ProfileIconWrapper = styled.button`
	//reset default styles
	background-color: transparent;
	border: none;
	cursor: pointer;
	outline: none;
	padding: 0;
	appearance: none;

	display: flex;
	max-width: 160px;
	padding: 16px 20px 16px 16px;
	justify-content: center;
	align-items: center;
	gap: 12px;
	flex: 1 0 0;
	align-self: stretch;
	border-radius: 20px;
	border: 1px solid #c8c4cf;
`
