import { MouseEvent, useCallback, useState } from "react";
import styled from "styled-components";

import TodoItem from "./todoItem";
import todoAPI from "src/api/todoApi";
import { ITodoProps } from "src/interfaces/interface";
import { getToken } from "src/utils/functions";

type ITodoListProps = {
  newTodoInfo: {
    todo: string;
    isCompleted: boolean;
  };
  todoList: ITodoProps[];
  setNewTodoInfo: React.Dispatch<
    React.SetStateAction<{
      todo: string;
      isCompleted: boolean;
    }>
  >;
  setIsRefetchNeeded: React.Dispatch<React.SetStateAction<boolean>>;
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

export default function TodoList({
  newTodoInfo,
  todoList,
  setNewTodoInfo,
  setIsRefetchNeeded,
}: ITodoListProps) {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number>(-1);

  const handleEditTodo = useCallback(
    async (itemId: number) => {
      try {
        const { todo, isCompleted } = newTodoInfo;
        await todoAPI.updateTodo({ todo, isCompleted }, itemId, getToken());
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
    [newTodoInfo, setIsRefetchNeeded]
  );

  const handleDeleteTodo = useCallback(
    async (itemId: number) => {
      try {
        await todoAPI.deleteTodo(itemId, getToken());
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
    [setIsRefetchNeeded]
  );

  const handleClick = (e: MouseEvent) => {
    const target = e.target as Element;
    const itemContainer = target.closest("div[data-item-id]") as HTMLDivElement;
    console.log(itemContainer);
    const { itemId, itemTodo, itemIsCompleted } = itemContainer.dataset;
    const isCompletedBool =
      itemIsCompleted && itemIsCompleted === "true" ? true : false;
    setSelectedId(+itemId!);

    if (
      target instanceof HTMLInputElement &&
      target.dataset.action === "check"
    ) {
      setNewTodoInfo((curr) => ({
        ...curr,
        todo: itemTodo!,
        isCompleted: !isCompletedBool,
      }));
      setIsRefetchNeeded(true);
      handleEditTodo(+itemId!);
    } else {
      const targetButton = target.closest("button");
      if (targetButton) {
        const { action } = targetButton.dataset;
        if (action === "edit") {
          setIsEditMode(true);
        }
        if (action === "editDone") {
          setSelectedId(-1);
          setIsEditMode(false);
          setNewTodoInfo((curr) => ({
            ...curr,
            isCompleted: isCompletedBool,
          }));
          if (newTodoInfo.todo.trim()) {
            handleEditTodo(+itemId!);
          }
        }
        if (action === "delete") {
          handleDeleteTodo(+itemId!);
        }
      }
    }
  };

  return (
    <List onClick={handleClick}>
      {todoList?.map(({ id, todo, isCompleted }) => (
        <TodoItem
          key={id}
          itemId={id}
          todo={id === selectedId ? newTodoInfo.todo : todo}
          isCompleted={
            id === selectedId ? newTodoInfo.isCompleted : isCompleted
          }
          selectedId={selectedId}
          isEditMode={isEditMode}
          newTodoInfo={newTodoInfo}
          setNewTodoInfo={setNewTodoInfo}
        />
      ))}
    </List>
  );
}
