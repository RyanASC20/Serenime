import { entryData } from "./DataEntryForm";

interface P {
    nameKey: number;
    entry: string;
    timestamp: Date;
    stressLevel: number;
    register(): void;
    update(e, idx: number, type: string): void;
    remove(idx: number): void;
}

const Entry: React.FC<P> = ({
    nameKey,
    entry,
    timestamp,
    stressLevel,
    register,
    update,
    remove,
}) => {
    const datevalues: number[] = [
        timestamp.getFullYear(),
        timestamp.getMonth() + 1,
        timestamp.getDate(),
        timestamp.getHours(),
        timestamp.getMinutes(),
        timestamp.getSeconds(),
    ];

    const [y, m, d, h, min, s]: number[] = datevalues;

    return (
        <>
            <div className="mt-3 flex justify-between items-center">
                <div>
                    <p className="text-xs">
                        {`${h}:${min}:${s}`}
                    </p>
                    <input
                        type="number"
                        name={`stress-level-${nameKey}`}
                        className="w-full resize-none px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-gray-200 bg-white rounded text-sm shadow outline-none focus:outline-none focus:shadow-outline"
                        value={stressLevel}
                        onChange={(e) => {
                            update(e, nameKey, "stressLevel");
                        }}
                    ></input>
                </div>

                <button
                    type="button"
                    onClick={() => remove(nameKey)}
                    className=" inline cursor-pointer"
                >
                    X
                </button>
            </div>

            <div>
                <textarea
                    name={`entry-${nameKey}`}
                    className="resize-none mt-4 px-3 py-3 placeholder-gray-400 text-gray-700 relative bg-gray-200 bg-white rounded text-sm shadow outline-none w-full focus:outline-none focus:shadow-outline"
                    value={entry}
                    onChange={(e) => {
                        update(e, nameKey, "entry");
                    }}
                    ref={register}
                ></textarea>
            </div>
        </>
    );
};

export default Entry;
