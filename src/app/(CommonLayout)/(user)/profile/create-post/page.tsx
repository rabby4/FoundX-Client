"use client"
import FXDatePicker from "@/src/components/form/FXDatePicker"
import FXInput from "@/src/components/form/FXInput"
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

const CreatePostPage = () => {
	const methods = useForm()
	const { control, handleSubmit } = methods

	const { fields, append, remove } = useFieldArray({
		control,
		name: "questions",
	})

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const postData = {
			...data,
			questions: data.questions.map(
				(question: { value: string }) => question.value
			),
			foundDate: dateToISO(data.foundDate),
		}
		console.log(postData)
	}

	const handleFieldAppend = () => {
		append({ name: "questions" })
	}

	return (
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
							<FXDatePicker name="foundDate" label="Found Date" />
						</div>
					</div>
					<div className="flex flex-wrap gap-2 py-2">
						<div className="min-w-fit flex-1">
							<FXInput name="location" label="Location" />
						</div>
						<div className="min-w-fit flex-1">
							<FXInput name="city" label="city" />
						</div>
					</div>
					<div className="flex flex-wrap gap-2 py-2">
						<div className="min-w-fit flex-1">
							<FXInput name="category" label="Category" />
						</div>
						<div className="min-w-fit flex-1">
							<FXInput name="itemImage" label="Upload Image" />
						</div>
					</div>
					<Divider className="my-5" />
					<div className="flex justify-between items-center">
						<h2 className="text-xl">Owner verification options</h2>
						<Button onClick={() => handleFieldAppend()}>Append</Button>
					</div>
					{fields.map((field, index) => (
						<div key={field.id} className="flex gap-5 items-center">
							<FXInput
								name={`questions.${index}.value`}
								label={`Questions ${index + 1}`}
							/>
							<Button onClick={() => remove(index)}>Remove</Button>
						</div>
					))}
					<Divider className="my-5" />
					<Button type="submit">Post</Button>
				</form>
			</FormProvider>
		</div>
	)
}

export default CreatePostPage
