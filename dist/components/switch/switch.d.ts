import { ComponentPropsWithoutRef } from "react";
export type SwitchProps = ComponentPropsWithoutRef<"input"> & {
    /** Switch status change handler */
    onChange?: (checked: boolean) => void;
    /** Switch status variable */
    checked: boolean;
    /** label */
    label?: string;
};
/** Custom switch component */
export declare const Switch: ({ checked, onChange, disabled, label, ...props }: SwitchProps) => import("react/jsx-runtime").JSX.Element;
