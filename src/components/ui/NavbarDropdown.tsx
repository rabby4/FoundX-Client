"use client"
import { useUser } from "@/src/context/user.provider"
import { logOut } from "@/src/services/authServices"
import { Avatar } from "@nextui-org/avatar"
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger,
} from "@nextui-org/dropdown"
import { useRouter } from "next/navigation"

const NavbarDropdown = () => {
	const router = useRouter()
	const { user, setIsLoading: userLoading } = useUser()

	const handleNavigation = (pathName: string) => {
		router.push(pathName)
	}

	const handleLogout = () => {
		logOut()
		router.push("/")
		userLoading(true)
	}

	return (
		<>
			<Dropdown>
				<DropdownTrigger className="cursor-pointer">
					<Avatar src={user?.profilePhoto} />
				</DropdownTrigger>
				<DropdownMenu aria-label="Static Actions">
					<DropdownItem onClick={() => handleNavigation("/profile")}>
						Profile
					</DropdownItem>
					<DropdownItem
						onClick={() => handleNavigation("/profile/create-post")}
					>
						Create Post
					</DropdownItem>
					<DropdownItem
						onClick={() => handleNavigation("/profile/claim-requests")}
					>
						Claim Requests
					</DropdownItem>
					<DropdownItem onClick={() => handleNavigation("/profile/settings")}>
						Settings
					</DropdownItem>
					<DropdownItem
						onClick={handleLogout}
						className="text-danger"
						color="danger"
					>
						Log Out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</>
	)
}

export default NavbarDropdown
