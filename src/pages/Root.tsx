import { LoaderFunctionArgs, redirect } from "react-router-dom";
import { api } from "../api";

export const Component = () => {
  return null;
};

export async function loader({ request }: LoaderFunctionArgs) {
  !api.getToken() && (await api.fetchToken());
  const pathname = new URL(request.url).pathname;
  if (pathname !== "/") return null;
  else redirect("/home");
}
