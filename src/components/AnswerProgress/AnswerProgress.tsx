import { ChakraProps, Flex, Progress, Text } from "@chakra-ui/react";
import { FC } from "react";

export type AnswerProgressProps = {
  isIncorrect?: boolean;
  score: number;
  max: number;
} & ChakraProps;
export const AnswerProgress: FC<AnswerProgressProps> = ({
  score,
  max,
  isIncorrect,
  ...props
}) => {
  return (
    <Flex align="center" gap={1} {...props}>
      <Text
        as="span"
        aria-hidden="true"
        order={isIncorrect ? 1 : undefined}
        color={isIncorrect ? "red" : "green"}
        fontSize="0.875rem"
        fontWeight={700}
      >
        {`${score}`.padStart(2, "0")}
      </Text>
      <Progress
        value={score}
        flex="1"
        max={max}
        bg="none"
        borderRadius="8px"
        colorScheme={isIncorrect ? "red" : "green"}
        transform={isIncorrect ? "scaleX(-1)" : undefined}
      />
    </Flex>
  );
};
