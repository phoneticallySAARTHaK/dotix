import { Avatar, Box, Flex, Grid } from "@chakra-ui/react";
import { BackButton } from "../components/BackButton/BackButton";
import { ScoreBubble } from "../components/ScoreBubble/ScoreBubble";
import { ScoreCard } from "../components/ScoreCard/ScoreCard";

export const Component = () => {
  return (
    <Grid
      gridTemplateColumns="repeat(12, 1fr)"
      gridTemplateRows="repeat(100, calc(100% / 100))"
      minH="100svh"
    >
      <Flex
        bg="#FFC102"
        p={3}
        direction="column"
        borderBottomRadius="30px"
        gridColumn="1 / -1"
        gridRow="1 / span 40"
        pb={8}
      >
        <Box as="header">
          <BackButton />
        </Box>

        <ScoreBubble score={0} m="auto" mt="0" />
      </Flex>

      <ScoreCard gridColumn="2 / -2" gridRow={"35 / span 25"} />
      <Grid
        gridTemplateColumns="repeat(3, 1fr)"
        my="auto"
        w="100%"
        gap={2}
        rowGap={8}
        justifyItems="center"
        gridColumn="1 / -1"
        gridRowStart="65"
        mb={8}
        px={4}
        alignContent="center"
      >
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
        <Avatar />
      </Grid>
    </Grid>
  );
};
