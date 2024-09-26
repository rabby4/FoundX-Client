"use client"
import FXDatePicker from "@/src/components/form/FXDatePicker"
import FXInput from "@/src/components/form/FXInput"
import FXSelect from "@/src/components/form/FXSelect"
import dateToISO from "@/src/utils/dateToISO"
import { Button } from "@nextui-org/button"
import { Divider } from "@nextui-org/divider"
import {
	FieldValues,
	FormProvider,
	SubmitHandler,
	useFieldArray,
	useForm,
} from "react-hook-form"
import { allDistict } from "@bangladeshi/bangladesh-address"
import { useGetCategories } from "@/src/hooks/categories.hook"
import { ChangeEvent, useState } from "react"
import { PlusIcon, TrashIcon } from "@/src/assets/icons"
import FXTextArea from "@/src/components/form/FXTextArea"
import { useUser } from "@/src/context/user.provider"
import { useCreatePost } from "@/src/hooks/post.hook"
import { useRouter } from "next/navigation"
import Loading from "@/src/components/ui/Loading"

const cityOptions = allDistict()
	.sort()
	.map((city: string) => {
		return { key: city, label: city }
	})

const CreatePostPage = () => {
	const [imageFiles, setImageFiles] = useState<File[] | []>([])
	const [imagePreviews, setImagePreviews] = useState<string[] | []>([])
	const { user } = useUser()
	const {
		mutate: handleCreatePost,
		isPending: createPostPending,
		isSuccess,
	} = useCreatePost()

	const {
		data: categoriesData,
		isLoading: categoryLoading,
		isSuccess: categoriesSuccess,
	} = useGetCategories()
	const router = useRouter()

	let categoriesOptions: { key: string; label: string }[] = []

	if (categoriesData?.data && !categoryLoading) {
		categoriesOptions = categoriesData?.data?.map(
			(category: { _id: string; name: string }) => {
				return { key: category._id, label: category.name }
			}
		)
	}

	const methods = useForm()
	const { control, handleSubmit } = methods

	const { fields, append, remove } = useFieldArray({
		control,
		name: "questions",
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const formData = new FormData()

		const postData = {
			...data,
			questions: data.questions.map(
				(question: { value: string }) => question.value
			),
			dateFound: dateToISO(data.dateFound),
			user: user?._id,
		}

		formData.append("data", JSON.stringify(postData))
		for (let image of imageFiles) {
			formData.append("itemImages", image)
		}

		handleCreatePost(formData)
	}

	const handleFieldAppend = () => {
		append({ name: "questions" })
	}

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files![0]
		setImageFiles((prev) => [...prev, file])
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				setImagePreviews((prev) => [...prev, reader.result as string])
			}
			reader.readAsDataURL(file)
		}
	}

	if (!createPostPending && isSuccess) {
		router.push("/")
	}

	return (
		<>
			{createPostPending && <Loading />}
			<div className="h-full rounded-xl bg-gradient-to-b from-default-100 px-20 py-12">
				<h1 className="text-2xl font-semibold">Post a found item</h1>
				<Divider className="mb-5 mt-3" />
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex flex-wrap gap-2 py-2">
							<div className="min-w-fit flex-1">
								<FXInput name="title" label="Title" />
							</div>
							<div className="min-w-fit flex-1">
								<FXDatePicker name="dateFound" label="Found Date" />
							</div>
						</div>
						<div className="flex flex-wrap gap-2 py-2">
							<div className="min-w-fit flex-1">
								<FXInput name="location" label="Location" />
							</div>
							<div className="min-w-fit flex-1">
								<FXSelect name="city" label="City" options={cityOptions} />
							</div>
						</div>
						<div className="flex flex-wrap gap-2 py-2">
							<div className="min-w-fit flex-1">
								<FXSelect
									name="category"
									label="Category"
									options={categoriesOptions}
									disabled={!categoriesSuccess}
								/>
							</div>
							<div className="min-w-fit flex-1">
								<label
									htmlFor="itemImages"
									className="size-full bg-default-100 rounded-md block text-center p-3 cursor-pointer border border-dashed border-default-300"
								>
									Upload Images
								</label>
								<input
									type="file"
									multiple
									id="itemImages"
									name="itemImages"
									className="hidden"
									onChange={(e) => handleImageChange(e)}
								/>
							</div>
						</div>
						<div>
							<div className="flex gap-5 flex-wrap my-5">
								{imagePreviews.length > 0 &&
									imagePreviews.map((preview, index) => (
										<img
											key={index}
											src={preview}
											alt="preview"
											className="w-24 h-24 object-cover rounded-md"
										/>
									))}
							</div>
						</div>
						<div className="flex flex-wrap gap-2 py-2">
							<FXTextArea name="description" label="Description" />
						</div>
						<Divider className="my-5" />
						<div className="flex justify-between items-center">
							<h2 className="text-xl">Owner verification options</h2>
							<Button isIconOnly onClick={() => handleFieldAppend()}>
								<PlusIcon />
							</Button>
						</div>
						{fields.map((field, index) => (
							<div key={field.id} className="flex gap-5 items-center">
								<FXInput
									name={`questions.${index}.value`}
									label={`Questions ${index + 1}`}
								/>
								<Button isIconOnly onClick={() => remove(index)}>
									<TrashIcon />
								</Button>
							</div>
						))}
						<Divider className="my-5" />
						<Button type="submit">Post</Button>
					</form>
				</FormProvider>
			</div>
		</>
	)
}

export default CreatePostPage
