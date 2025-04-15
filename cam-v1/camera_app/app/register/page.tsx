"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft } from "lucide-react"
import { CameraDevice, CameraDevices } from "@/types/camera"

export default function Register() {
	const [id, setId] = useState("")
	const [password, setPassword] = useState("")
	const [name, setName] = useState("")
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		let data: CameraDevices = { cameras: [] }
		const newCamera: CameraDevice = { name: name, id: id, password: password }

		const preData = localStorage.getItem("cameras")
		if (preData != null) {
			data = JSON.parse(preData)
		}
		data.cameras.push(newCamera)
		localStorage.setItem("cameras", JSON.stringify(data))

		router.push("/")
	}

	return (
		<div className="max-w-md mx-auto">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-center">機器登録</CardTitle>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">カメラ名</Label>
							<Input
								type="text"
								id="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="id">デバイスID</Label>
							<Input
								type="text"
								id="id"
								value={id}
								onChange={(e) => setId(e.target.value)}
								required
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">パスワード</Label>
							<Input
								type="password"
								id="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
						</div>
						<Button type="submit" className="w-full">
							登録
						</Button>
					</form>
				</CardContent>
				<CardFooter className="flex justify-center">
					<Link href="/">
						<Button variant="ghost">
							<ArrowLeft className="mr-2 h-4 w-4" /> 機器選択に戻る
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	)
}
