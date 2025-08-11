export interface UserData {
  uid?: string;
  name: string;
  email: string;
  avatar: string;
  boards: Array<object>;
}

export interface BoardData {
  id?: string;
  uid?: string;
  name: string;
  color: string;
  createdAt: Date;
  lists: Array<object>;
}

export interface ListData {
  id?: string;
  uid?: string;
  boardId?: string;
  title: string;
  cards: Array<CardData>;
}

export interface CardData {
  id?: string;
  uid?: string;
  boardId?: string;
  listId?: string;
  title: string;
  description?: string;
  dueDate?: Date;
}
