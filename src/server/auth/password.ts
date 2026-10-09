const iterations = 100_000;
const encoder = new TextEncoder();

function hex(bytes: Uint8Array) {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

async function derive(password: string, salt: Uint8Array) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: new Uint8Array(salt), iterations },
    key,
    256,
  );
  return hex(new Uint8Array(bits));
}

export async function hashPassword(password: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  return `pbkdf2-sha256$${iterations}$${hex(salt)}$${await derive(password, salt)}`;
}

export async function verifyPassword(password: string, stored: string | null) {
  const match = stored?.match(
    /^pbkdf2-sha256\$100000\$([a-f0-9]{32})\$([a-f0-9]{64})$/,
  );
  if (!match?.[1] || !match[2]) return false;
  const salt = Uint8Array.from(match[1].match(/../g)!, (part) =>
    parseInt(part, 16),
  );
  const actual = await derive(password, salt);
  let difference = 0;
  for (let i = 0; i < actual.length; i++)
    difference |= actual.charCodeAt(i) ^ match[2].charCodeAt(i);
  return difference === 0;
}
