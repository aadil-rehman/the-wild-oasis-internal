import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function createEditCabin(newCabin) {
	//https://gzgotsfnpkhaaglhvzgx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);

	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	//1. Create a cabin
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }])
		.select()
		.single();

	console.log(data);
	if (error) {
		console.error(error);
		throw new Error("Cabins could not be created");
	}

	// 2. Upload image

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	// 3. Deleting the cabin if there was an error in uploading image
	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data[0].id);

		console.error(storageError);
		throw new Error(
			"Cabin image could not be uploaded and cabin was not created"
		);
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);
		throw new Error("Cabins could not be deleted");
	}

	return data;
}

// https://gzgotsfnpkhaaglhvzgx.supabase.co/storage/v1/object/public/cabin-images/0.03213251951509566-cabin-003.jpg
// https://gzgotsfnpkhaaglhvzgx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
