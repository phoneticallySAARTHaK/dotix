import { Box, Button, ListItem } from "@chakra-ui/react";
import { FC, MouseEventHandler } from "react";
import { OptionIcon, OptionIconProps } from "../../assets/Icons/OptionIcon";

export type OptionProps = {
  status: OptionIconProps["variant"];
  label: string;
  isDisabled?: boolean;
  onClick: MouseEventHandler;
};
export const Option: FC<OptionProps> = ({
  label,
  status,
  isDisabled,
  onClick,
}) => {
  return (
    <ListItem>
      <Box
        as={Button}
        onClick={onClick}
        data-value={label}
        bg="white"
        isDisabled={isDisabled}
        w="100%"
        border="2px solid rgba(255, 181, 4, 1)"
        borderRadius="20px"
        minH={"3rem"}
        p={2}
        display={"flex"}
        alignItems="center"
        justifyContent="space-between"
      >
        {unescapeHtml(label)} <OptionIcon variant={status} />
      </Box>
    </ListItem>
  );
};

function unescapeHtml(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}
