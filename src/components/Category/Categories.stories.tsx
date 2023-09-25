import { AddIcon } from "@chakra-ui/icons";
import type { Meta, StoryObj } from "@storybook/react";
import { Category } from "./Category";

const meta = {
  component: Category,
  tags: ["autodocs"],
} satisfies Meta<typeof Category>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary = {
  args: {
    c_id: "",
    name: "Sports",
    icon: <AddIcon />,
  },
};
