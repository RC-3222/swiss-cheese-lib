import React, { ComponentPropsWithoutRef } from "react";

import Icon from "./checked-icon.svg";

import styles from "./checkbox.module.scss";

export type CheckboxProps = Omit<ComponentPropsWithoutRef<"input">, "onChange" | "checked"> & {
    /** Is checkbox checked */
    checked: boolean;
    /** Checkbox status change handler */
    onChange?: (checked: boolean) => void;
    /** Label for the checkbox */
    label?: string;
};

/** Custom checkbox component */
export const Checkbox = ({
    checked,
    onChange,
    disabled = false,
    label,
    ...props
}: CheckboxProps) => {
    const innerContent = (
        <>
            <input
                {...props}
                checked={checked}
                disabled={disabled}
                type={"checkbox"}
                className={styles.input}
                onChange={onChange ? (ev) => onChange(ev.target.checked) : undefined}
                tabIndex={disabled ? -1 : undefined}
            />
            <span className={styles.checkbox}>
                <Icon className={styles.icon} />
            </span>
        </>
    );

    return label ? (
        <label className={styles.container}>
            {innerContent}
            <span className={styles.label}>{label}</span>
        </label>
    ) : (
        <div className={styles.container}>{innerContent}</div>
    );
};
