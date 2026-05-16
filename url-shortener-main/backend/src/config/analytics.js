const UAParser = require("ua-parser-js");
const crypto = require("crypto");


exports.parseDevice= (userAgentString)=> {
  const ua = new UAParser(userAgentString);

  return {
    deviceType: ua.getDevice().type || "desktop",
    browser: ua.getBrowser().name || "Unknown",
    os: ua.getOS().name || "Unknown"
  };
}

exports.hashIp = async (ip) => {
  return crypto.createHash("sha256").update(ip).digest("hex");
}