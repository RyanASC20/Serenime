import PicturePage from '../components/Layouts/PicturePage';
import PowerPicture from "../components/modules/PowerPicture";
import PageHeading from '../components/elements/PageHeading';
import Tooltip from '../components/elements/Tooltip';

const Picture: React.FC = () => {
    return (
        <PicturePage title="Picture">
            <div>
                <PageHeading title="Picture" />
                <Tooltip title="Power Pictures">
                    Choose a picture that represents your goals!
                    Then, try to make as many observations about it as possible? What about it speaks to you?
                    Get the image URL by going searching for images, right clicking, and selecting <span className="font-bold">"Copy image link"</span>
                </Tooltip>
                <PowerPicture />
            </div>
        </PicturePage>
    )
}

export default Picture;