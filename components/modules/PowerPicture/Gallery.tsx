import { useEffect } from "react";
import { PictureInterface } from "../../../Types";
import PictureElement from "./Picture";

interface GalleryProps {
    currentPictures: PictureInterface[];
}

const Gallery: React.FC<GalleryProps> = ({ currentPictures }) => {

    return (
        <div className="h-screen">
            <div className="flex flex-col flex-wrap h-screen">
                {currentPictures.map((picture, idx) => {
                    return <PictureElement key={idx} src={picture.imgUrl} observations={picture.observations} imgId={ picture.imgId }/>
                })}
            </div>
        </div>
    )
}

export default Gallery;