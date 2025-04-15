"use client"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import dynamic from "next/dynamic"
const Video = dynamic(() => import("./Video"), { ssr: false })
import { CameraDevices } from "@/types/camera"

export default function View({ params }: { params: { id: string } }) {
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
	return (
		<div className="max-w-3xl mx-auto">
			<h2 className="text-2xl font-bold mb-6 text-center">映像視聴</h2>
			<Card>
				<CardContent className="p-6">
					<div className=" bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
						<Video cameraData={cameraData}></Video>
					</div>
				</CardContent>
				<CardFooter className="flex justify-between">
					<p className="text-sm text-gray-500">デバイス ID: {params.id}</p>
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
