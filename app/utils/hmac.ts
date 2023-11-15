import crypto from "node:crypto";

interface HmacOpts {
  encoding: crypto.BinaryToTextEncoding;
}

export const createHmac = (
  privateKey: string,
  data: string,
  opts?: HmacOpts
) => {
  const hmac = crypto.createHmac("sha256", privateKey);
  return hmac.update(data).digest(opts?.encoding ?? "hex");
};

export const validateHmac = (
  privateKey: string,
  hmacToValidate: string,
  data: string,
  opts?: HmacOpts
) => {
  const hmac = crypto.createHmac("sha256", privateKey);
  return hmac.update(data).digest(opts?.encoding ?? "hex") === hmacToValidate;
};
