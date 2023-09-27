import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  IconButton,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  ActionFunctionArgs,
  redirect,
  useActionData,
  useSubmit,
} from "react-router-dom";
import { api } from "../api";
import { OptionIconProps } from "../assets/Icons/OptionIcon";
import { AnswerProgress } from "../components/AnswerProgress/AnswerProgress";
import { BackButton } from "../components/BackButton/BackButton";
import { Option } from "../components/Option/Option";

export const Component = () => {
  const actionData = useActionData() as api.Question[];

  if (!actionData) throw redirect("/home");

  const submit = useSubmit();

  const [answers, setAnswers] = useState({
    correct: 0,
    incorrect: 0,
    options: [] as string[],
  });
  const [questionState, setQuestionState] = useState<{
    time: number;
    selected: undefined | string;
    show: boolean;
  }>({ time: 5, selected: undefined, show: false });

  useEffect(() => {
    const id = setInterval(() => {
      setQuestionState((state) => {
        if (Boolean(state.selected)) {
          clearTimeout(id);
          return state;
        }

        if (state.time <= 1) {
          clearTimeout(id);
          return {
            ...state,
            time: 0,
            show: true,
          };
        }
        return { ...state, time: state.time - 1 };
      });
    }, 1000);

    setQuestionState({ time: 5, selected: undefined, show: false });
    return () => {
      clearTimeout(id);
    };
  }, [answers]);

  useEffect(() => {
    if (questionState.show) {
      const isCorrect =
        questionState.selected === actionData[current].correct_answer;

      setTimeout(
        () =>
          setAnswers((prev) => ({
            correct: prev.correct + Number(isCorrect),
            incorrect: prev.incorrect + Number(!isCorrect),
            options: [...prev.options, questionState.selected ?? ""],
          })),
        5000
      );
    }
  }, [questionState]);

  const current = answers.correct + answers.incorrect;
  const question =
    actionData[current >= actionData.length ? actionData.length - 1 : current];

  const options = [question.correct_answer, ...question.incorrect_answers]
    .sort()
    .map((op) => ({
      label: op ?? "",
      status:
        typeof questionState.selected === "undefined"
          ? ("normal" as const)
          : question.correct_answer === op
          ? ("correct" as const)
          : op === questionState.selected
          ? ("incorrect" as const)
          : ("normal" as const),
    }));

  useEffect(() => {
    if (current === actionData.length) {
      submit(answers, {
        replace: true,
        action: "/result",
        encType: "application/json",
        method: "POST",
      });
    }
  }, [current]);

  return (
    <Grid
      gridTemplateColumns="repeat(25, 1fr)"
      gridTemplateRows="repeat(100, calc(100% / 100))"
      minH="100svh"
      overflow="auto"
    >
      <Flex
        bg="#FFC102"
        p={3}
        direction="column"
        borderBottomRadius="30px"
        gridColumn="1 / -1"
        gridRow="1 / span 30"
        pb={8}
      >
        <Box as="header" display="flex">
          <BackButton />

          <IconButton
            aria-label="filter"
            icon={<InfoIcon />}
            variant={"ghost"}
            ml="auto"
          />
        </Box>
      </Flex>

      <Grid
        gridRow={"20 / span 30"}
        h="fit-content"
        p={1}
        pb={4}
        gridColumn={"2 / -2"}
        bg="white"
        borderRadius="20px"
        boxShadow="0px 4px 4px 0px rgba(251, 236, 255, 1)"
      >
        <Flex justify="space-between">
          <AnswerProgress
            score={answers.correct}
            flex="0 1 33%"
            max={actionData.length}
          />
          <Text as="time">{questionState.time}</Text>
          <AnswerProgress
            score={answers.incorrect}
            flex="0 1 33%"
            isIncorrect
            max={actionData.length}
          />
        </Flex>
        <Text
          color="rgb(255, 192, 0)"
          my={3}
          textAlign="center"
          fontSize="0.875rem"
          fontWeight={500}
        >
          Question {`${current + 1}`.padStart(2, "0")}/{actionData.length}
        </Text>
        <Text>{unescapeHtml(question.question)}</Text>
      </Grid>

      <Options
        options={options}
        isDisabled={questionState.show}
        setSelected={(v) =>
          setQuestionState((s) => ({ ...s, selected: v, show: true }))
        }
      />
    </Grid>
  );
};

function Options({
  options,
  isDisabled,
  setSelected,
}: {
  options: { label: string; status: OptionIconProps["variant"] }[];
  isDisabled?: boolean;
  setSelected: (value: string) => void;
}) {
  return (
    <UnorderedList
      listStyleType="none"
      gridRowStart="55"
      h="fit-content"
      gridColumn={"3 / -3"}
      m="0"
      display="flex"
      flexDirection="column"
      gap={4}
    >
      {options.map((op) => (
        <Option
          {...op}
          key={op.label}
          isDisabled={isDisabled}
          onClick={(e) => {
            const node = e.currentTarget as HTMLButtonElement;
            const value = node.getAttribute("data-value");
            setSelected(value ?? "");
          }}
        />
      ))}
    </UnorderedList>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries()) as unknown as Parameters<
    typeof api.fetchQuestions
  >[0];
  const res = await api.fetchQuestions(data);
  if (res.response_code === 0) return res.results;

  return null;
}

function unescapeHtml(str: string) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}
