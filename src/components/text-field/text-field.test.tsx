import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { FC, useState } from "react";
import { TextField } from "./";

type WrapperProps = {
    label: string;
};

const TextFieldWrapper: FC<WrapperProps> = (props) => {
    const [value, setValue] = useState("");

    return <TextField {...props} value={value} onChange={(val) => setValue(val)} />;
};

const getInput = () => screen.getByRole("textbox");

describe("TextField", () => {
    it("should render without errors", () => {
        render(<TextField label='ff' onChange={() => {}} value={""} />);

        expect(getInput()).toBeInTheDocument();
    });

    it("should have provided value", () => {
        render(<TextField label='ff' value={"some value"} onChange={() => {}} />);

        expect(getInput()).toHaveValue("some value");
    });

    it("should have provided label", () => {
        render(<TextField value={""} onChange={() => {}} label={"some label"} />);

        expect(screen.getByText("some label")).toBeInTheDocument();
    });

    it("should call onChange on user input", async () => {
        const onChange = jest.fn();

        render(<TextField label='ff' value={""} onChange={onChange} />);

        await userEvent.click(getInput());
        await userEvent.keyboard("a");

        expect(onChange).toHaveBeenCalledTimes(1);
    });

    it("should be disabled", () => {
        render(<TextField label='ff' disabled value={""} onChange={() => {}} />);

        expect(getInput()).toHaveAttribute("disabled");
    });

    it("should not call onChange if text field is disabled", async () => {
        const onChange = jest.fn();

        render(<TextField label='ff' disabled value={""} onChange={onChange} />);

        await userEvent.click(getInput());
        await userEvent.keyboard("a");

        expect(onChange).not.toHaveBeenCalled();
    });

    it("should be read only", () => {
        render(<TextField label='ff' readOnly value={""} onChange={() => {}} />);

        expect(getInput()).toHaveAttribute("readOnly");
    });

    it("should not call onChange if text field is read only", async () => {
        const onChange = jest.fn();

        render(<TextField label='ff' readOnly value={""} onChange={onChange} />);

        await userEvent.click(getInput());
        await userEvent.keyboard("awefgsgdf");

        expect(onChange).not.toHaveBeenCalled();
    });
});

describe("TextFiled with wrapper", () => {
    it("should have printed value", async () => {
        render(<TextFieldWrapper label='sdd' />);

        await userEvent.tab();
        await userEvent.keyboard("abc");

        expect(getInput()).toHaveValue("abc");
    });
});
