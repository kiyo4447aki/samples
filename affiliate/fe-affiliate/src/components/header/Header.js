import styled from "styled-components"
import Logo from "../logo/Logo"
import SeparateBar from "../separateBar/SeparateBar"

const Header = () => {
	return (
		<Wrapper>
			<HeadWrapper>
				<LoginWrapper>
					<LoginText href="">無料会員登録/ログイン</LoginText>
				</LoginWrapper>
				<NavWrapper>
					<NavItem href="">SNSAについて</NavItem>
					<SeparateBar />
					<NavItem href="">お問い合わせ</NavItem>
					<SeparateBar />
					<NavItem href="">利用規約</NavItem>
				</NavWrapper>
			</HeadWrapper>
			<FootWrapper>
				<Logo />
				<HelpButton>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1vw"
						viewBox="0 0 13 14"
						fill="none"
					>
						<path
							d="M8.9375 2.6582C8.59896 2.41276 8.21598 2.22868 7.78857 2.10596C7.36117 1.98324 6.88932 1.92188 6.37305 1.92188C5.98372 1.92188 5.62402 1.96419 5.29395 2.04883C4.96387 2.13346 4.66764 2.26465 4.40527 2.44238C3.97363 2.71322 3.64567 3.07715 3.42139 3.53418C3.1971 3.99121 3.07227 4.54557 3.04688 5.19727H5.01465C5.01465 5.01107 5.04215 4.82699 5.09717 4.64502C5.15218 4.46305 5.2347 4.2832 5.34473 4.10547C5.45475 3.92773 5.60286 3.79655 5.78906 3.71191C5.97526 3.62728 6.19954 3.58496 6.46191 3.58496C6.73275 3.58496 6.95915 3.61882 7.14111 3.68652C7.32308 3.75423 7.46484 3.86003 7.56641 4.00391C7.66797 4.14779 7.74414 4.29801 7.79492 4.45459C7.8457 4.61117 7.87109 4.77832 7.87109 4.95605C7.87109 5.09994 7.84782 5.2417 7.80127 5.38135C7.75472 5.521 7.6849 5.6543 7.5918 5.78125C7.54948 5.84896 7.49447 5.91667 7.42676 5.98438C7.35905 6.05208 7.28288 6.11556 7.19824 6.1748L6.70312 6.56836C6.45768 6.75456 6.26091 6.93229 6.11279 7.10156C5.96468 7.27083 5.861 7.43164 5.80176 7.58398C5.74251 7.72786 5.69385 7.93311 5.65576 8.19971C5.61768 8.46631 5.59017 8.79004 5.57324 9.1709H7.42676C7.42676 8.99316 7.43522 8.83659 7.45215 8.70117C7.46908 8.56576 7.49023 8.45573 7.51562 8.37109C7.55794 8.23568 7.62354 8.10661 7.7124 7.98389C7.80127 7.86117 7.90918 7.74902 8.03613 7.64746L8.51855 7.2793C8.764 7.08464 8.96924 6.90902 9.13428 6.75244C9.29932 6.59587 9.42415 6.45833 9.50879 6.33984C9.66113 6.13672 9.77327 5.91032 9.84521 5.66064C9.91715 5.41097 9.95312 5.13802 9.95312 4.8418C9.95312 4.35938 9.86849 3.9362 9.69922 3.57227C9.52995 3.20833 9.27604 2.90365 8.9375 2.6582ZM5.53516 12.0781H7.56641V10.1104H5.53516V12.0781Z"
							fill="#B4B4B4"
						/>
					</svg>
					<HelpText>ヘルプ</HelpText>
				</HelpButton>
			</FootWrapper>
		</Wrapper>
	)
}

const Wrapper = styled.header`
	width: 100%;
	height: 95px;
	background-color: #fff;
	margin: 0;
	padding: 0;
	border-bottom: 5px solid rgba(249, 249, 249, 1);
	border-top: 3px solid #82ad24;
`

const HeadWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 45px;
	align-items: center;
	justify-content: space-between;
	padding: 15px 12% 15px 15%;
	box-sizing: border-box;
`

const FootWrapper = styled.div`
	display: flex;
	width: 100%;
	height: 50px;
	align-items: center;
	justify-content: center;
	padding: 10px 12% 10px 12%;
	gap: 56vw;
	box-sizing: border-box;
`

const LoginWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 8vw;
	height: 15px;
	margin: 0;
	padding: 0;
`

const LoginText = styled.a`
	margin: 0;
	padding: 0;
	color: #595960;
	font-family: Meiryo;
	font-size: 10px;
	font-style: normal;
	font-weight: 400;
	line-height: 15px;
	text-decoration: none;
	white-space: nowrap;
`

const NavWrapper = styled.nav`
	height: 20px;
	width: 15vw;
	display: flex;
	justify-content: center;
	align-items: center;
`

const NavItem = styled.a`
	color: #06c;
	font-family: Meiryo;
	font-size: 10.828px;
	font-style: normal;
	font-weight: 400;
	line-height: 15.4px;
	text-decoration: none;
	white-space: nowrap;
`

const HelpButton = styled.button`
	display: flex;
	width: 5vw;
	height: 22px;
	max-width: 78px;
	justify-content: center;
	align-items: center;
	gap: 5px;

	border-radius: 3px;
	border: 1px solid #d2d2d2;
	background: linear-gradient(180deg, #fff 0%, #f4f4f4 100%);
	box-shadow: 0px 0px 1px 1px #fff inset, 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
`

const HelpText = styled.p`
	margin: 0;
	padding: 0;
	color: #13131e;
	text-align: center;
	text-shadow: 0px 1px 0px #fff;
	font-family: Meiryo;
	font-size: 11px;
	font-style: normal;
	font-weight: 700;
	line-height: 22px;
	white-space: nowrap;
`

export default Header
