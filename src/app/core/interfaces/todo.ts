export interface Todo {
  text: string;
  from: string;
  expire: Date;
  createdAt: Date;
  userId: string;
  id?: string;
}
