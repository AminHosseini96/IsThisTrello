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
  name?: string;
  color?:
    | "violet"
    | "emerald"
    | "rose"
    | "sky"
    | "amber"
    | "orange"
    | "pink"
    | "lime";
  createdAt?: Date;
  lastUpdatedAt?: Date;
  lists?: Array<object>;
}

export interface ListData {
  id?: string;
  boardId?: string;
  name?: string;
  cards?: Array<CardData>;
  position?: number;
}

export interface CardData {
  id?: string;
  listId?: string;
  name?: string;
  position?: number;
}

export interface UiData {
  isLoading?: boolean;
  isLoggedIn?: boolean;
  isSignedUp?: boolean;
  isBoardEmpty?: boolean;
  colorTheme?:
    | "violet"
    | "emerald"
    | "rose"
    | "sky"
    | "amber"
    | "orange"
    | "pink"
    | "lime";
}
