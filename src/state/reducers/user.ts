import { StoreAction } from "../../types/state";

const initial_user_state: any = {};

const user = (state = initial_user_state, action: StoreAction) => {
  switch (action.type) {
    case "SET_USER_STATE":
      return action.payload;
    default:
      return state;
  }
};

export default user;
