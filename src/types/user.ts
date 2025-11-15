export interface IUser {
  _id?: string
  image: string
  name: string;
  email: string;
  password?: string;
  dateEngaged?: string;
  role?: TUserRole;
  account?: 'credentials' | 'google'
  isActive?: boolean
  createdAt?: Date;
  updatedAt?: Date;
}

export type TUserRole = 'super_admin' | "admin" | "player" | "guest"




