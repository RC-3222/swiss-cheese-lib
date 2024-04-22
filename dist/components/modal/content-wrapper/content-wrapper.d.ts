import { PropsWithChildren } from "react";
export type ModalProps = {
    onClose: () => void;
} & PropsWithChildren;
export declare const ContentWrapper: ({ onClose, children }: ModalProps) => import("react/jsx-runtime").JSX.Element;
