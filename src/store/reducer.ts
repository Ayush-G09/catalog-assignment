import { Action, SET_MODE } from "./action";

type State = {
  mode: string;
};

const initialState: State = {
  mode: localStorage.getItem("mode") || "light",
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case SET_MODE:
      return { ...state, mode: action.payload };
    default:
      return state;
  }
};

export default reducer;
