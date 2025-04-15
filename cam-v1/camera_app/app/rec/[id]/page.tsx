"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"
import { Records } from "@/types/camera"
import getRecords from "../utils/getRecords"
import getUuid from "@/lib/uuid"
import { CameraDevices } from "@/types/camera"

export default function Recordings({ params }: { params: { id: string } }) {
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

	const [records, setRecords] = useState<Records>([])
	const [isLoading, setIsLoading] = useState(true)
	useEffect(() => {
		try {
			getRecords(params.id, cameraData.password, getUuid()).then((res) => {
				setRecords(res)
			})
		} catch (e) {
			console.error(e)
		} finally {
			setIsLoading(false)
		}
	}, [])
	if (isLoading) {
		return (
			<div className="max-w-2xl mx-auto h-full">
				<h2 className="text-2xl mb-6 text-center">Now Loading ...</h2>
			</div>
		)
	} else {
		return (
			<div className="max-w-2xl mx-auto">
				<h2 className="text-2xl font-bold mb-6 text-center">録画一覧</h2>
				<div className="grid gap-4">
					{records.map((record) => {
						if (!record) {
							return
						}
						return (
							<Card key={record.id}>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										{record.name}
									</CardTitle>
									<Video size={18} />
								</CardHeader>
								<CardContent className="flex justify-between items-center">
									<span className="text-sm text-gray-500">
										録画時間: {record.duration}
									</span>
									<Link
										href={{
											pathname: `/rec/${params.id}/view/`,
											query: {
												id: record.id,
												name: record.name,
												duration: record.duration,
											},
										}}
									>
										<Button variant="outline">再生</Button>
									</Link>
								</CardContent>
							</Card>
						)
					})}
				</div>
			</div>
		)
	}
}
