import { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import Head from "next/head";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import BreathingForm from "../components/Input/Breathing/BreathingForm";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";
import breathingExercises from "../public/static/breathingExercises.json";

interface SelectionData {
    duration: number | null;
    type: string;
}

interface methodData {
    breathIntervals: number[];
    instructions: string[];
}

const Breathing: React.FC = () => {
    const [selection, setSelection] = useState<SelectionData | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<methodData | null>(
        null
    );

    useEffect(() => {
        if (selection) {
            console.log(selection.duration);
            setSelectedMethod(breathingExercises[selection.type]);
        }
    }, [selection]);

    return (
        <>
            <Head>
                <title>Serenime | Breathing</title>
            </Head>
            <div className="bg-base">
                <Navbar />
                <div className="flex justify-center mx-2">
                    <div className="flex flex-col md:flex-row md:justify-around w-5/6 lg:w-2/3 md:m-0">
                        <Sidebar />
                        <div className="flex flex-col-reverse md:mt-0 md:flex-row md:justify-between w-full h-screen md:border-l-2 md:border-r-2 md:border-gray-300 md:px-8 md:py-6 bg-white">
                            <div className="md:w-1/2">
                                <h1 className="text-highlight text-lg font-bold mb-4">
                                    Breathing Exercises
                                </h1>
                                <BreathingForm setSelection={setSelection} />
                                <h1 className="mt-5 text-lg text-highlight font-bold">
                                    Directions:{" "}
                                </h1>

                                {selectedMethod && (
                                    <Fade bottom duration={300}>
                                        <ul className="bg-secondary rounded-lg">
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
        </>
    );
};

export default Breathing;

{
    /* <div className="flex flex-col md:flex-row m-5 md:m-0">
            <Sidebar />
            <div className="w-full md:m-5">
                <Navbar text="Breathing Exercises" />
                <div className="flex flex-col md:items-center">
                    <div className="md:w-1/3">
                    {selectedMethod && (
                        <CountdownTimer
                            duration={selection.duration * 10}
                            breathingMethod={selectedMethod.breathIntervals}
                        />
                    )}
                    <BreathingForm setSelection={setSelection} />
                    {selectedMethod && (
                        <ul className="mt-5 p-5 bg-secondary rounded-lg">
                            {selectedMethod &&
                                selectedMethod.instructions.map(
                                    (instruction, idx) => {
                                        return <li key={idx}>{instruction}</li>;
                                    }
                                )}
                        </ul>
                    )}
                    </div>
                </div>
            </div>
        </div> */
}
