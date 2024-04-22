import React, { ComponentProps, ReactNode } from "react";

import classnames from "classnames";

import styles from "./button.module.scss";

export type ButtonProps = Omit<ComponentProps<"button">, "ref"> & {
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
export const Button = ({
    variant = "contained",
    size = "medium",
    leftIcon,
    rightIcon,
    children,
    ...props
}: ButtonProps) => {
    const buttonClassname = classnames(
        styles.button,
        styles[variant],
        styles[size],
        props.className,
    );

    return (
        <button {...props} className={buttonClassname}>
            {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
            <span className={styles.content}>{children}</span>
            {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </button>
    );
};
