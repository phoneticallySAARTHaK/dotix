import { ArrowBackIcon, BellIcon, LockIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { Category } from "../components/Category/Category";

export const Component = () => {
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
          <IconButton
            aria-label="Back"
            icon={<ArrowBackIcon w="1.5rem" h="1.5rem" mr="auto" />}
            variant="unstyled"
            color="white"
            colorScheme="orange"
            display="flex"
            px={0}
          />
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
            {[
              { c_id: "1", name: "Space", icon: <LockIcon /> },
              { c_id: "2", name: "History", icon: <BellIcon /> },
              { c_id: "4", name: "Sports", icon: <SunIcon /> },
            ].map((cat) => (
              <Category key={cat.c_id} {...cat} />
            ))}
          </Grid>
        </Box>
      </Flex>

      <Box p={3}>
        <Flex mb={4}>
          <Text as="h2" fontWeight={500}>
            Explore
          </Text>
          <Button ml="auto" variant="link" fontSize="0.75rem" color="black">
            View All
          </Button>
        </Flex>

        <Grid gridTemplateColumns="repeat(3, 1fr)" gap={2}>
          {[
            { c_id: "1", name: "Space", icon: <LockIcon /> },
            { c_id: "2", name: "History", icon: <BellIcon /> },
            { c_id: "4", name: "Sports", icon: <SunIcon /> },
            { c_id: "1", name: "Space", icon: <LockIcon /> },
            { c_id: "2", name: "History", icon: <BellIcon /> },
            { c_id: "4", name: "Sports", icon: <SunIcon /> },
            { c_id: "1", name: "Space", icon: <LockIcon /> },
            { c_id: "2", name: "History", icon: <BellIcon /> },
            { c_id: "4", name: "Sports", icon: <SunIcon /> },
          ].map((cat) => (
            <Category key={cat.c_id} {...cat} />
          ))}
        </Grid>
      </Box>
    </Grid>
  );
};
