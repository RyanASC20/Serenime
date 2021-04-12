import { useState, LegacyRef, useEffect } from "react";
import { timeIconElements, timeIconBg } from '../../../../icons';

interface P {
    register: (instance: HTMLInputElement, options: object) => LegacyRef<HTMLInputElement> | void;
}

const TimePeriodRadioGoup: React.FC<P> = ({ register }) => {
    const [clicked, setClicked] = useState<number | null>(null);

    return (
        <div className="flex justify-between my-4">
            {
                timeIconElements.map((icon: JSX.Element, idx: number) => {
                    return (
                        <div>
                            <input 
                                key={ idx }
                                type="radio"
                                name="timePeriod"
                                value={idx}
                                id={`time-period-${idx}`}
                                ref={(e) => register(e, {
                                    required: true
                                })}
                                className="w-0 h-0"
                            ></input>
                            <label htmlFor={`time-period-${idx}`} onClick={ () => { setClicked(idx) } } className={`transition duration-400 p-2 rounded-full shadow-double-sm cursor-pointer hover:shadow-inner ${clicked === idx ? `bg-${timeIconBg[idx]}` : 'bg-gray-400' }` }>{ icon }</label>
                        </div>
                    )
                })
            }
        </div>
    )
    
};

export default TimePeriodRadioGoup;


// return (
//     <div className="my-4 flex justify-around">
//         <div>
//             <input
//                 type="radio"
//                 name="timePeriod"
//                 id="time-period-0"
//                 value="0"
//                 ref={(e) =>
//                     register(e, {
//                         required: true,
//                     })
//                 }
//                 className="w-0 h-0"
//                 onClick={ () => { setClicked(0) } }
//             ></input>
//             <label htmlFor="time-period-0" className={`transition duration-400 p-2 rounded-full shadow-double-sm cursor-pointer  hover:shadow-inner ${clicked === 0 ? `bg-${timeIconBg[0]}` : 'bg-gray-400' }` }>{ timeIconElements[0] }</label>
//         </div>
//         <div>
//             <input
//                 type="radio"
//                 name="timePeriod"
//                 id="time-period-1"
//                 value="1"
//                 ref={(e) =>
//                     register(e, {
//                         required: true,
//                     })
//                 }
//                 className="w-0 h-0"
//                 onClick={ () => { setClicked(1) } }
//             ></input>
//             <label htmlFor="time-period-1" className={`transition duration-400 p-2 rounded-full shadow-double-sm cursor-pointer hover:shadow-inner ${clicked === 1 ? `bg-${timeIconBg[1]}` : 'bg-gray-400' }` }>{ timeIconElements[1] }</label>
//         </div>
//         <div>
//             <input
//                 type="radio"
//                 name="timePeriod"
//                 id="time-period-2"
//                 value="2"
//                 ref={(e) =>
//                     register(e, {
//                         required: true,
//                     })
//                 }
//                 className="w-0 h-0"
//                 onClick={ () => { setClicked(2) } }
//             ></input>
//             <label htmlFor="time-period-2" className={`transition duration-400 p-2 rounded-full shadow-double-sm cursor-pointer  hover:shadow-inner ${clicked === 2 ? `bg-${timeIconBg[2]}` : 'bg-gray-400' }` }>{ timeIconElements[2] }</label>
//         </div>
//         <div>
//             <input
//                 type="radio"
//                 name="timePeriod"
//                 id="time-period-3"
//                 value="3"
//                 ref={(e) =>
//                     register(e, {
//                         required: true,
//                     })
//                 }
//                 className="w-0 h-0"
//                 onClick={ () => { setClicked(3) } }
//             ></input>
//             <label htmlFor="time-period-3" className={`transition duration-400 p-2 rounded-full shadow-double-sm cursor-pointer  hover:shadow-inner ${clicked === 3 ? `bg-${timeIconBg[3]}` : 'bg-gray-400' }` }>{ timeIconElements[3] }</label>
//         </div>
//     </div>
// );