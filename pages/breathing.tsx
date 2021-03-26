import { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import Head from "next/head";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BreathingForm from "../components/Input/Breathing/BreathingForm";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";
import breathingExercises from "../public/static/breathingExercises.json";
import { useUser } from "../hooks/useUser";
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
        type: 'Energy'
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
            <Head>
                <title>Serenime | Breathing</title>
            </Head>
            {uid && (
                <div className="bg-base">
                    <Navbar />
                    <div className="flex justify-center mx-2">
                        <div className="flex flex-col md:flex-row md:justify-around w-full lg:w-3/4 md:m-0">
                            <Sidebar />
                            <div className="flex flex-col-reverse md:mt-0 md:flex-row md:justify-between w-full md:h-screen md:border-l-2 md:border-r-2 md:border-gray-300 md:px-8 md:py-6 bg-secondary">
                                <div className="md:w-1/2">
                                    <h1 className="text-highlight font-bold">
                                        Breathing Exercises
                                    </h1>
                                    <BreathingForm
                                        setSelection={setSelection}
                                    />
                                    <h1 className="mt-5 text-lg text-highlight font-bold">
                                        Directions:{" "}
                                    </h1>

                                    {selectedMethod && (
                                        <Fade bottom duration={300}>
                                            <ul className="rounded-lg">
                                                {selectedMethod &&
                                                    selectedMethod.instructions.map(
                                                        (instruction, idx) => {
                                                            return (
                                                                <li key={idx}>
                                                                    {
                                                                        instruction
                                                                    }
                                                                </li>
                                                            );
                                                        }
                                                    )}
                                            </ul>
                                        </Fade>
                                    )}
                                </div>
                                <div className="mb-4 md:w-1/2">
                                    {selectedMethod && (
                                        <CountdownTimer
                                            duration={selection.duration * 60}
                                            breathingMethod={
                                                selectedMethod.breathIntervals
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Breathing;