export namespace api {
  export function getToken() {
    return localStorage.getItem("token") as string;
  }

  export function setToken(token: string) {
    return localStorage.setItem("token", token);
  }

  export async function fetch<T>(resource: string | URL, init?: RequestInit) {
    const url = new URL(resource);
    url.searchParams.set("token", getToken());

    return window.fetch(url, init).then((r) => r.json()) as Promise<T>;
  }

  export type Categories = Array<{ id: number; name: string }>;

  export async function fetchCategories() {
    return (
      await fetch<{
        trivia_categories: Categories;
      }>("https://opentdb.com/api_category.php")
    ).trivia_categories;
  }

  export const response_codes = {
    /** Returned results successfully. */
    Success: 0,
    /** Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.) */
    No_Results: 1,
    /** Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five) */
    Invalid_Parameter: 2,
    /** Session Token does not exist. */
    Token_Not_Found: 3,
    /** Session Token has returned all possible questions for the specified query. Resetting the Token is necessary. */
    Token_Empty: 4,
  } as const;

  export type ResponseCodes =
    (typeof response_codes)[keyof typeof response_codes];

  export async function fetchToken() {
    const res = await fetch<{
      response_code: ResponseCodes;
      response_message: string;
      token?: string;
    }>("https://opentdb.com/api_token.php?command=request");
    if (!res.token) console.error(res);
    res.token && setToken(res.token);
  }

  export async function resetToken() {
    fetch<{ response_code: ResponseCodes; token?: string }>(
      `https://opentdb.com/api_token.php?command=reset&token=${getToken()}`
    );
  }

  export type Question = {
    category: string;
    type: string;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  };

  export async function fetchQuestions(options: {
    encode?: "urlLegacy" | "url3986" | "base64";
    type?: "boolean" | "multiple";
    category?: number;
    amount: number;
    difficulty?: "easy" | "medium" | "hard";
  }) {
    const url = new URL("https://opentdb.com/api.php");
    Object.entries(options).forEach(([key, val]) =>
      url.searchParams.set(key, `${val}`)
    );

    return fetch<{ response_code: ResponseCodes; results: Question[] }>(url);
  }
}
