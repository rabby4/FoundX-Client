import { Input } from "@nextui-org/input"
import { SearchIcon } from "../../icons"

const Landing = () => {
	return (
		<div className="h-[calc(100vh-70px)] bg-[url('/glass.jpg')] bg-cover bg-no-repeat bg-center">
			<div className="pt-32 max-w-xl flex-1 mx-auto">
				<form className="flex-1">
					<Input
						classNames={{ inputWrapper: "bg-default-100", input: "text-sm" }}
						placeholder="Search..."
						size="lg"
						startContent={
							<SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-100" />
						}
						type="text"
					/>
				</form>
			</div>
		</div>
	)
}

export default Landing
