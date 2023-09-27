import { Button, ButtonProps, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { Link } from "react-router-dom";
export type CategoryProps = (
  | {
      icon: ReactNode;
      inline?: false;
    }
  | {
      inline: true;
      icon?: undefined;
    }
) & { name: string; c_id: number } & ButtonProps;

export const Category: FC<CategoryProps> = ({
  name,
  c_id,
  icon,
  inline,
  ...props
}) => {
  return (
    <Button
      as={Link}
      to={`/home/options?category=${c_id}`}
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
      {!inline && icon}
    </Button>
  );
};
