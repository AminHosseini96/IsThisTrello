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
  color:
    | "purple"
    | "green"
    | "red"
    | "blue"
    | "yellow"
    | "orange"
    | "pink"
    | "lime";
  createdAt?: Date;
  lastUpdatedAt?: Date;
  lists?: Array<object>;
}

export interface ListData {
  id?: string;
  uid?: string;
  boardId?: string;
  name: string;
  cards?: Array<CardData>;
}

export interface CardData {
  id?: string;
  uid?: string;
  boardId?: string;
  listId?: string;
  name: string;
  description?: string;
  dueDate?: Date;
}

export interface UiData {
  isLoading?: boolean;
  isLoggedIn?: boolean;
  isSignedUp?: boolean;
  colorTheme?:
    | "purple"
    | "green"
    | "red"
    | "blue"
    | "yellow"
    | "orange"
    | "pink"
    | "lime";
}
