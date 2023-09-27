import type { Meta, StoryObj } from "@storybook/react";
import { AnswerProgress } from "./AnswerProgress";

const meta = {
  component: AnswerProgress,
  tags: ["autodocs"],
} satisfies Meta<typeof AnswerProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    score: 10,
    max: 10,
  },
};
