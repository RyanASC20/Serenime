import { useForm } from "react-hook-form";
import { PictureInterface } from "../../../../Types";

import { useGalleryRef, usePictureCollectionRef } from "../../../../utils/firestoreHooks";
import Button from "../../../elements/Buttons/Button";

interface AddPictureFormProps {
    currentPictures: PictureInterface[]
}

const AddPictureForm: React.FC<AddPictureFormProps> = ({ currentPictures }) => {
    const { handleSubmit, register, reset } = useForm();
    const galleryRef = useGalleryRef();
    const pictureCollectionRef = usePictureCollectionRef();

    const onSubmit = (data) => {
        // galleryRef.set({
        //     pictures: [...currentPictures, data.imgUrl]
        // });
        pictureCollectionRef.add({
            imgUrl: data.imgUrl,
            observations: []
        });
        reset();
    }

    return (
        <form className="flex justify-between my-5" onSubmit={handleSubmit(onSubmit)}>
            <input 
                type="text" 
                autoComplete="off"
                placeholder="Enter the URL of the image"
                name="imgUrl" 
                className="w-full md:w-11/12 p-2 mr-3 border-b shadow-sm outline-none focus:border-highlight"
                ref={register({required: true})}>

            </input>
            <Button type="submit" text="+ Add"></Button>
        </form>
    )

}

export default AddPictureForm;