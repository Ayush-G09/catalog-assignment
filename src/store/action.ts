import { Mode } from "../types";

export const SET_MODE = "SET_MODE";

export const setMode = (mode: Mode) => ({
  type: SET_MODE,
  payload: mode,
});

export type Action = { type: typeof SET_MODE; payload: Mode };
