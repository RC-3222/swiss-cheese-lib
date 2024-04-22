import type { Meta, StoryObj } from "@storybook/react";
import { Switch, SwitchProps } from "./switch";
import { useArgs } from "@storybook/preview-api";

const meta = {
    title: "Library/Switch",
    component: Switch,
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
        checked: false,
        onChange: () => {},
    },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => {
        const [storyArgs, updateStoryArgs] = useArgs<SwitchProps>();

        return (
            <Switch
                {...args}
                checked={storyArgs.checked}
                onChange={() => updateStoryArgs({ checked: !storyArgs.checked })}
            />
        );
    },
};
