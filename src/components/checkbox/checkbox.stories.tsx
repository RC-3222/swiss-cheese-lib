import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, CheckboxProps } from "./checkbox";
import { useArgs } from "@storybook/preview-api";

const meta = {
    title: "Library/Checkbox",
    component: Checkbox,
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
    },
    args: {
        label: "Check",
        checked: false,
        onChange: () => {},
    },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [storyArgs, updateStoryArgs] = useArgs<CheckboxProps>();

        return (
            <Checkbox
                {...args}
                checked={storyArgs.checked}
                onChange={(checked) => updateStoryArgs({ checked })}
            />
        );
    },
};
