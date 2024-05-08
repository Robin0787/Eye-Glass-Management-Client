/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface TConfirmModalProps {
  payload: any;
  openModal: boolean;
  setOpenModal: (payload: boolean) => void;
  modalHandler: (payload: any) => void;
  btnText?: string;
}

const ConfirmModal = ({
  payload,
  openModal,
  setOpenModal,
  modalHandler,
  btnText = "Delete",
}: TConfirmModalProps) => {
  return (
    <Transition appear show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => {
          setOpenModal(false);
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[350px] md:w-[480px]  transform overflow-hidden rounded-xl bg-primaryBg text-black py-8 md:py-16 text-left align-middle transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-3xl md:text-4xl font-medium text-center"
                >
                  {" "}
                  Are You Sure?
                </Dialog.Title>
                <div className="flex mt-8 gap-5 justify-center items-center">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-5 py-2 font-medium text-white ring-2 ring-transparent hover:bg-blue-500 hover:ring-blue-300 duration-300"
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-5 py-2 font-medium text-white ring-2 ring-transparent hover:bg-red-500 hover:ring-red-300 duration-300"
                    onClick={() => modalHandler(payload)}
                  >
                    {btnText}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmModal;
