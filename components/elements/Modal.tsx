import React from 'react';

interface ModalProps {
    close: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const Modal: React.FC<ModalProps> = ({ children, close }) => {
    return (
        <>
            <div className="fixed flex justify-center items-center z-50 top-0 left-0 w-screen h-screen bg-black opacity-75">
                
            </div>
            <div className="absolute z-50 w-full md:w-2/3 flex flex-col rounded-lg p-2 md:p-5 bg-base">
                <div className="cursor-pointer" onClick={close}>X</div>
                {children}
            </div>
            
        </>
    )
}

export default Modal;