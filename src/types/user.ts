export interface IUser {
  _id?: string
  image: string
  name: string;
  email: string;
  password?: string;
  dateEngaged?: string;
  role?: EUserRole;
  account?: 'credentials' | 'google'
  isActive?: boolean
  createdAt?: Date;
  updatedAt?: Date;
}


export enum EUserRole {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  PLAYER = 'player',
  GUEST = 'guest',
}
export interface ISession  {
  user: {
    name: string;
    image: string;
    role?: EUserRole
    email: string;
  };
  expires:string
}





