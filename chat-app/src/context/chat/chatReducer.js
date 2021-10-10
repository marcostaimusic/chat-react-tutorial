import { types } from "../../types/types";

export const chatReducer = (state, action) => {
  // console.log(action.payload); // ! coglione non funzionava perchè hai messo types con la -s nel dispatch di SidebarChatItem!!!

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

    case types.newMessage:
      if (
        state.activeChat === action.payload.from ||
        state.activeChat === action.payload.to
      ) {
        return {
          ...state,
          messages: [...state.messages, action.payload],
        };
      } else {
        return state;
      }

    case types.loadMessages:
      return {
        ...state,
        messages: [...action.payload],
      };
    default:
      return state;
  }
};
