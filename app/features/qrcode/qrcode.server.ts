import { createHmac, validateHmac } from "~/utils/hmac";
import { logout } from "../users/user.server";

const QRCODE_DURATION_IN_MILLISECONDS = 30 * 1000;

export function generateQrcode(req: Request, profileId: string) {
  const expiresIn = Date.now() + QRCODE_DURATION_IN_MILLISECONDS;
  const expiresInHmac = createHmac("private_key", expiresIn.toString(), {
    encoding: "base64url",
  });
  const url = process.env.URL!;

  try {
    return `${url}/profiles/${profileId}?key=${expiresInHmac}&exp=${expiresIn}`;
  } catch (error) {
    throw logout(req);
  }
}

export function validateQrCode(qrCodeUrl: string) {
  const url = new URL(qrCodeUrl);
  const exp = url.searchParams.get("exp");
  const key = url.searchParams.get("key");

  if (
    !key ||
    !validateHmac("private_key", key, exp || "", { encoding: "base64url" })
  ) {
    // TODO: move to errors
    throw new Error("Invalid key");
  }

  const maybeNumber = Number(exp);
  if (!maybeNumber || isNaN(maybeNumber)) {
    // TODO: move to errors
    throw new Error("Invalid exp");
  }

  const qrcodeExpired = Date.now() > Number(exp);
  if (qrcodeExpired) {
    // TODO: move to errors
    throw new Error("Qrcode expired");
  }

  return url;
}
