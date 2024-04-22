import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useState } from "react";
import { Modal } from "./";
import { Button } from "../button";

const getModal = () => screen.getByTestId("modal");

const getContent = () => screen.getByTestId("content");

const ModalWithWrapper = () => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Button data-testid='openButton' onClick={() => setOpen(true)}>
                {"open"}
            </Button>

            <Modal open={open} onClose={() => setOpen(false)}>
                <div>
                    <Button data-testid='button1' onClick={() => {}}>
                        {"button 1"}
                    </Button>
                    <Button data-testid='button2' onClick={() => {}}>
                        {"button 2"}
                    </Button>
                </div>
                <Button onClick={() => {}}>{"button 3"}</Button>
            </Modal>
        </>
    );
};

describe("Modal", () => {
    it("should render without errors", () => {
        render(<Modal open={true} onClose={() => {}} />);

        expect(getModal()).toBeInTheDocument();
    });

    it("should be closed", () => {
        render(<Modal open={false} onClose={() => {}} />);

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should have provided content", () => {
        render(
            <Modal open={true} onClose={() => {}}>
                <p>{"some content"}</p>
            </Modal>,
        );

        expect(screen.getByText("some content")).toBeInTheDocument();
    });

    it("should call onClose after click on background", async () => {
        const onClose = jest.fn();

        render(
            <>
                <p>{"some content"}</p>
                <Modal open={true} onClose={onClose}>
                    <p>{"inner content"}</p>
                </Modal>
            </>,
        );

        await userEvent.click(screen.getByText("inner content"));

        expect(onClose).not.toHaveBeenCalled();

        await userEvent.click(getContent());
        expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should call onClose after pressing Escape", async () => {
        const onClose = jest.fn();

        render(
            <Modal open={true} onClose={onClose}>
                <p>{"some content"}</p>
            </Modal>,
        );

        await userEvent.keyboard("[Escape]");

        expect(onClose).toHaveBeenCalledTimes(1);
    });
});

describe("Modal with wrapper", () => {
    const getOpenButton = () => screen.getByTestId("openButton");
    const getButton1 = () => screen.getByTestId("button1");
    const getButton2 = () => screen.getByTestId("button2");

    it("should open modal", async () => {
        render(<ModalWithWrapper />);
        await userEvent.click(getOpenButton());

        expect(getModal()).toBeInTheDocument();
    });

    it("should move focus to modal", async () => {
        render(<ModalWithWrapper />);
        await userEvent.click(getOpenButton());

        await userEvent.tab();
        await userEvent.tab();

        expect(getButton2()).toHaveFocus();
    });

    it("should return focus to toggle button", async () => {
        render(<ModalWithWrapper />);
        await userEvent.click(getOpenButton());

        await userEvent.tab();
        await userEvent.tab();
        await userEvent.keyboard("[Escape]");

        expect(getOpenButton()).toHaveFocus();
    });

    it("should close modal on close button click", async () => {
        render(<ModalWithWrapper />);

        await userEvent.click(getOpenButton());

        await userEvent.tab({ shift: true });

        expect(getModal()).toBeInTheDocument();

        await userEvent.keyboard("[Space]");

        expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });

    it("should keep focus inside modal", async () => {
        render(<ModalWithWrapper />);

        await userEvent.click(getOpenButton());

        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();
        await userEvent.tab();

        expect(getButton1()).toHaveFocus();

        await userEvent.tab({ shift: true });
        await userEvent.tab({ shift: true });
        await userEvent.tab({ shift: true });
        await userEvent.tab({ shift: true });

        expect(getButton1()).toHaveFocus();
    });
});
