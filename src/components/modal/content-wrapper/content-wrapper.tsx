import React, { PropsWithChildren } from "react";

import CloseIcon from "./close-icon.svg";

import styles from "./content-wrapper.module.scss";

export type ModalProps = {
    onClose: () => void;
} & PropsWithChildren;

export const ContentWrapper = ({ onClose, children }: ModalProps) => (
    <div className={styles.content}>
        {children}
        <button aria-label={"close"} className={styles.closeButton} onClick={onClose}>
            <CloseIcon />
        </button>
    </div>
);
