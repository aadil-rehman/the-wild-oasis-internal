import { useQuery } from "@tanstack/react-query";
import { getAllBookings } from "../../services/apiBookings";

export function useBookings() {
	const {
		data: bookings,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["bookings"],
		queryFn: getAllBookings,
	});

	return { isLoading, error, bookings };
}
