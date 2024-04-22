import { Option } from "./options";
export type SelectProps = {
    /** Is combobox open*/
    open: boolean;
    /** Combobox toggle handler */
    onToggle: (open: boolean) => void;
    /** Currently selected value */
    value: string | number | null;
    /** Option change handler */
    onChange: (value: string | number | null) => void;
    /** Available options */
    options: Option[];
    /** Input style variants */
    variant?: "outlined" | "filled" | "standart";
    /** Input label */
    label?: string;
    /** Is input disabled */
    disabled?: boolean;
};
/** Custom Select component */
export declare const Select: ({ open, onToggle, value, onChange, options, variant, label, disabled, }: SelectProps) => import("react/jsx-runtime").JSX.Element;
