import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY; 


export function encryptAES(value: unknown): string {
  const text = JSON.stringify(value);
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
}

export function decryptAES<T = any>(cipherText: string): T | null {
  try {
    const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted ? JSON.parse(decrypted) : null;
  } catch {
    return null;
  }
}
