import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  UnorderedList,
} from "@chakra-ui/react";
import { Suspense, useMemo } from "react";
import {
  Await,
  defer,
  useAsyncValue,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { api } from "../api";
import { Category } from "../components/Category/Category";

export const Component = () => {
  const loaderData = (useLoaderData() ?? []) as { data: api.Categories };

  const navigate = useNavigate();

  return (
    <Modal isOpen onClose={() => navigate("/home")}>
      <ModalOverlay />
      <ModalContent h="80vh" w="90vw" position="relative">
        <ModalHeader>
          <Heading>All Categories</Heading> <ModalCloseButton />
        </ModalHeader>
        <ModalBody overflow="auto">
          <Suspense
            fallback={
              <Spinner
                top="50%"
                left="50%"
                sx={{
                  translate: "-50% -50%",
                }}
                position="absolute"
              />
            }
          >
            <Await resolve={loaderData.data}>
              <List />
            </Await>
          </Suspense>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

function format(data: api.Categories) {
  let obj = {} as Record<string, number | Record<string, number>>;
  for (let cat of data) {
    if (cat.name.includes(":")) {
      const [group, sub_cat] = cat.name.split(":");
      if (typeof obj[group] !== "object") {
        obj[group] = {};
      }

      (obj[group] as Record<string, number>)[sub_cat as string] = cat.id;
    } else {
      obj[cat.name] = cat.id;
    }
  }

  return Object.entries(obj).sort((a) => {
    if (typeof a[1] === "object") return 1;
    if (typeof a[1] === "number") return -1;
    else return 0;
  });
}

function List() {
  const data = useAsyncValue() as api.Categories;
  const formatted = useMemo(() => format(data), data);

  return (
    <UnorderedList listStyleType="none" display="flex" gap={4} flexWrap="wrap">
      {formatted.map(([key, value], index) => {
        return (
          <ListItem
            key={index}
            flex={typeof value !== "number" ? "1 0 100%" : undefined}
          >
            {typeof value === "number" ? (
              <Category c_id={value} name={key} inline />
            ) : (
              <Accordion
                allowToggle
                border="1px solid #FFAD00"
                borderRadius={"8px"}
              >
                <AccordionItem border={"none"}>
                  <AccordionButton>
                    <Box as="span" flex="1" textAlign="left" fontWeight={600}>
                      {key}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel
                    p={2}
                    ml={0}
                    as={UnorderedList}
                    listStyleType="none"
                    display="flex"
                    gap={4}
                    flexWrap="wrap"
                  >
                    {Object.entries(value).map(([key, value]) => (
                      <ListItem key={value}>
                        <Category c_id={value} name={key} inline />
                      </ListItem>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            )}
          </ListItem>
        );
      })}
    </UnorderedList>
  );
}

export function loader() {
  return defer({ data: api.fetchCategories() });
}
