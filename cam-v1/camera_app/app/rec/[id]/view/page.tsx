"use client"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { CameraDevices } from "@/types/camera"

export default function View({ params }: { params: { id: string } }) {
	const [srcUrl, setSrcUrl] = useState("")
	const searchParams = useSearchParams()
	const recordName = searchParams.get("name")
	const getCameraData = (id: string) => {
		let dataString: string | null = '{"cameras":[]}'
		if (typeof window !== "undefined") {
			dataString = localStorage.getItem("cameras")
		}
		let data: CameraDevices = { cameras: [] }
		if (dataString != null) {
			data = JSON.parse(dataString)
		}
		return data.cameras.filter((d) => {
			return d.id === id
		})
	}
	const cameraData = getCameraData(params.id)[0]

	useEffect(() => {
		const fetchVideoUrl = async () => {
			const response = await fetch(
				`https://${params.id}.backend.skypics.jp:5000/video-token/?record_name=${recordName}`,
				{
					method: "GET",
					headers: {
						"Authorization": cameraData.password,
					},
				}
			)
			const data = await response.json()
			const token = data?.token

			if (!token) {
				console.error("failed to get token")
				return
			}

			setSrcUrl(
				`https://${params.id}.backend.skypics.jp:5000/view/${recordName}?token=${token}`
			)
		}
		fetchVideoUrl()
	}, [])

	return (
		<div className="max-w-3xl mx-auto">
			<h2 className="text-2xl font-bold mb-6 text-center">録画視聴</h2>
			<Card>
				<CardContent className="p-6">
					<div className=" bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
						<video
							className="w-full aspect-video"
							src={srcUrl}
							autoPlay
							playsInline
							controls
							controlsList="nodownload"
							muted
						></video>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<div>
						<p className="text-sm text-gray-500">デバイス ID: {params.id}</p>
						<p className="text-sm text-gray-500">動画ID: {searchParams.get("id")}</p>
						<p className="text-sm text-gray-500">
							ファイル名: {searchParams.get("name")}
						</p>
						<p className="text-sm text-gray-500">
							録画時間: {searchParams.get("duration")}
						</p>
					</div>
					<Link href="/">
						<Button variant="outline">
							<ArrowLeft className="mr-2 h-4 w-4" /> 機器選択に戻る
						</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	)
}
