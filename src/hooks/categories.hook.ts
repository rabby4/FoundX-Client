import { useQuery } from "@tanstack/react-query"
import { getCategories } from "../services/categories"

export const useGetCategories = () => {
	return useQuery({
		queryKey: ["CATEGORIES"],
		queryFn: async () => await getCategories(),
	})
}
