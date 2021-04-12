interface PageHeadingProps {
    title: string;
}

const PageHeading: React.FC<PageHeadingProps> = ({ title }) => {
    return (
        <h1 className="text-2xl inline tracking-wide text-gray-700">
            { title }
        </h1>
    );
}

export default PageHeading;