// Super simple token (for demo, not for production!)
const SECRET = "secret";

export function signToken(user) {
  // Just base64 encode id, username, isAdmin for demo
  const payload = JSON.stringify({
    id: user.id,
    username: user.username,
    isAdmin: user.isAdmin
  });
  return Buffer.from(payload).toString("base64") + "." + SECRET;
}

export function verifyToken(token) {
  if (!token || !token.endsWith("." + SECRET)) return null;
  try {
    const base64 = token.slice(0, -1 * ("." + SECRET).length);
    const user = JSON.parse(Buffer.from(base64, "base64").toString("utf8"));
    return user;
  } catch {
    return null;
  }
}
