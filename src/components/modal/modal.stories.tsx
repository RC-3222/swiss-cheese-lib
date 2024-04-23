import type { Meta, StoryObj } from "@storybook/react";
import { Modal, ModalProps } from "./modal";
import { useArgs } from "@storybook/preview-api";

const meta = {
    title: "Library/Modal",
    component: Modal,
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
        hasDefaultContentWrapper: {
            type: "boolean",
        },
    },
    args: {
        onClose: () => {},
    },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        open: false,
    },
    render: (args) => {
        const [storyArgs, updateStoryArgs] = useArgs<ModalProps>();

        const modalChildren = args.children ?? (
            <div style={{ background: args.hasDefaultContentWrapper ? "none" : "white" }}>
                <h2>Hello there!</h2>,<p>This is an example of modal content</p>,
                <button onClick={() => updateStoryArgs({ open: false })}>ok</button>,
            </div>
        );

        return (
            <>
                <button onClick={() => updateStoryArgs({ open: true })}>Open modal</button>
                <Modal
                    {...args}
                    open={storyArgs.open}
                    onClose={() => updateStoryArgs({ open: false })}
                >
                    {modalChildren}
                </Modal>
            </>
        );
    },
};
