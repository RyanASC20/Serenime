import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'


interface ModalProps {
    completelyClose: () => void;
    title?: string;
    closingMessage?: string;
}

const Modal: React.FC<ModalProps> = ({ children, title, closingMessage, completelyClose }) => {
  let [isOpen, setIsOpen] = useState(true)

  function closeModal() {
    setIsOpen(false)
    completelyClose();
  }

//   function openModal() {
//     setIsOpen(true)
//   }

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
            Open Dialogue
        </button>
      </div> */}

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
                <Dialog.Overlay className="fixed inset-0 bg-gray-500 opacity-70" /> 
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-base shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                    { title }
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    { children }
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="transition duration-200 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-highlight-secondary border border-transparent rounded-md hover:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    { closingMessage ? closingMessage : "Got it, thanks!" }
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default Modal;