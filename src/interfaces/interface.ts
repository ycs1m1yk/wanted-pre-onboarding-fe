export interface ITodoProps {
  [index: string]: any;
  id: number;
  todo: string;
  isCompleted: boolean;
  userId?: number;
}
