import { TInput } from "@/src/types"
import { Select, SelectItem } from "@nextui-org/select"
import { useFormContext } from "react-hook-form"

interface IProps extends TInput {
	options: {
		key: string
		label: string
	}[]
}

const FXSelect = ({
	options,
	name,
	label,
	disabled,
	variant = "bordered",
}: IProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext()

	return (
		<div>
			<Select
				{...register(name)}
				label={label}
				className="max-w-xs"
				variant={variant}
				isDisabled={disabled}
			>
				{options.map((option) => (
					<SelectItem key={option.key}>{option.label}</SelectItem>
				))}
			</Select>
		</div>
	)
}

export default FXSelect
