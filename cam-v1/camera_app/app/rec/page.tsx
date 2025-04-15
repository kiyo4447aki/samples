"use client"

import Link from "next/link"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trash2, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { CameraDevices, CameraDevice } from "@/types/camera"

export default function RecHome() {
	const [devices, setDevices] = useState<CameraDevice[]>([])
	useEffect(() => {
		const dataString = localStorage.getItem("cameras")
		if (dataString != null) {
			const data: CameraDevices = JSON.parse(dataString)
			setDevices(data.cameras)
		}
	}, [])

	const removeCameraHandler = (id: string, name: string) => {
		const check = confirm(`${name}（id:${id}）を本当に削除しますか？`)
		if (check === true) {
			let data: CameraDevices = { cameras: [] }
			const preData = localStorage.getItem("cameras")
			if (preData != null) {
				data = JSON.parse(preData)
			}
			const index = data.cameras.findIndex((d) => d.id === id)
			data.cameras.splice(index, 1)
			localStorage.setItem("cameras", JSON.stringify(data))
			setDevices(data.cameras)
		}
	}

	return (
		<div className="max-w-2xl mx-auto">
			<h2 className="text-2xl font-bold mb-6 text-center">録画視聴</h2>
			<div className="grid gap-4 md:grid-cols-2 mb-8">
				{devices.map((device) => (
					<Card key={device.id}>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">{device.name}</CardTitle>
							<a
								href=""
								onClick={(e) => {
									e.preventDefault()
									removeCameraHandler(device.id, device.name)
								}}
							>
								<Trash2 size={18} />
							</a>
						</CardHeader>
						<CardContent>
							<Link href={`/rec/${device.id}`}>
								<Button className="w-full">録画一覧</Button>
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
			<div className="text-center">
				<Link href="/register">
					<Button variant="outline">
						<Plus className="mr-2 h-4 w-4" /> 新しい機器を登録する
					</Button>
				</Link>
			</div>
		</div>
	)
}
