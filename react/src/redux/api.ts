import {
  BaseQueryApi,
  FetchArgs,
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { setToken } from './auth';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_SERVER_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  // eslint-disable-next-line
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);
  // eslint-disable-next-line
  const error = result?.error as any;
  if (error?.originalStatus === 401) {
    try {
      const response = (await baseQuery(
        '/api/users/refresh-token',
        api,
        extraOptions
      )) as {
        data: { token: string };
      };
      api.dispatch(setToken(response.data.token));
      result = await baseQuery(args, api, extraOptions);
    } catch (error) {
      return result;
    }
  }
  return result;
};

export const myApi = createApi({
  tagTypes: ['user', 'posts', 'post', 'me', 'replies', 'tweet'],
  reducerPath: 'twitterApi',
  baseQuery: baseQueryWithReAuth,
  endpoints: () => ({})
});
