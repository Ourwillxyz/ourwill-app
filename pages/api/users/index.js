import usersArr from "../../../utils/users";
import { verifyToken } from "../../../utils/auth";

export default function handler(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });
  const token = auth.replace(/^Bearer /, "");
  const user = verifyToken(token);
  if (!user || !user.isAdmin) return res.status(403).json({ error: "Admin only" });
  res.json({ success: true, users: usersArr });
}
