import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Modal,
  ModalContent,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  Form,
  LoaderFunctionArgs,
  redirect,
  useLoaderData,
  useNavigate,
} from "react-router-dom";

export const Component = () => {
  const loaderData = useLoaderData() as string;
  const navigate = useNavigate();
  return (
    <Modal isOpen onClose={() => navigate("/home")}>
      <ModalOverlay />

      <ModalContent w="90vw">
        <Box
          as={Form}
          method="POST"
          action="/quiz"
          p={4}
          display="flex"
          flexDirection="column"
          gap={6}
        >
          <input type="hidden" value={loaderData} name="category" />
          <FormControl>
            <FormLabel htmlFor="amount" fontWeight={600}>
              Total Questions
            </FormLabel>
            <Box
              as="input"
              w="100%"
              type="range"
              min={5}
              max={50}
              step={5}
              list="steps"
              id="amount"
              name="amount"
              defaultValue={10}
            />

            <Box
              as="datalist"
              id="steps"
              display="flex"
              w="100%"
              justifyContent={"space-between"}
              minW={0}
            >
              {Array(10)
                .fill(5)
                .map((n, i) => (
                  <Box
                    as="option"
                    value={n * (i + 1)}
                    key={i}
                    fontSize={{ base: "0.875rem", sm: "1rem" }}
                  >
                    {n * (i + 1)}
                  </Box>
                ))}
            </Box>
          </FormControl>

          <FormControl>
            <Text fontWeight={600}>Dificulty</Text>
            <RadioGroup defaultValue="easy" name="dificulty">
              <Stack direction="row" justify="space-between">
                <Radio value="easy" colorScheme="yellow">
                  Easy
                </Radio>
                <Radio value="medium" colorScheme="orange">
                  Medium
                </Radio>
                <Radio value="hard" colorScheme="red">
                  Hard
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <FormControl>
            <Text fontWeight={600}>Type</Text>
            <RadioGroup defaultValue="multiple" name="type">
              <Stack direction="row" justify="space-evenly">
                <Radio value="multiple">MCQ</Radio>
                <Radio value="boolean">True/False</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>

          <Button type="submit" colorScheme="orange">
            Let's Go
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
};

export function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const catParam = url.searchParams.get("category");
  return catParam ? catParam : redirect("/home");
}
