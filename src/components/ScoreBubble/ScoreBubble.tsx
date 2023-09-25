import { Grid, Text } from "@chakra-ui/react";
import { FC } from "react";

export type ScoreBubbleProps = { score: number };
export const ScoreBubble: FC<ScoreBubbleProps> = ({ score }) => {
  return (
    <Grid
      fontWeight={500}
      fontSize="1.25rem"
      placeItems="center"
      placeContent="center"
      borderRadius="50%"
      border="8px solid #FFD44E"
      w="8.8rem"
      h="8.8rem"
      color="#FFAD00"
    >
      Your Score
      <Text mt={-2}>
        <Text as="strong" fontSize="2rem" fontWeight={700} color="#FFAD00">
          {score}
        </Text>{" "}
        pt
      </Text>
    </Grid>
  );
};
