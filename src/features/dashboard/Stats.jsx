import {
	HiOutlineBriefcase,
	HiOutlineCalendarDays,
	HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

function Stats({ bookings, confirmedStays, numDays, cabinsCount }) {
	//1.
	const numBookings = bookings.length;

	//2.
	const sales = bookings.reduce((acc, curr) => curr.totalPrice + acc, 0);

	//3.
	const checkins = confirmedStays.length;

	//4. occupation rate = num checked in nights / all available nights
	const occupation =
		confirmedStays.reduce((acc, curr) => acc + curr.numNights, 0) /
		(numDays * cabinsCount);

	return (
		<>
			<Stat
				title="Bookings"
				icon={<HiOutlineBriefcase />}
				color="blue"
				value={numBookings}
			/>
			<Stat
				title="Sales"
				icon={<HiOutlineBriefcase />}
				color="green"
				value={formatCurrency(sales)}
			/>
			<Stat
				title="Check ins"
				icon={<HiOutlineCalendarDays />}
				color="indigo"
				value={checkins}
			/>
			<Stat
				title="Occupancy rate"
				icon={<HiOutlineChartBar />}
				color="yellow"
				value={Math.round(occupation * 100) + "%"}
			/>
		</>
	);
}

export default Stats;
