import React from "react"
import Header from "../../components/header/Header"
import * as Styled from "./styles"
import StarsIcon from "@mui/icons-material/Stars"
import {
	AccountCircle,
	ChatBubble,
	DirectionsWalk,
	Edit,
	Error,
	Settings,
} from "@mui/icons-material"

const EnterpriseTop = () => {
	return (
		<>
			<Header />
			<Styled.Wrapper>
				<Styled.NavWrapper>
					<Styled.NavItem>
						<AccountCircle />
						<Styled.NavText>Home</Styled.NavText>
					</Styled.NavItem>
					<Styled.NavItem>
						<StarsIcon />
						<Styled.NavText>支払い</Styled.NavText>
					</Styled.NavItem>
					<Styled.NavItem>
						<Settings />
						<Styled.NavText>設定</Styled.NavText>
					</Styled.NavItem>
					<Styled.NavItem>
						<Error />
						<Styled.NavText>ヘルプ</Styled.NavText>
					</Styled.NavItem>
					<Styled.NavItem>
						<DirectionsWalk />
						<Styled.NavText>提携企業</Styled.NavText>
					</Styled.NavItem>
					<Styled.NavItem>
						<ChatBubble />
						<Styled.NavText>お問い合わせ</Styled.NavText>
					</Styled.NavItem>
				</Styled.NavWrapper>
				<Styled.MainWrapper>
					<Styled.SwitchWrapper>
						<Styled.SwitchItem>
							<Edit />
							<Styled.SwitchText>今日の予約</Styled.SwitchText>
						</Styled.SwitchItem>
						<Styled.SwitchItem>
							<Edit />
							<Styled.SwitchText>明日以降の予約</Styled.SwitchText>
						</Styled.SwitchItem>
						<Styled.SwitchItem>
							<Edit />
							<Styled.SwitchText>店舗情報</Styled.SwitchText>
						</Styled.SwitchItem>
						<Styled.SwitchItem>
							<Edit />
							<Styled.SwitchText>予約設定</Styled.SwitchText>
						</Styled.SwitchItem>
						<Styled.SwitchItem>
							<Edit />
							<Styled.SwitchText>宣伝をする</Styled.SwitchText>
						</Styled.SwitchItem>
						<Styled.ProfileIconWrapper>
							<AccountCircle />
							<Styled.SwitchText>飲食店名</Styled.SwitchText>
						</Styled.ProfileIconWrapper>
					</Styled.SwitchWrapper>
				</Styled.MainWrapper>
			</Styled.Wrapper>
		</>
	)
}

export default EnterpriseTop
