"use client"
import { FormProvider, useForm } from "react-hook-form"

interface formConfig {
	defaultValues?: Record<string, any>
	resolver?: any
}

interface IProps extends formConfig {
	children: React.ReactNode
	onSubmit: any
}

const FXForm = ({ children, onSubmit, defaultValues, resolver }: IProps) => {
	const formConfig: formConfig = {}

	if (!!defaultValues) {
		formConfig["defaultValues"] = defaultValues
	}
	if (!!resolver) {
		formConfig["resolver"] = resolver
	}

	const methods = useForm(formConfig)
	const handleSubmit = methods.handleSubmit

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)}>{children}</form>
		</FormProvider>
	)
}

export default FXForm
