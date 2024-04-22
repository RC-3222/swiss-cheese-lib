import React, { ComponentProps, ReactNode } from "react";

import styles from "./text-field.module.scss";
import classNames from "classnames";

export type TextFieldProps = Omit<ComponentProps<"input">, "value" | "onChange"> & {
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
export const TextField = ({
    label,
    disabled,
    error,
    variant = "standart",
    leftIcon,
    rightIcon,
    value,
    onChange,
    ...props
}: TextFieldProps) => {
    const containerClassName = classNames({
        [styles.container]: true,
        [styles.error]: error,
        [styles.disabled]: disabled,
        [props.className as string]: !!props.className,
    });

    const textFieldClassName = classNames({
        [styles.textField]: true,
        [styles[variant]]: true,
    });

    return (
        <div className={containerClassName}>
            <label className={textFieldClassName}>
                {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
                <input
                    {...props}
                    value={value}
                    onChange={onChange ? (ev) => onChange(ev.target.value) : undefined}
                    disabled={disabled}
                    placeholder={props.placeholder ?? ""}
                    className={styles.input}
                />
                <span className={styles.label}>{label}</span>
                {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
            </label>
            <span className={styles.errorText}>{error}</span>
        </div>
    );
};
