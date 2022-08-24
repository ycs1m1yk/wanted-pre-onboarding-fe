import styled from "styled-components";
import { AiOutlineEdit, AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { ChangeEvent } from "react";

type ITodoItemProps = {
  itemId: number;
  todo: string;
  isCompleted: boolean;
  selectedId: number;
  isEditMode: boolean;
  newTodoInfo: {
    todo: string;
    isCompleted: boolean;
  };
  setNewTodoInfo: React.Dispatch<
    React.SetStateAction<{
      todo: string;
      isCompleted: boolean;
    }>
  >;
};

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CheckBox = styled.input``;

const ItemSpan = styled.span`
  flex: 1 1 auto;
`;

const ItemInput = styled.input`
  flex: 1 1 auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  width: fit-content;
  margin-left: 1rem;
  border: solid 1px;
  border-radius: 4px;
  color: white;
  background-color: ${({ theme }) => theme.palette.peterRiver};
  cursor: pointer;
`;

const DeleteButton = styled(EditButton)`
  background-color: ${({ theme }) => theme.palette.pomegranate};
`;

const EditDoneButton = styled(EditButton)`
  background-color: ${({ theme }) => theme.palette.emerald};
`;

export default function TodoItem({
  itemId,
  todo,
  isCompleted,
  selectedId,
  isEditMode,
  setNewTodoInfo,
}: ITodoItemProps) {
  const handleTodoChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setNewTodoInfo((curr) => ({ ...curr, todo: target.value }));
  };

  return (
    <ItemContainer
      data-item-id={itemId}
      data-item-todo={todo}
      data-item-is-completed={isCompleted}
    >
      <CheckBox type="checkbox" data-action="check"></CheckBox>
      {(itemId !== selectedId || !isEditMode) && (
        <>
          <ItemSpan>{todo}</ItemSpan>
          <ButtonGroup>
            <EditButton data-action="edit">
              <AiOutlineEdit />
            </EditButton>
            <DeleteButton data-action="delete">
              <AiOutlineClose />
            </DeleteButton>
          </ButtonGroup>
        </>
      )}
      {itemId === selectedId && isEditMode && (
        <>
          <ItemInput
            type="text"
            defaultValue={todo}
            onChange={handleTodoChange}
          />
          <ButtonGroup>
            <EditDoneButton data-action="editDone">
              <AiOutlineCheck />
            </EditDoneButton>
          </ButtonGroup>
        </>
      )}
    </ItemContainer>
  );
}
