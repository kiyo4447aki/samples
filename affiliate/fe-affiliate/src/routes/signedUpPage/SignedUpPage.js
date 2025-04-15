import React from "react"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import * as Styled from "./styles"
import { useLocation } from "react-router-dom"

const SignedUpPage = () => {
	const location = useLocation()

	return (
		<>
			<Header />
			<Styled.Wrapper>
				<Styled.ContentWrapper>
					<Styled.Title>仮登録完了</Styled.Title>
					<Styled.Text>
						{location.state.mail}に仮登録完了メールを送信しました。
					</Styled.Text>
					<Styled.Text>24時間以内に記載のURLより登録を行ってください。</Styled.Text>
				</Styled.ContentWrapper>
			</Styled.Wrapper>
			<Footer />
		</>
	)
}

export default SignedUpPage
