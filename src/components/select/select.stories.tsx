import type { Meta, StoryObj } from "@storybook/react";
import { Select, SelectProps } from "./select";
import { useArgs } from "@storybook/preview-api";

const meta = {
    title: "Library/Select",
    component: Select,
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
        value: {
            control: "select",
            options: ["option1", "option2", "option3", ""],
        },
    },
    args: {
        onChange: () => {},
        onToggle: () => {},
        options: [
            { title: "option1", value: "option1" },
            { title: "option2", value: "option2" },
            { title: "option3", value: "option3" },
        ],
    },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        label: "test",
        value: "",
        open: false,
    },
    render: (args) => {
        const [storyArgs, updateStoryArgs] = useArgs<SelectProps>();

        return (
            <Select
                {...args}
                value={storyArgs.value}
                onChange={(value) => updateStoryArgs({ value })}
                open={storyArgs.open}
                onToggle={(open) => updateStoryArgs({ open })}
            />
        );
    },
};
