import {
	Card as NextCard,
	CardHeader,
	CardBody,
	CardFooter,
} from "@nextui-org/card"
import { Button } from "@nextui-org/button"
import { Image } from "@nextui-org/image"
import { TPost } from "@/src/types"
import { format } from "date-fns"

const Card = ({ post }: { post: TPost }) => {
	return (
		<>
			<NextCard isFooterBlurred radius="lg" className="w-full h-[300px]">
				<CardHeader>
					<p className="absolute -top-0 right-1 rounded-full bg-black px-2 text-tiny uppercase">
						{post?.category?.name}
					</p>
					<h4 className="mt-2 rounded bg-black/30 p-1 text-2xl font-medium text-white">
						{post?.title}
					</h4>
				</CardHeader>
				<Image
					removeWrapper
					alt="Card example background"
					className="object-cover scale-125 z-0 h-full w-full -translate-y-6"
					src={post?.images[0]}
				/>
				<CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
					<div className="w-1/2">
						<p className="text-tiny text-black">{post?.city}</p>
						<p className="text-tiny text-black">
							{format(new Date(post?.dateFound), "dd MMMM yyyy")}
						</p>
					</div>
					<Button
						className="text-tiny text-white bg-black/20"
						variant="flat"
						color="default"
						radius="lg"
						size="sm"
					>
						Notify me
					</Button>
				</CardFooter>
			</NextCard>
		</>
	)
}

export default Card
