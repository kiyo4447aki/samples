import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Link from "next/link"
import { Camera } from "lucide-react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "SkyPics",
	description: "当社製カメラの映像を視聴",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="ja" className="h-full">
			<head>
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/icon.png"></link>
				<meta name="theme-color" content="#fff" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
			</head>
			<body className={`${inter.className} bg-gray-50 flex flex-col h-full`}>
				<SpeedInsights />
				<header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
					<div className="max-w-5xl mx-auto px-4 py-4 flex items-center">
						<Link
							href="/"
							className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors"
						>
							<Camera size={24} />
							<h1 className="text-xl font-semibold">SkyPics</h1>
						</Link>
					</div>
				</header>
				<main className="flex-grow overflow-auto pt-16 pb-16">
					<div className="container mx-auto px-4 py-8 h-full">{children}</div>
				</main>
				<Footer />
			</body>
		</html>
	)
}
