import { myApi } from "./api";
import { resetToken, setToken } from "./auth";

const PATH = "/api/users";

export const userApi = myApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<string, RegisterDTO>({
      query: (body) => ({
        url: `${PATH}/register`,
        body,
        method: "POST",
      }),
      transformResponse(response: { message: string }) {
        return response.message;
      },
    }),
    login: builder.mutation<LoginResponse, LoginDTO>({
      query: (body) => ({
        url: `${PATH}/login`,
        method: "POST",
        body,
      }),
      async onQueryStarted(arg, api) {
        try {
          const { data } = await api.queryFulfilled;
          api.dispatch(setToken(data.token));
          api.dispatch(
            userApi.util.upsertQueryData("me", undefined, data.user)
          );
        } catch (error) {
          throw error;
        }
      },
    }),
    logout: builder.mutation<void, void>({
      query: () => `${PATH}/logout`,
      async onQueryStarted(arg, api) {
        try {
          await api.queryFulfilled;
          api.dispatch(resetToken());
        } catch (error) {}
      },
    }),
    me: builder.query<User, void>({
      providesTags: ["me"],
      serializeQueryArgs: ({ endpointName }) => endpointName,
      query: () => `${PATH}/me`,
      transformResponse: (data: { user: User }, meta, arg) => {
        return data.user;
      },
    }),
  }),
});

export const {
  useMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
} = userApi;
