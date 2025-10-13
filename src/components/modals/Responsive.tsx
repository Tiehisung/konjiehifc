"use client";

import { ReactNode } from "react";
import { BiX } from "react-icons/bi";

/**Mobile responsive modal. Falls to bottom in small devices */

export const ResponsiveModal = ({
  trigger = "Open modal",
  triggerStyles = "",
  children,
  modalId = "responsive-modal",className='_secondaryBg'
}: {
  children?: ReactNode;
  trigger?: ReactNode;
  triggerStyles?: string;
  modalId: string;
  className?:string
}) => {
  function handleOpenModal() {
    const modalEl = document.getElementById(modalId) as HTMLDialogElement;
    if (modalEl) modalEl.showModal();
  }
  return (
    <>
      <div
        className={`cursor-pointer ${triggerStyles}`}
        onClick={handleOpenModal}
      >
        {trigger}
      </div>
      <dialog
        id={modalId}
        className="modal modal-bottom sm:modal-middle cursor-auto"
      >
        <div className={`modal-box pt-10 relative ${className}`}>
          {children ?? <p className="py-4">ESC closes</p>}

          <div className="modal-action w-fit cursor-pointer p-1 text-2xl ">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className=" absolute top-1 right-4 h-8 w-8 p-1 text-error hover:text-error/50 flex items-center rounded-full border _borderColor ">
                <BiX size={24} />
              </button>
              <button className="h-8 w-fit py-1 px-2 text-error hover:text-error/90 text-sm flex items-center rounded-full border _borderColor hover:bg-error/10">
                <BiX size={24} /> Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};
