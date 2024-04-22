import React, { KeyboardEvent, MouseEventHandler, useLayoutEffect, useRef, useState } from "react";
import { TextField } from "../text-field";
import { createPortal } from "react-dom";
import { Options, Option } from "./options";
import styles from "./select.module.scss";
import classNames from "classnames";

import Icon from "./toggle-icon.svg";

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
export const Select = ({
    open,
    onToggle,
    value,
    onChange,
    options,
    variant,
    label,
    disabled,
}: SelectProps) => {
    const [userSelection, setUserSelection] = useState(-1);

    const [optionsStyle, setOptionsStyle] = useState<Record<string, string>>({});

    const container = useRef<HTMLDivElement | null>(null);
    const optionsContainer = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (!open || disabled || !optionsContainer.current || !container.current) return;

        if (open) {
            document.body.classList.add(styles.noScroll);
        }

        const containerRect = container.current.getBoundingClientRect();

        setOptionsStyle({
            "--top": containerRect.bottom + "px",
            "--left": containerRect.left + "px",
            "--width": containerRect.width + "px",
        });

        return () => document.body.classList.remove(styles.noScroll);
    }, [open, disabled]);

    const className = classNames(styles.container, {
        [styles.open]: open,
        [styles.disabled]: disabled,
    });

    const handleClick: MouseEventHandler = () => {
        onToggle(!open);
    };

    const handleSelect = (value: string | number | null) => {
        onChange(value);

        onToggle(false);
    };

    const handleBlur = () => {
        onToggle(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
        e.stopPropagation();

        if ((e.key === " " || e.key === "Enter") && !open) {
            onToggle(true);
            return;
        }

        if (e.key === "ArrowDown") {
            const newSelection = userSelection < options.length - 1 ? userSelection + 1 : 0;
            setUserSelection(newSelection);
        }

        if (e.key === "ArrowUp") {
            const newSelection = userSelection > 0 ? userSelection - 1 : options.length - 1;
            setUserSelection(newSelection);
        }

        if (e.key === "Enter") {
            onChange(userSelection > -1 ? options[userSelection].value : null);
            onToggle(false);
        }

        if (e.key === "Escape") {
            onToggle(false);
        }
    };

    return (
        <>
            <div
                ref={container}
                className={className}
                onClick={handleClick}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
            >
                <TextField
                    variant={variant}
                    label={label as string}
                    value={
                        value === null
                            ? ""
                            : options.find((item) => item.value === value)?.title || ""
                    }
                    disabled={disabled}
                    rightIcon={<Icon onClick={(e) => e.preventDefault()} className={styles.icon} />}
                    role='combobox'
                    readOnly
                />
            </div>

            {!disabled &&
                open &&
                createPortal(
                    <Options
                        style={optionsStyle}
                        options={options}
                        selectedValue={value}
                        ref={optionsContainer}
                        onSelect={handleSelect}
                        onClose={() => onToggle(false)}
                        userSelection={userSelection}
                    />,
                    document.body,
                )}
        </>
    );
};
