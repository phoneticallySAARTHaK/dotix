import { Box, BoxProps, Button, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
export type CategoryProps = {
  name: string;
  c_id: string;
  icon: ReactNode;
} & BoxProps;

export const Category: FC<CategoryProps> = ({ name, c_id, icon, ...props }) => {
  return (
    <Box
      as={Button}
      h="fit-content"
      display="grid"
      placeItems="center"
      gap={2}
      padding={2}
      border="1px solid #FFAD00"
      borderRadius="10px"
      bg="white"
      {...props}
    >
      <Text as="h4" textAlign="center" fontWeight={500} fontSize={"0.9rem"}>
        {name}
      </Text>
      {icon}
    </Box>
  );
};
