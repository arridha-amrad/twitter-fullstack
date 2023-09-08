let authUserId: string | undefined = undefined;

export const setAuthId = (id: string) => (authUserId = id);
export const getAuthId = () => authUserId;
