import Page from "../components/Page";
import Tooltip from "../components/Tooltip";
import Routine from "../components/Routines/Routine";
import { useUser } from "../hooks/useUser";

const Routines: React.FC = () => {
    const { uid } = useUser();

    return (
        <>
            {uid && (
                <Page
                    title="Routines"
                    style="flex flex-col w-full h-screen md:border-l-2 md:border-r-2 md:border-gray-300 md:px-3 md:py-6 bg-secondary"
                >
                    <div>
                        <div className="flex items-center mb-4 p-3 rounded-lg ">
                            <h1 className="inline text-highlight font-bold">
                                Morning and Evening Routines
                            </h1>
                            <Tooltip>
                                <p>
                                    Here's a checklist of things you can do when
                                    you wake up or go before you sleep. As the
                                    deadline approaches, the item will turn from
                                    green (90 min), to orange (60 min), to
                                    yellow (30 min), and to red(less than 30
                                    min)
                                </p>
                                <p>
                                    Click on each item to toggle if you have
                                    completed them or not.
                                </p>
                            </Tooltip>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:justify-around">
                        <div className="w-full mb-8 md:mb-0 md:w-2/5">
                            <h1 className="text-2xl text-center mb-2">
                                Morning
                            </h1>
                            <Routine timePeriod="morning" />
                        </div>
                        <div className="w-full md:w-2/5">
                            <h1 className="text-2xl text-center mb-2">
                                Evening
                            </h1>
                            <Routine timePeriod="night" />
                        </div>
                    </div>
                </Page>
            )}
        </>
    );
};

export default Routines;
