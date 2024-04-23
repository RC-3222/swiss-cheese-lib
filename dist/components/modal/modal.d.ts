import { ComponentProps } from "react";
export type ModalProps = Omit<ComponentProps<"dialog">, "open" | "onClose" | "ref"> & {
    /** Is modal open */
    open: boolean;
    /** Modal close handler */
    onClose: () => void;
    /** Use default content wrapper provided by modal */
    hasDefaultContentWrapper?: false;
};
/** Custom modal component */
export declare const Modal: ({ open, children, onClose, hasDefaultContentWrapper, ...props }: ModalProps) => import("react/jsx-runtime").JSX.Element;
