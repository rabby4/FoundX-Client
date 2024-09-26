import Container from "@/src/components/ui/Container"
import Post from "@/src/components/ui/Post"
import { getPost } from "@/src/services/post"

interface IProps {
	params: {
		itemId: string
	}
}

const ItemDetailsPage = async ({ params: { itemId } }: IProps) => {
	const { data: post } = await getPost(itemId)
	return (
		<Container>
			<div className="mx-auto my-3 mx-w-[720px]">
				<Post key={post._id} post={post} />
			</div>
		</Container>
	)
}

export default ItemDetailsPage
