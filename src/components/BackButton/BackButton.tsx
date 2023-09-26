import { ArrowBackIcon } from "@chakra-ui/icons";
import { As, IconButton, IconButtonProps, PropsOf } from "@chakra-ui/react";

export function BackButton<T extends As>(
  props: Partial<IconButtonProps & PropsOf<T>>
) {
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
