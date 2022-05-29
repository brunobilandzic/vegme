const CryptoJS = require("crypto-js");
const config = require("../config");
const mongoose = require("mongoose")


const generateHash = (user) => {
    const hmac = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA512,
      config.VERIFICATION_HASH_KEY
    );
    hmac.update(mongoose.Types.ObjectId(user._id).toString());
    hmac.update(user.username);
    hmac.update(user.email);
    
    return hmac.finalize().toString(CryptoJS.enc.Base64url);
  };
  
  const compareHashes = (user, hashClient) => {
    const hash = generateHash(user)
    return hash === hashClient;
  };

  module.exports = {
      generateHash,
      compareHashes
  }