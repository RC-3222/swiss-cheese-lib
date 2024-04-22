import React, {
    ComponentProps,
    KeyboardEventHandler,
    MouseEventHandler,
    useEffect,
    useRef,
} from "react";
import { createPortal } from "react-dom";

import styles from "./modal.module.scss";
import { ContentWrapper } from "./content-wrapper";

export type ModalProps = Omit<ComponentProps<"dialog">, "open" | "onClose" | "ref"> & {
    /** Is modal open */
    open: boolean;
    /** Modal close handler */
    onClose: () => void;
    /** Use default content wrapper provided by modal */
    hasDefaultCotentWrapper?: false;
};

/** Custom modal component */
export const Modal = ({
    open,
    children,
    onClose,
    hasDefaultCotentWrapper = false,
    ...props
}: ModalProps) => {
    const trigger = useRef<HTMLElement | null>(null);
    const initialFocus = useRef<HTMLDivElement | null>(null);
    const content = useRef<HTMLDivElement | null>(null);
    const closeButton = useRef<HTMLButtonElement | null>(null);

    useEffect(() => {
        if (open) {
            trigger.current = document.activeElement as HTMLElement;
            initialFocus.current?.focus();
            document.body.classList.add(styles.modalContainer);
        }

        return () => {
            document.body.classList.remove(styles.modalContainer);
            trigger.current?.focus();
            trigger.current = null;
        };
    }, [open]);

    if (!open) return <></>;

    const handleKeyDown: KeyboardEventHandler = (e) => {
        if (e.key === "Escape") {
            onClose();
        }
    };

    const handleBackdropClick: MouseEventHandler = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleCloseButtonClick: MouseEventHandler = () => {
        onClose();
    };

    const getFirstFocusable = () => {
        return content.current?.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )[0] as HTMLElement;
    };

    const moveFocusToStart: KeyboardEventHandler = (e) => {
        if (e.ctrlKey || e.altKey || e.shiftKey) return;

        if (e.key === "Tab") {
            e.preventDefault();
            getFirstFocusable().focus();
        }
    };

    const moveFocusToEnd: KeyboardEventHandler = (e) => {
        if (e.key !== "Escape") e.stopPropagation();

        if (
            document.activeElement !== initialFocus.current &&
            document.activeElement !== getFirstFocusable()
        ) {
            return;
        }

        if (e.ctrlKey || e.altKey) return;

        if (e.key === "Tab" && e.shiftKey) {
            e.preventDefault();
            closeButton.current?.focus();
        }
    };

    const modal = (
        <dialog
            {...props}
            open={open}
            data-testid='modal'
            className={styles.modal}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div ref={initialFocus} tabIndex={-1} aria-hidden onKeyDown={moveFocusToEnd} />
            <div
                ref={content}
                data-testid='content'
                className={styles.content}
                onKeyDown={moveFocusToEnd}
                onClick={handleBackdropClick}
            >
                {hasDefaultCotentWrapper ? (
                    <ContentWrapper onClose={onClose}>{children}</ContentWrapper>
                ) : (
                    children
                )}
            </div>
            <button
                ref={closeButton}
                aria-label={"close"}
                className={styles.closeButton}
                onClick={handleCloseButtonClick}
                onKeyDown={moveFocusToStart}
            />
        </dialog>
    );

    return createPortal(modal, document.body);
};
