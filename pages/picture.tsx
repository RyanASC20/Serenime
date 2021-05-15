import PicturePage from '../components/Layouts/PicturePage';
import PowerPicture from "../components/modules/PowerPicture";
import PageHeading from '../components/elements/PageHeading';

const Picture: React.FC = () => {
    return (
        <PicturePage title="Picture">
            <div>
                <PageHeading title="Picture" />
                <PowerPicture />
            </div>
        </PicturePage>
    )
}

export default Picture;