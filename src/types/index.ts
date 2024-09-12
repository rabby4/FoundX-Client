import { SVGProps } from "react"

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number
}

export type TPost = {
	_id: string
	title: string
	description: string
	images: string[]
	location: string
	city: string
	dateFound: string
	status: string
	isReported: boolean
	reportCount: number
	category: any
	user: any
	questions: string[]
	createdAt: string
	updatedAt: string
	__v: number
}
