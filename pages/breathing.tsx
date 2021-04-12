import { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import Head from "next/head";

import Page from "../components/Layouts/Page";
import PageHeading from "../components/elements/PageHeading";
import BreathingForm from "../components/modules/Forms/BreathingSelection/BreathingForm";
import CountdownTimer from "../components/modules/CountdownTimer";
import breathingExercises from "../public/static/breathingExercises.json";
import { useUser } from "../context/useUser";
import { useRouter } from "next/router";

interface SelectionData {
    duration: number | null;
    type: string;
}

interface methodData {
    breathIntervals: number[];
    instructions: string[];
}

const Breathing: React.FC = () => {
    const { uid } = useUser();
    const [selection, setSelection] = useState<SelectionData | null>({
        duration: null,
        type: "Energy",
    });
    const [selectedMethod, setSelectedMethod] = useState<methodData | null>(
        null
    );
    const router = useRouter();

    useEffect(() => {
        if (!uid) {
            router.push("/login");
        }
    }, []);

    useEffect(() => {
        if (selection) {
            setSelectedMethod(breathingExercises[selection.type]);
        }
    }, [selection]);

    return (
        <>
            {uid && (
                <Page title="Breathing">
                    <div className="mb-4 md:w-1/2">
                        <PageHeading title="Breathing Exercises" />
                        {selectedMethod && (
                            <CountdownTimer
                                duration={selection.duration * 60}
                                breathingMethod={selectedMethod.breathIntervals}
                            />
                        )}
                    </div>
                    <div className="md:w-2/5">
                        <BreathingForm setSelection={setSelection} />

                        {selectedMethod && (
                            <div className="mt-5 p-3 rounded-md bg-white">
                                <Fade bottom duration={300}>
                                    <h1 className="text-lg text-highlight-secondary tracking-wide">
                                        Directions:
                                    </h1>
                                    <ul className="text-sm">
                                        {selectedMethod &&
                                            selectedMethod.instructions.map(
                                                (instruction, idx) => {
                                                    return (
                                                        <li key={idx}>
                                                            {instruction}
                                                        </li>
                                                    );
                                                }
                                            )}
                                    </ul>
                                </Fade>
                            </div>
                        )}
                    </div>
                </Page>
            )}
        </>
    );
};

export default Breathing;
