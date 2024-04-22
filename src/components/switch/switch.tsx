import React, { ComponentProps } from "react";

import styles from "./switch.module.scss";

export type SwitchProps = Omit<ComponentProps<"input">, "ref"> & {
    /** Switch status change handler */
    onChange?: (checked: boolean) => void;
    /** Switch status variable */
    checked: boolean;
    /** label */
    label?: string;
};

/** Custom switch component */
export const Switch = ({ checked, onChange, disabled = false, label, ...props }: SwitchProps) => {
    const innerContent = (
        <label>
            <input
                {...props}
                className={styles.privateInput}
                type={"checkbox"}
                role={"switch"}
                disabled={disabled}
                checked={checked}
                onChange={onChange ? (ev) => onChange(ev.target.checked) : undefined}
                tabIndex={disabled ? -1 : 0}
            />
            <span className={styles.switch}>
                <span></span>
            </span>
        </label>
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
