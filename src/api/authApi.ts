import instance from "./instance";

const authAPI = {
  signIn: async (bodyData: { email: string; password: string }) => {
    const { data } = await instance.post("/auth/signin", bodyData, {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    return data;
  },

  signUp: async (bodyData: { email: string; password: string }) => {
    const { data } = await instance.post("/auth/signup", bodyData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  },
};

export default authAPI;
