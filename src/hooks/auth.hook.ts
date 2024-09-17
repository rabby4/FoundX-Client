import { useMutation } from "@tanstack/react-query"
import { registerUser } from "../services/authServices"
import { FieldValues } from "react-hook-form"
import { toast } from "sonner"

export const useRegistrations = () => {
	return useMutation<any, Error, FieldValues>({
		mutationKey: ["USER_REGISTER"],
		mutationFn: async (userData) => await registerUser(userData),
		onSuccess: () => {
			toast.success(`user registration success!`)
		},
		onError: (error) => toast.error(error.message),
	})
}
