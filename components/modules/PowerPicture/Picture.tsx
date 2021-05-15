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
                <div className="absolute transition duration-200 flex justify-center items-center h-full m-1 md:w-96 z-49 opacity-0 font-lg text-white cursor-pointer hover:bg-black hover:opacity-50" onClick={() => { setClicked(!clicked) }}>More info</div>
                <img src={src} className="max-h-50 md:w-96 m-1"></img>
            </div>
            { clicked &&
                <Modal close={() => { setClicked(false) }}>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <img src={src} className="max-h-50 md:w-96 rounded-md"></img>
                        <div className="w-full ml-5">
                            <div className="overflow-auto max-h-52">
                                {observations.map((observation, idx) => {
                                    return <div key={idx} className={`flex justify-between my-2 p-2 ${idx % 2 == 0 && "bg-gray-200"}`}>{observation}<span onClick={() => { deleteObservation(idx) }}>{ deleteIconElement }</span></div>
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