import { ComponentPropsWithoutRef, ReactNode } from "react";
export type ButtonProps = ComponentPropsWithoutRef<"button"> & {
    /** Button variant */
    variant?: "text" | "contained" | "outlined";
    /** Button size */
    size?: "small" | "medium" | "large";
    /** Additional icon on the left */
    leftIcon?: ReactNode;
    /** Additional icon on the right */
    rightIcon?: ReactNode;
};
/** Custom button component */
export declare const Button: ({ variant, size, leftIcon, rightIcon, children, ...props }: ButtonProps) => import("react/jsx-runtime").JSX.Element;
