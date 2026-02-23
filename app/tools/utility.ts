import { encryptAES, decryptAES } from "./crypto";
export const utility = {

   responseCode(status: number): boolean {
    switch (status) {
      case 200: 
      case 201: 
        return true;
        
      case 400: 
        return false;

      case 401:
      case 403: 
        return false;

      case 404: 
        return false;

      case 405: 
        return false;

      case 500:
      case 502: 
        return false;

      default:
        return false;
    }
  },

  notifySuccess(msg: string) { 
    console.log("SUCCESS:", msg)
  },
  notifyWarning(msg: string) { 
    console.log("WARNING:", msg)
  },
  notifyError(msg: string) { 
    console.log("ERROR:", msg)
  },

  saveSession(key: string, value: any) {
     if (typeof window === "undefined") return;
     
    const encrypted = encryptAES(value);
    localStorage.setItem(key, encrypted);
  },
  
  readSession<T = any>(key: string): T | null {
    if (typeof window === "undefined") return null;

    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    console.log(encrypted)
    return decryptAES<T>(encrypted);
 },

 removeSecureItem(key: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
 }

}