import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateCabin } from "./useCreateCabin";
import { useEditCabin } from "./useEditCabin";

function CreateCabinForm({ cabinToEdit = {} }) {
	//create cabin mutation
	const { createCabin, isCreating } = useCreateCabin();

	//edit cabin mutation
	const { editCabin, isEditing } = useEditCabin();

	const isWorking = isCreating || isEditing;

	const { id: editId, ...editValues } = cabinToEdit;
	const isEditSession = Boolean(editId);

	const { register, handleSubmit, reset, getValues, formState } = useForm({
		defaultValues: isEditSession ? editValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		const image = typeof data.image === "string" ? data.image : data.image[0];

		if (isEditSession)
			editCabin(
				{ newCabindata: { ...data, image }, id: editId },
				{
					onSuccess: (data) => reset(),
				}
			);
		else
			createCabin(
				{ ...data, image: image },
				{
					onSuccess: (data) => reset(),
				}
			);
		console.log(data);
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)}>
			<FormRow label="Cabin name" error={errors?.name?.message} id="name">
				<Input
					type="text"
					id="name"
					disabled={isWorking}
					{...register("name", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow
				label="Maximum capacity"
				error={errors?.maxCapacity?.message}
				id="maxCapacity"
			>
				<Input
					type="number"
					id="maxCapacity"
					disabled={isWorking}
					{...register("maxCapacity", {
						required: "This field is required",
						min: {
							value: 1,
							message: "Capacity should be at least 1",
						},
					})}
				/>
			</FormRow>

			<FormRow
				label="Regular price"
				error={errors?.regularPrice?.message}
				id="regularPrice"
			>
				<Input
					type="number"
					id="regularPrice"
					disabled={isWorking}
					{...register("regularPrice", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Discount" error={errors?.discount?.message} id="discount">
				<Input
					type="number"
					id="discount"
					disabled={isWorking}
					defaultValue={0}
					{...register("discount", {
						required: "This field is required",
						validate: (value) =>
							Number(value) <= Number(getValues().regularPrice) ||
							"Discount should be less than regular Price",
					})}
				/>
			</FormRow>

			<FormRow
				label="Description for website"
				error={errors?.description?.message}
				id="description"
			>
				<Textarea
					type="number"
					id="description"
					disabled={isWorking}
					defaultValue=""
					{...register("description", { required: "This field is required" })}
				/>
			</FormRow>

			<FormRow label="Cabin photo" id="image">
				<FileInput
					id="image"
					disabled={isWorking}
					accept="image/*"
					type="file"
					{...register("image", {
						required: isEditSession ? false : "This field is required",
					})}
				/>
			</FormRow>

			<FormRow>
				{/* type is an HTML attribute! */}
				<Button variation="secondary" type="reset">
					Cancel
				</Button>
				<Button disabled={isWorking}>
					{isEditSession ? "Edit cabin" : "Create new cabin"}
				</Button>
			</FormRow>
		</Form>
	);
}

export default CreateCabinForm;
