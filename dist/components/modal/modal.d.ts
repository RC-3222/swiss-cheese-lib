import { ComponentProps } from "react";
export type ModalProps = Omit<ComponentProps<"dialog">, "open" | "onClose" | "ref"> & {
    /** Is modal open */
    open: boolean;
    /** Modal close handler */
    onClose: () => void;
    /** Use default content wrapper provided by modal */
    hasDefaultCotentWrapper?: false;
};
/** Custom modal component */
export declare const Modal: ({ open, children, onClose, hasDefaultCotentWrapper, ...props }: ModalProps) => import("react/jsx-runtime").JSX.Element;
