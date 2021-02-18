import { useEffect, useState } from "react";
import { useUser } from "../hooks/useUser";

interface P {
    date: string;
}

const DataEntries: React.FC<P> = ({ date }) => {
    console.log("RERENDER")
    const { userDataRef } = useUser();
    const [ contents, setContents ] = useState<string[]>([]);
    const [ stressLevels, setStressLevels ] = useState<number[]>([]);
    // console.log("RERENDERED")

    try {
        useEffect(() => {
            const fetchData = async () => {
                // console.log("FETCHING")
                const snapshot = await userDataRef.doc(date).get();
                const data = snapshot.data()
                console.log(data);
                try {
                    setContents(data.contents);
                    setStressLevels(data.stressLevel);
                } catch(err) {
                    console.log(err);
                    setContents([]);
                    setStressLevels([]);
                }
            };
            fetchData();
        }, [date, userDataRef])
        // console.log(contents, stressLevels)

        const entryItems: JSX.Element[] | null = contents.map(
            (content, idx) => {
                return (
                    <p key={idx}>
                        {content} {stressLevels[idx]}
                    </p>
                );
            }
        );

        return (
            <div>
                DATA:
                {entryItems}
            </div>
        );
    } catch(err) {
        console.log(err);
        return <></>
    }
};

export default DataEntries;
