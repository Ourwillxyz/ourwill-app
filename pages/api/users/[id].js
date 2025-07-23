import usersArr from "../../../utils/users";
import { verifyToken } from "../../../utils/auth";

export default function handler(req, res) {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: "No token" });
  const token = auth.replace(/^Bearer /, "");
  const user = verifyToken(token);
  if (!user || !user.isAdmin) return res.status(403).json({ error: "Admin only" });

  const { id } = req.query;
  if (user.id === Number(id)) return res.status(400).json({ error: "Cannot delete self" });

  const idx = usersArr.findIndex(u => u.id === Number(id));
  if (idx === -1) return res.status(404).json({ error: "Not found" });
  usersArr.splice(idx, 1);
  res.json({ success: true });
}
