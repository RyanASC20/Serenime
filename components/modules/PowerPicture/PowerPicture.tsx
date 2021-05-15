import { useState, useEffect } from "react";
import { useCollection, useDocumentData } from "react-firebase-hooks/firestore";

import { usePictureCollectionRef } from "../../../utils/firestoreHooks";
import Gallery from "./Gallery";
import { AddPictureForm } from "../../modules/Forms/AddPicture";
import { PictureInterface } from '../../../Types/';


const PowerPicture: React.FC = () => {
    const allPicturesRef = usePictureCollectionRef();
    const [value, loading, error] = useCollection(allPicturesRef);
    const [pictures, setPictures] = useState<PictureInterface[] | null>(null);

    useEffect(() => {
        if (value) {
            let tmpPictures: PictureInterface[] = [];
            value.forEach(doc => {
                const data = doc.data();
                data.imgId = doc.id;
                tmpPictures.push(data as PictureInterface);
            });
            setPictures(tmpPictures);
        }
    }, [value])

    return (
        <>
            { pictures ? <div>
                <AddPictureForm currentPictures={ pictures } />
                <Gallery currentPictures={ pictures }/>
            </div> : <AddPictureForm currentPictures={[]} />
            }
        </>
    )
}

export default PowerPicture;