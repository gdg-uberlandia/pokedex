import { createHmac, validateHmac } from "~/utils/hmac";
import { logout } from "../users/user.server";
import ShowableError from "~/utils/errors";

const QRCODE_DURATION_IN_MS = 30 * 1000;

export function generateQrcode(req: Request, profileId: string) {
  const expiresIn = String(Date.now() + QRCODE_DURATION_IN_MS);
  const expiresInHmac = createHmac(process.env.PRIVATE_KEY!, expiresIn);
  const url = process.env.URL!;
  const expAsBase64 = btoa(expiresIn);
  try {
    return `${url}/profiles/${profileId}?key=${expiresInHmac}&exp=${expAsBase64}`;
  } catch (error) {
    throw logout(req);
  }
}

export function validateQrCode(qrCodeUrl: string) {
  const url = new URL(qrCodeUrl);
  const exp = atob(url.searchParams.get("exp") || "");
  const key = url.searchParams.get("key") || "";

  const maybeNumber = Number(exp);
  const isValidSearchParams = maybeNumber && !isNaN(maybeNumber) && exp;
  const isValidKey = validateHmac(process.env.PRIVATE_KEY!, key, exp);
  if (!isValidKey || !isValidSearchParams) {
    console.error("invalid qrcode");
    throw new ShowableError("Qrcode inválido ");
  }

  const qrcodeExpired = Date.now() > Number(exp);
  if (qrcodeExpired) {
    console.error("qrcode expired");
    throw new ShowableError("Qrcode expirado");
  }

  return url;
}
