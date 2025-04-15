"use client"

import Link from "next/link"
import { Video, Tv } from "lucide-react"
import { usePathname } from "next/navigation"

export default function Navigation() {
	const pathname = usePathname()

	const isActive = (path: string) => {
		if (path === "/" && pathname === "/") return true
		if (path !== "/" && pathname.startsWith(path)) return true
		return false
	}

	const linkClass = (path: string) =>
		`flex flex-1 flex-col items-center py-2 transition-colors ${
			isActive(path) ? "text-primary font-semibold" : "text-gray-500 hover:text-primary"
		}`

	return (
		<footer
			className="bg-white border-t fixed bottom-0 left-0 right-0 z-10"
			style={{ height: "var(--footer-height)" }}
		>
			<div className="max-w-5xl mx-auto px-4 h-full">
				<nav className="flex justify-around h-full items-center">
					<Link href="/" className={linkClass("/")}>
						<Tv size={24} />
						<span className="text-xs mt-1">LIVE</span>
					</Link>
					<Link href="/rec" className={linkClass("/rec")}>
						<Video size={24} />
						<span className="text-xs mt-1">REC</span>
					</Link>
				</nav>
			</div>
		</footer>
	)
}
