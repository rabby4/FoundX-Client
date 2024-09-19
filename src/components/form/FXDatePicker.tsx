import { TInput } from "@/src/types"
import { DatePicker } from "@nextui-org/date-picker"
import { Controller } from "react-hook-form"

interface IProps extends TInput {}

const FXDatePicker = ({ label, name, variant = "bordered" }: IProps) => {
	return (
		<Controller
			name={name}
			render={({ field: { value, ...fields } }) => (
				<DatePicker
					className="min-w-full sm:min-w-[225px]"
					variant={variant}
					label={label}
					{...fields}
				/>
			)}
		/>
	)
}

export default FXDatePicker
