import styled from "styled-components"
import Logo from "../logo/Logo"
import SeparateBar from "../separateBar/SeparateBar"

const Footer = () => {
	return (
		<Wrapper>
			<HeadWrapper>
				<HeadRawWrapper>
					<HeadItem>ヘルプ・お問い合わせ</HeadItem>
					<SeparateBar />
					<HeadItem>SNSAについて</HeadItem>
					<SeparateBar />
					<HeadItem>インフルエンサー様向けサービスについて</HeadItem>
					<SeparateBar />
					<HeadItem>飲食店・飲食企業様向けサービスについて</HeadItem>
				</HeadRawWrapper>
				<HeadRawWrapper>
					<HeadItem>機能改善要望</HeadItem>
					<SeparateBar />
					<HeadItem>利用規約</HeadItem>
					<SeparateBar />
					<HeadItem>個人情報保護方針</HeadItem>
					<SeparateBar />
					<HeadItem>採用情報</HeadItem>
					<SeparateBar />
					<HeadItem>企業情報</HeadItem>
				</HeadRawWrapper>
			</HeadWrapper>
			<FootWrapper>
				<FootTopWrapper>
					<FootLogoWrapper>
						<Logo />
					</FootLogoWrapper>
					<CopyrightText>
						Copyright (c) kaito.kiyo, inc. All Rights Reserved. 無断転載禁止
					</CopyrightText>
				</FootTopWrapper>
				<FootSvgWrapper>
					<FootBackgroundSvg xmlns="http://www.w3.org/2000/svg" fill="none">
						<path
							d="M92.6458 102.727L3.76344 170.364C1.5677 172.035 0.304655 174.656 0.366007 177.415C0.471853 182.174 4.41559 185.946 9.17456 185.84L925.522 165.459C964.728 164.587 995.804 132.098 994.932 92.8918L993.763 40.3465C992.754 -5.04681 936.756 -25.839 906.366 7.89531C895.201 20.289 878.604 26.3198 862.087 23.9852L593.174 -14.0249C546.108 -20.6775 499.408 0.31205 473.138 39.9264C442.936 85.469 386.363 105.704 334.128 89.6484L272.523 70.7123C210.908 51.7733 143.942 63.6919 92.6458 102.727Z"
							fill="url(#paint0_linear_3_493)"
						/>
						<defs>
							<linearGradient
								id="paint0_linear_3_493"
								x1="363.806"
								y1="23.6082"
								x2="446.564"
								y2="244.846"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#1488CC" />
								<stop offset="1" stopColor="#2B32B2" />
							</linearGradient>
						</defs>
					</FootBackgroundSvg>
				</FootSvgWrapper>
			</FootWrapper>
		</Wrapper>
	)
}

const Wrapper = styled.footer`
	width: 100%;
	height: 185px;
`

const HeadWrapper = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 85px;
	align-items: center;
	justify-content: center;
	padding: 22px 28vw 20px 28vw;
	box-sizing: border-box;
	background-color: #faf8f5;
`

const HeadRawWrapper = styled.div`
	width: 100%;
	height: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`

const HeadItem = styled.p`
	height: 20px;
	color: #06c;
	text-align: center;
	font-family: Meiryo;
	font-size: 10px;
	font-style: normal;
	font-weight: 400;
	line-height: 20px;
	white-space: nowrap;
`

const FootWrapper = styled.div`
	width: 100%;
	height: 100px;
	box-sizing: border-box;
	overflow: hidden;
	background-color: #faf8ff;
`

const FootTopWrapper = styled.div`
	width: 100%;
	height: 30px;
	display: flex;
	justify-content: space-between;
`

const FootLogoWrapper = styled.div`
	padding-left: 11.6vw;
	padding-top: 20px;
`

const FootSvgWrapper = styled.div`
	height: 90px;
	padding-left: 63vw;
`

const FootBackgroundSvg = styled.svg`
	fill: linear-gradient(126deg, #1488cc 37.42%, #2b32b2 79.29%);
	width: 69vw;
	max-width: 100%;
	height: auto;
	transform: rotate(-1.274deg);
	margin: -40px 0 0 0;
`

const CopyrightText = styled.p`
	color: #949499;
	text-align: right;
	font-family: Meiryo;
	font-size: 11px;
	font-style: normal;
	font-weight: 400;
	line-height: 17px;
	padding: 0;
	margin: 0;
	white-space: nowrap;
	padding-right: 15.8vw;
`

export default Footer
