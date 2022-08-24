import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";

import TodoList from "./components/todoList";
import todoAPI from "src/api/todoApi";
import { ITodoProps } from "src/interfaces/interface";
import { getToken } from "src/utils/functions";

const Container = styled.div`
  width: 100%;
  height: -webkit-fill-available;
  margin: 3rem 0;
  padding: 1rem;
  border: 1px solid;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  font-size: 1.5rem;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const TodoForm = styled.form`
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  flex: 1 1 auto;
`;

const AddButton = styled.button`
  width: fit-content;
  margin-left: 1rem;
  border: solid 1px;
  border-radius: 4px;
  color: white;
  background-color: ${({ theme }) => theme.palette.emerald};
  cursor: pointer;
`;

export default function Todo() {
  const [isRefetchNeeded, setIsRefetchNeeded] = useState<boolean>(false);
  const [todoList, setTodoList] = useState<ITodoProps[]>([]);
  const [input, setInput] = useState<string>("");
  const [newTodoInfo, setNewTodoInfo] = useState<{
    todo: string;
    isCompleted: boolean;
  }>({
    todo: " ",
    isCompleted: false,
  });

  const handleCreateTodo = useCallback(
    async (e: FormEvent) => {
      try {
        e.preventDefault();
        await todoAPI.createTodo({ todo: input }, getToken());
        setInput("");
        setIsRefetchNeeded(true);
      } catch (e: any) {
        const {
          response: {
            data: { message },
          },
        } = e;
        alert(message);
        window.location.reload();
      }
    },
    [input]
  );

  const handleInputChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setInput(target.value);
  };

  const getTodos = useCallback(async () => {
    try {
      const data = await todoAPI.getTodos(getToken());
      setTodoList(data);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    if (todoList.length === 0 || isRefetchNeeded) {
      getTodos();
      setIsRefetchNeeded(false);
    }
  }, [getTodos, todoList, isRefetchNeeded]);

  return (
    <Container>
      <TodoForm onSubmit={handleCreateTodo}>
        <Input value={input} onChange={handleInputChange} />
        <AddButton type="submit">
          <AiOutlinePlus />
        </AddButton>
      </TodoForm>
      <TodoList
        newTodoInfo={newTodoInfo}
        todoList={todoList}
        setNewTodoInfo={setNewTodoInfo}
        setIsRefetchNeeded={setIsRefetchNeeded}
      />
    </Container>
  );
}
