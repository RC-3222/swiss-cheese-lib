import { ComponentPropsWithoutRef, ReactNode } from "react";
export type TextFieldProps = Omit<ComponentPropsWithoutRef<"input">, "value" | "onChange"> & {
    /** Input label */
    value: string;
    /** Input change handler */
    onChange?: (value: string) => void;
    /** Input label */
    label: string;
    /** Input error */
    error?: string;
    /** Input variant */
    variant?: "outlined" | "standart" | "filled";
    /** Additional icon on the left */
    leftIcon?: ReactNode;
    /** Additional icon on the right */
    rightIcon?: ReactNode;
};
/** Custom Textfield component */
export declare const TextField: ({ label, disabled, error, variant, leftIcon, rightIcon, value, onChange, ...props }: TextFieldProps) => import("react/jsx-runtime").JSX.Element;
