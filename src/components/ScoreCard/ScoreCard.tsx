import { BoxProps, Grid, Text, UnorderedList } from "@chakra-ui/react";
import { FC } from "react";

const Detail = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string | number;
  color?: string;
}) => {
  return (
    <Grid minW={0} gridTemplateColumns="auto 1fr" gap={2} p={2}>
      <Text
        as="span"
        color={color}
        fontSize={"2rem"}
        fontWeight={700}
        verticalAlign={"top"}
        alignSelf={"start"}
      >
        •
      </Text>
      <Text>
        <Text as="span" color={color}>
          {value}
        </Text>
        <Text as="span" display="block">
          {label}
        </Text>
      </Text>
    </Grid>
  );
};

export const ScoreCard: FC<
  BoxProps & { correct: number; incorrect: number }
> = ({ correct, incorrect, ...props }) => {
  return (
    <Grid
      columnGap={2}
      gridTemplateColumns="repeat(2, calc((100% - 1 * 1rem) / 2))"
      as={UnorderedList}
      listStyleType="none"
      boxShadow="0px 6px 19px 0px rgba(0, 0, 0, 0.12)"
      borderRadius="22px"
      bg="white"
      {...props}
    >
      <Detail label="Completed" value="100%" color="rgba(255, 193, 2, 1)" />
      <Detail
        label="Questions"
        value={correct + incorrect}
        color="rgba(255, 193, 2, 1)"
      />
      <Detail label="Comp" value={correct} color="green" />
      <Detail label="Comp" value={incorrect} color="red" />
    </Grid>
  );
};
