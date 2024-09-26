import { TInput } from "@/src/types"
import { Textarea } from "@nextui-org/input"
import { useFormContext } from "react-hook-form"

interface IProps extends TInput {
	type?: string
}

const FXTextArea = ({ name, label, variant = "bordered" }: IProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()
	return <Textarea {...register(name)} label={label} variant={variant} />
}

export default FXTextArea
