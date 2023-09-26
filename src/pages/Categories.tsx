import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { api } from "../api";
import { BackButton } from "../components/BackButton/BackButton";
import { Category } from "../components/Category/Category";

export const Component = () => {
  const loaderData = (useLoaderData() ?? []) as api.Categories;

  const formatted = useMemo(function format() {
    let obj = {} as Record<string, number | Record<string, number>>;
    for (let cat of loaderData) {
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
    console.log(obj);
    return Object.entries(obj);
  }, loaderData);

  return (
    <Box p={4}>
      <BackButton as={Link} to="/home" color="black" w="min-content" />

      <UnorderedList
        listStyleType="none"
        display="flex"
        gap={4}
        flexWrap="wrap"
      >
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
                      <Box as="span" flex="1" textAlign="left">
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
    </Box>
  );
};

export function loader() {
  return api.fetchCategories();
}
