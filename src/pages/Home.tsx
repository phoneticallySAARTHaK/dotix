import { Avatar, Box, Button, Flex, Grid, Text } from "@chakra-ui/react";
import { Link, Outlet, useLoaderData } from "react-router-dom";
import { api } from "../api";
import { BackButton } from "../components/BackButton/BackButton";
import { Category } from "../components/Category/Category";

export function loader() {
  console.log("home laoder");
  return api.fetchCategories();
}

export const Component = () => {
  const loaderData = useLoaderData() as api.Categories;
  return (
    <Grid>
      <Flex
        bg="#FFC102"
        p={3}
        direction="column"
        borderBottomRadius="30px"
        gap={6}
      >
        <Flex as="header" align="center" color="white">
          <BackButton />
          <Text
            as="h1"
            flex="1"
            textAlign="center"
            fontWeight={600}
            fontSize={"1.125rem"}
          >
            Hello Kirat
          </Text>
          <Avatar size="sm" />
        </Flex>

        <Box>
          <Text as="h1" fontWeight={600} mb={4} color="white">
            Popular
          </Text>
          <Grid gridTemplateColumns="repeat(3, 1fr)" gap={2}>
            {loaderData
              .filter(({ name }) => /(history|sports|Mythology)/i.test(name))
              .map((cat) => (
                <Category key={cat.id} c_id={cat.id} name={cat.name} inline />
              ))}
          </Grid>
        </Box>
      </Flex>

      <Box p={4}>
        <Flex mb={4}>
          <Text as="h2" fontWeight={500}>
            Explore
          </Text>
          <Button
            ml="auto"
            variant="link"
            fontSize="0.75rem"
            color="black"
            as={Link}
            to="categories"
          >
            View All
          </Button>
        </Flex>

        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          {loaderData
            .filter(({ name }) => name.length < 12)
            .slice(0, 10)
            .map((cat) => (
              <Category key={cat.id} c_id={cat.id} name={cat.name} inline />
            ))}
        </Grid>
      </Box>
      <Outlet />
    </Grid>
  );
};
