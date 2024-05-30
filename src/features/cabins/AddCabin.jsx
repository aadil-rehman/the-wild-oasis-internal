import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

const AddCabin = () => {
	const [isOpenModel, setIsOpenModel] = useState(false);
	return (
		<div>
			<Button onClick={() => setIsOpenModel((show) => !show)}>
				Add a new Cabin
			</Button>
			{isOpenModel && (
				<Modal onClose={() => setIsOpenModel(false)}>
					<CreateCabinForm onCloseModal={() => setIsOpenModel(false)} />
				</Modal>
			)}
		</div>
	);
};

export default AddCabin;
