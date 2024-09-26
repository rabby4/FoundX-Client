"use client"
import LightGallery from "lightgallery/react"
// import styles
import "lightgallery/css/lightgallery.css"
import "lightgallery/css/lg-zoom.css"
import "lightgallery/css/lg-thumbnail.css"
// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"
import Image from "next/image"
import Link from "next/link"

interface IProps {
	images: string[]
}

const ImageGallery = ({ images }: IProps) => {
	return (
		<div>
			<LightGallery
				elementClassNames={`mt-2 gap-2 grid place-items-center
					${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
				speed={500}
				plugins={[lgThumbnail, lgZoom]}
			>
				{images.map((image, index) => (
					<Link key={index} href={image} className="w-full">
						<Image
							className="h-[400px] w-full object-cover "
							src={image}
							height={500}
							width={500}
							alt={`images-${index}`}
						/>
					</Link>
				))}
			</LightGallery>
		</div>
	)
}

export default ImageGallery
