export interface IUser {
  password: string;
  _id?: string
  image: string
  name: string;
  email: string;
  dateEngaged?: string;
  role?: EUserRole;
  isActive?: boolean
  createdAt?: string;
  updatedAt?: string;
}


export enum EUserRole {
  ADMIN = 'admin',
  SUPER_ADMIN = 'super_admin',
  PLAYER = 'player',
  GUEST = 'guest',
}
export enum EUserAccount {
  CREDENTIALS = 'credentials',
  GOOGLE = 'google',
}
export interface ISession {
  user: {
    id:string
    name: string;
    image: string;
    role?: EUserRole
    email: string;
    playerId?:string
  };
  expires: string
}





