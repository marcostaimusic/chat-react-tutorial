import { types } from "../../types/types";

export const chatReducer = (state, action) => {
  console.log(action.type); // ! coglione non funzionava perchè hai messo types con la -s nel dispatch di SidebarChatItem!!!

  switch (action.type) {
    case types.uploadedUsers:
      return {
        ...state,
        users: [...action.payload],
      };

    case types.activateChat:
      if (state.activeChat === action.payload) return state;
      return {
        ...state,
        activeChat: action.payload,
        messages: [],
      };

    default:
      return state;
  }
};
