import { ArrowBackIcon } from "@chakra-ui/icons";
import { IconButton, IconButtonProps } from "@chakra-ui/react";

export function BackButton(props: Partial<IconButtonProps>) {
  return (
    <IconButton
      aria-label="Back"
      icon={<ArrowBackIcon w="1.5rem" h="1.5rem" mr="auto" />}
      variant="unstyled"
      color="white"
      colorScheme="orange"
      display="flex"
      px={0}
      {...props}
    />
  );
}
