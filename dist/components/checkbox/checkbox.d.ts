import { ComponentProps } from "react";
export type CheckboxProps = Omit<ComponentProps<"input">, "onChange" | "checked" | "ref"> & {
    /** Is checkbox checked */
    checked: boolean;
    /** Checkbox status change handler */
    onChange?: (checked: boolean) => void;
    /** Label for the checkbox */
    label?: string;
};
/** Custom checkbox component */
export declare const Checkbox: ({ checked, onChange, disabled, label, ...props }: CheckboxProps) => import("react/jsx-runtime").JSX.Element;
