import { render, screen } from "@testing-library/react";
import { Button } from "./button";
import { userEvent } from "@testing-library/user-event";

const getButton = () => screen.getByRole("button") as HTMLButtonElement;

describe("Button", () => {
    it("should render without errors", () => {
        render(<Button onClick={jest.fn()}>{"button"}</Button>);

        expect(getButton()).toBeInTheDocument();
    });

    it("should have provided text", () => {
        render(<Button onClick={jest.fn()}>{"button"}</Button>);

        expect(getButton()).toHaveTextContent("button");
    });

    it("should call onClick after user click", async () => {
        const onClick = jest.fn();

        render(<Button onClick={onClick}>{"button"}</Button>);

        await userEvent.click(getButton());

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should call onClick on Enter and Space press", async () => {
        const onClick = jest.fn();

        render(<Button onClick={onClick}>{"button"}</Button>);

        await userEvent.tab();
        await userEvent.keyboard("[Enter]");
        await userEvent.keyboard("[Space]");

        expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("should be disabled", () => {
        render(
            <Button onClick={jest.fn()} disabled>
                {"button"}
            </Button>,
        );

        expect(getButton()).toHaveAttribute("disabled");
    });

    it("should not call onClick if button is disabled", async () => {
        const onClick = jest.fn();

        render(
            <Button onClick={onClick} disabled>
                {"button"}
            </Button>,
        );

        await userEvent.click(getButton());

        expect(onClick).not.toHaveBeenCalled();
    });

    it("should be available for tab selection", async () => {
        render(<Button onClick={jest.fn()}>{"button"}</Button>);

        await userEvent.tab();

        expect(getButton()).toHaveFocus();
    });

    it("should not be available for tab selection when disabled", async () => {
        render(
            <Button onClick={jest.fn()} disabled>
                {"button"}
            </Button>,
        );

        await userEvent.tab();

        expect(getButton()).not.toHaveFocus();
    });
});
