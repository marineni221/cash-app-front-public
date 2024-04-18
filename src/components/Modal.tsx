import React from "react";
import { ReactNode } from "react";

export const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
}) => {
  return (
    <button
      onClick={onClose}
      className={`fixed text-start cursor-default inset-0 flex items-center justify-center transition-colors duration-200 overflow-y-scroll py-10 ${
        open ? "visible bg-black/50" : "invisible"
      } `}
    >
      <button
        onClick={(e) => e.stopPropagation()}
        className={`text-start cursor-default max-h-screen py-10 transition-all ${
          open
            ? "delay-100 translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0"
        }`}
      >
        {children}
      </button>
    </button>
  );
};
