import type { Meta, StoryObj } from "@storybook/react";
import { ScoreBubble } from "./ScoreBubble";

const meta = {
  component: ScoreBubble,
  tags: ["autodocs"],
} satisfies Meta<typeof ScoreBubble>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    score: 100,
  },
};
