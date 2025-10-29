export default function postConfig(bodyObject: object) {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyObject),
  };
}
export function putConfig(bodyObject: object) {
  return {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bodyObject),
  };
}

export const baseUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://konjiehifc.vercel.app";

export async function uploadSingleFile({
  fileName,
  filePath,
  fileType,
  preset,
  folder,
  presetType,
}: {
  fileName: string;
  filePath: string;
  fileType: string;
  preset: string;
  folder: string;
  presetType: string;
}) {
  //Upload image
  const upload = await fetch(baseUrl + "/api/files/upload", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileName,
      filePath,
      fileType,
      preset,
      folder,
      presetType,
    }),
  });
  const uploadRsp = await upload.json();
  return uploadRsp; //{data,success,message}
}

export const apiConfig = {
  base: `${baseUrl}/api`,
  admins: `${baseUrl}/api/admins`,
  signin: `${baseUrl}/api/auth/signin`,
  signout: `${baseUrl}/api/auth/signout`,
  logout: `${baseUrl}/api/auth/users/logout`,
  sponsors: `${baseUrl}/api/sponsors`,

  teams: `${baseUrl}/api/teams`,

  matches: `${baseUrl}/api/matches`,
  goals: `${baseUrl}/api/goals`,
  cards: `${baseUrl}/api/cards`,
  injuries: `${baseUrl}/api/injuries`,

  players: `${baseUrl}/api/players`,

  managers: `${baseUrl}/api/managers`,

  captains: `${baseUrl}/api/captains`,
  currentCaptains: `${baseUrl}/api/captains/current`,

  galleries: `${baseUrl}/api/galleries`,

  messages: `${baseUrl}/api/messages`,
  news: `${baseUrl}/api/news`,
  squad: `${baseUrl}/api/squad`,

  file: `${baseUrl}/api/file`, //Interacts with db
  fileUpload: `${baseUrl}/api/file/cloudinary`, //Interacts with storage(cld)
};
