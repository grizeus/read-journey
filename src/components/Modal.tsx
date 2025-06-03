import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import sprite from "../assets/sprite.svg";
import clsx from "clsx";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  className?: string;
}

const Modal = ({ children, onClose, className }: ModalProps) => {
  const modalRoot = document.querySelector("#modal-root");
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent<HTMLElement>) => {
    if (e.target === backdropRef.current) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return createPortal(
    <div
      ref={backdropRef}
      onClick={handleClickOutside}
      className={clsx(
        "bg-midnight-black/60 fixed inset-0 transition-opacity duration-300",
        className
      )}>
      <div className="bg-charcoal-black border-tarnished/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl border p-4">
        <button
          type="button"
          onClick={onClose}
          className="group absolute top-4 right-4 flex size-8 items-center justify-center bg-transparent focus:outline-none">
          <svg
            className="stroke-ivory group-hover:stroke-tarnished transition-colors duration-300 ease-in-out"
            width={16}
            height={16}>
            <use href={`${sprite}#icon-close`}></use>
          </svg>
        </button>
        {children}
      </div>
    </div>,
    modalRoot || document.body
  );
};

export default Modal;
