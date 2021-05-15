import { useState } from "react";

import Modal from "./Modal";

interface TooltipProps {
    title: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, title }) => {
    const [active, setActive] = useState(false);

    return (
        <>
            <p className="inline-flex justify-center items-center ml-3 w-5 h-5 rounded-full border border-gray-500 text-gray-500 text-sm cursor-pointer" onClick={() => { setActive(!active) }}>
                i
                {/* <div className={`transition duration-200 p-3 absolute ${active ? 'opacity-100' : 'opacity-0 pointer-events-none'} z-50 border border-gray-500 rounded-md bg-highlight-secondary text-sm text-white`}>
                    {children}
                </div> */}
            </p>
            { active && <Modal completelyClose={() => { setActive(false) }} title={title} >
                {children}
            </Modal>}

        </>
    )
}

export default Tooltip;