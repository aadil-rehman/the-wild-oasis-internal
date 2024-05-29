import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSetting } from "./useUpdateSetting";

function UpdateSettingsForm() {
	const { updateSetting, isUpdating } = useUpdateSetting();

	const {
		settings: {
			minBookingLength,
			maxBookingLength,
			maxGuestPerBooking,
			breakfastPrize,
		} = {},
		isLoading,
	} = useSettings();

	if (isLoading) return <Spinner />;

	function handleUpdate(e, field) {
		const { value } = e.target;

		if (!value) return;
		const data = updateSetting({ [field]: value });
		console.log(data);
	}

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="min-nights"
					defaultValue={minBookingLength}
					disabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "minBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="max-nights"
					defaultValue={maxBookingLength}
					isabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "maxBookingLength")}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="max-guests"
					defaultValue={maxGuestPerBooking}
					isabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "maxGuestPerBooking")}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfast-prdefaultValue={}ice"
					defaultValue={breakfastPrize}
					isabled={isUpdating}
					onBlur={(e) => handleUpdate(e, "breakfastPrize")}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
