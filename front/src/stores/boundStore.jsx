import { create } from "zustand";
import { createItemsSlice } from "./items";
import { createUserSlice } from "./user";
import { createChatSlice } from "./chat";

export const useBoundStore = create((...a) => ({
  ...createItemsSlice(...a),
  ...createUserSlice(...a),
  ...createChatSlice(...a),
}));
