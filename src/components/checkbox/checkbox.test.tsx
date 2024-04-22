import { render, screen } from "@testing-library/react";
import { Checkbox } from "./";
import { userEvent } from "@testing-library/user-event";

const getCheckbox = () => screen.getByRole("checkbox");

describe("checkbox", () => {
    it("should render without errors", () => {
        render(<Checkbox label='chck' checked={false} onChange={() => {}} />);

        expect(getCheckbox()).toBeInTheDocument();
    });

    it("should have provided value", () => {
        render(<Checkbox label='chck' checked={true} onChange={() => {}} />);

        expect(getCheckbox()).toBeChecked();
    });

    it("should have provided label", () => {
        render(<Checkbox label={"some label"} checked={false} onChange={() => {}} />);

        expect(screen.getByText("some label")).toBeInTheDocument();
    });

    it("should be available for tab selection", async () => {
        render(<Checkbox label='chck' checked={false} onChange={() => {}} />);

        await userEvent.tab();

        expect(getCheckbox()).toHaveFocus();
    });

    it("should be disabled", () => {
        render(<Checkbox label='chck' disabled checked={true} onChange={() => {}} />);

        expect(getCheckbox()).toHaveAttribute("disabled");
    });

    it("should call onChange on user click", async () => {
        const onChange = jest.fn();

        render(<Checkbox label='chck' checked={false} onChange={onChange} />);

        await userEvent.click(getCheckbox());

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(true);
    });

    it("should call onChange after user click on label", async () => {
        const onChange = jest.fn();

        render(<Checkbox label={"some label"} checked={false} onChange={onChange} />);

        await userEvent.click(screen.getByText("some label"));

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("should call onChange on Space press", async () => {
        const onChange = jest.fn();

        render(<Checkbox label='chck' checked={true} onChange={onChange} />);

        await userEvent.tab();
        await userEvent.keyboard("[Space]");

        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange).toHaveBeenCalledWith(false);
    });

    it("should not call onChange if checkbox is disabled", async () => {
        const onChange = jest.fn();

        render(<Checkbox label='chck' disabled checked={false} onChange={onChange} />);

        await userEvent.click(getCheckbox());

        expect(onChange).not.toHaveBeenCalled();
    });

    it("should not be available for tab selection if checkbox is disabled", async () => {
        render(<Checkbox label='chck' disabled checked={false} onChange={() => {}} />);

        await userEvent.tab();

        expect(getCheckbox()).not.toHaveFocus();
    });
});
