"use client"
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

	const handleNavigation = (pathName: string) => {
		router.push(pathName)
	}

	return (
		<>
			<Dropdown>
				<DropdownTrigger className="cursor-pointer">
					<Avatar name="Joe" />
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
					<DropdownItem className="text-danger" color="danger">
						Log Out
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</>
	)
}

export default NavbarDropdown
