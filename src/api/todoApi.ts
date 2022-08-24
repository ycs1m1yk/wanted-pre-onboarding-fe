import instance from "./instance";

const todoAPI = {
  createTodo: async (bodyData: { todo: string }, token: string | null) => {
    const { data } = await instance.post("/todos", bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  getTodos: async (token: string | null) => {
    const { data } = await instance.get("/todos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  updateTodo: async (
    bodyData: { todo: string; isCompleted: boolean },
    itemId: number,
    token: string | null
  ) => {
    const { data } = await instance.put(`/todos/${itemId}`, bodyData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },

  deleteTodo: async (itemId: number, token: string | null) => {
    const { data } = await instance.delete(`/todos/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  },
};

export default todoAPI;
