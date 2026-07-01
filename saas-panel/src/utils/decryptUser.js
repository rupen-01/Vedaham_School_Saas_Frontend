import { KeyCofig } from "../config/KeyConfig";
import CryptoJS from "crypto-js";

export function DecryptUser (user){
     const decryptedUser = JSON.parse(
        CryptoJS.AES.decrypt(user, KeyCofig.Encrypt_Key).toString(CryptoJS.enc.Utf8)
      );

      return decryptedUser;
}


