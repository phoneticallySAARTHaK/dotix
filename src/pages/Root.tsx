import { api } from "../api";

export const Component = () => {
  return null;
};

export async function loader() {
  !api.getToken() && (await api.fetchToken());
  return null;
}
