import type { Meta, StoryObj } from "@storybook/react";
import { TextField, TextFieldProps } from "./text-field";
import { useArgs } from "@storybook/preview-api";

const meta = {
    title: "Library/TextField",
    component: TextField,
    decorators: [
        (Story) => (
            <div
                style={{
                    width: "400px",
                    height: "400px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "white",
                }}
            >
                <Story />
            </div>
        ),
    ],
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        disabled: {
            description: "Is input disabled",
            control: {
                type: "boolean",
            },
        },
        leftIcon: {
            control: {
                type: "text",
            },
        },
        rightIcon: {
            control: {
                type: "text",
            },
        },
    },
    args: {
        value: "",
    },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "text",
    },
    render: (args) => {
        const [storyArgs, updateStoryArgs] = useArgs<TextFieldProps>();

        return (
            <TextField
                {...args}
                value={storyArgs.value}
                onChange={(value) => updateStoryArgs({ value })}
            />
        );
    },
};
