import jwt from "jsonwebtoken";
import { NextApiRequest } from 'next';

export function getTokenData(request: NextApiRequest) {
  try {
    const token = request.cookies?.token || "";
    if (!token) return null;
    const tokenData = jwt.verify(token, process.env.TOKEN_SECRET!);
    console.log('tokenData',tokenData)
    return tokenData;
  } catch (error) {
    console.log("token error", error);
    return null;
  }
}
