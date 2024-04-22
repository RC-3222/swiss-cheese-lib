import React from "react";
export type Option = {
    value: number | string | null;
    title: string;
};
type OptionsProps = {
    style: Record<string, string>;
    options: Option[];
    onSelect: (value: string | number | null) => void;
    onClose: () => void;
    selectedValue: number | string | null;
    userSelection: number;
};
export declare const Options: React.ForwardRefExoticComponent<OptionsProps & React.RefAttributes<HTMLDivElement>>;
export {};
