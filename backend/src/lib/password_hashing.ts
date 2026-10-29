import argon2 from "argon2";

export async function hashPassword(password: string) {
  const stored = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 64 * 1024, // 64 MiB
    timeCost: 3,
    parallelism: 1,
  });

  return stored;
}

export async function checkPassword(password: string, storedDigest: string) {
  try {
    return await argon2.verify(storedDigest, password);
  } catch {
    return false;
  }
}
