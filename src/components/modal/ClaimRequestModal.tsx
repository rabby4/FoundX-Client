"use client"
import React from "react"
import FXModal from "./FXModal"
import FXForm from "../form/FXForm"
import FXInput from "../form/FXInput"
import FXTextArea from "../form/FXTextArea"
import { Button } from "@nextui-org/button"
import { FieldValues, SubmitHandler } from "react-hook-form"
import { useAddClaimRequest } from "@/src/hooks/claimRequest.hook"

interface IProps {
	id: string
	questions: string[]
}

const ClaimRequestModal = ({ id, questions }: IProps) => {
	const { mutate: handleClaimRequest, isPending } = useAddClaimRequest()
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		const claimRequestData = {
			item: id,
			description: data.description,
			answers: Object.keys(data)
				.filter((formElement) => formElement.startsWith("answer"))
				.map((answer) => data[answer]),
		}
		handleClaimRequest(claimRequestData)
	}
	return (
		<FXModal
			buttonClassName={"flex-1"}
			buttonText={"Claim Request"}
			title={"Claim Request"}
		>
			<FXForm onSubmit={onSubmit}>
				{questions?.map((question, index) => (
					<div key={index} className="mb-4">
						<p className="mb-1">{question}</p>
						<FXInput
							label={`Answer - ${index + 1}`}
							name={`answer-${index + 1}`}
						/>
					</div>
				))}
				<FXTextArea label={"Description"} name={"description"} />
				<Button type="submit" className="w-full my-4">
					{isPending ? "Sending..." : "Send"}
				</Button>
			</FXForm>
		</FXModal>
	)
}

export default ClaimRequestModal
