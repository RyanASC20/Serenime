import { useEffect, useState } from "react";

import Modal from "../../elements/Modal";
import AddObservationForm from "../Forms/AddPicture/AddObservationForm";
import { deleteIconElement } from '../../../icons'
import { usePictureRef } from "../../../utils/firestoreHooks";

interface PictureProps {
    src: string;
    observations?: string[];
    imgId: string;
}

const Picture: React.FC<PictureProps> = ({ src, observations, imgId }) => {
    const [clicked, setClicked] = useState(false);
    const pictureRef = usePictureRef(imgId);

    const deleteObservation = (idx: number) => {
        console.log("deleted")
        pictureRef.set({
            observations: [...observations.slice(0, idx), ...observations.slice(idx + 1)]
        }, { merge: true});
    }

    return (
        <>
            <div className="relative">
                <div className="absolute transition duration-200 flex justify-center items-center w-full h-full m-1 md:w-96 z-49 opacity-0 font-lg text-white cursor-pointer hover:bg-black hover:opacity-50" onClick={() => { setClicked(!clicked) }}>Click for observations</div>
                <img src={src} className="w-96 m-1"></img>
            </div>
            { clicked &&
                <Modal title="What parts of the picture speak to you?" completelyClose={() => { setClicked(false) }} closingMessage="Done">
                    <div className="flex flex-col sm:max-w-sm md:max-w-lg">
                        <img src={src} className="rounded-md"></img>
                        <div className="w-full">
                            <div className="overflow-auto max-h-52 my-2 md:my-0">
                                {observations.map((observation, idx) => {
                                    return <div key={idx} className={`flex justify-between w-full my-2 p-2 rounded-md ${idx % 2 == 0 && "bg-gray-200"}`}><p>{observation}</p><span onClick={() => { deleteObservation(idx) }}>{ deleteIconElement }</span></div>
                                })}
                            </div>
                            <AddObservationForm imgId={imgId} currentData={observations} />
                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}

export default Picture;