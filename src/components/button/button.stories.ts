import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
    title: "Library/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        disabled: {
            description: "Is button disabled",
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
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Button",
        size: "medium",
    },
};
