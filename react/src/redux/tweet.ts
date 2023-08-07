import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

type Status = {
  sum: number;
  isAll: boolean;
};

export interface State {
  home?: Status;
  profile?: Status;
  children?: Status;
  isAnimate: boolean;
  hasNextPage: boolean;
}

const initialState: State = {
  home: undefined,
  profile: undefined,
  children: undefined,
  isAnimate: true,
  hasNextPage: true
};

export const tweetSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setHomeTweets: (state, action: PayloadAction<Status>) => {
      state.home = action.payload;
    },
    setProfileStatus: (state, action: PayloadAction<Status>) => {
      state.profile = action.payload;
    },
    setChildrenStatus: (state, action: PayloadAction<Status>) => {
      state.children = action.payload;
    },
    setHasNextPage: (state, action: PayloadAction<boolean>) => {
      state.hasNextPage = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setChildrenStatus,
  setHomeTweets,
  setProfileStatus,
  setHasNextPage
} = tweetSlice.actions;

export default tweetSlice.reducer;
