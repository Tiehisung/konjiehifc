

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://konjiehifc.vercel.app";


export const apiConfig = {
  base: `${baseUrl}/api`,
  features: `${baseUrl}/api/features`,
  users: `${baseUrl}/api/users`,
  signin: `${baseUrl}/api/auth/signin`,
  signout: `${baseUrl}/api/auth/signout`,
  logout: `${baseUrl}/api/auth/users/logout`,
  sponsors: `${baseUrl}/api/sponsors`,
  docs: `${baseUrl}/api/docs`,

  teams: `${baseUrl}/api/teams`,

  matches: `${baseUrl}/api/matches`,
  goals: `${baseUrl}/api/goals`,
  cards: `${baseUrl}/api/cards`,
  injuries: `${baseUrl}/api/injuries`,

  players: `${baseUrl}/api/players`,
  trainingSession: `${baseUrl}/api/training`,

  managers: `${baseUrl}/api/managers`,

  captains: `${baseUrl}/api/captains`,
  currentCaptains: `${baseUrl}/api/captains/current`,

  galleries: `${baseUrl}/api/galleries`,

  messages: `${baseUrl}/api/messages`,
  transactions: `${baseUrl}/api/finance/transactions`,
  news: `${baseUrl}/api/news`,
  squad: `${baseUrl}/api/squad`,

  file: `${baseUrl}/api/file`, //Interacts with db
  fileUpload: `${baseUrl}/api/file/cloudinary`, //Interacts with storage(cld)
};
