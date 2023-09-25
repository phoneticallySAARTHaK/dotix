import { Grid, GridProps, Text } from "@chakra-ui/react";
import { FC } from "react";

export type ScoreBubbleProps = { score: number } & GridProps;
export const ScoreBubble: FC<ScoreBubbleProps> = ({ score, ...props }) => {
  return (
    <Grid
      fontWeight={500}
      fontSize="1.25rem"
      placeItems="center"
      placeContent="center"
      borderRadius="50%"
      border="8px solid #FFD44E"
      w="8.7rem"
      h="8.7rem"
      color="#FFAD00"
      bg="white"
      {...props}
    >
      Your Score
      <Text mt={-1}>
        <Text as="strong" fontSize="2rem" fontWeight={700} color="#FFAD00">
          {score}
        </Text>{" "}
        pt
      </Text>
    </Grid>
  );
};
