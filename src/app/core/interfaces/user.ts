export interface User {
  email: string;
  password: string;
  username: string;
  admin?: [string];
  avatar?: string;
  id: string;
}
