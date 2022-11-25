import type { ActionFunction } from "@remix-run/node"; // or cloudflare/deno
import { json } from "@remix-run/node";

import { cors } from 'remix-utils'
import { consumeAward, getAwardById } from "~/features/awards/awards.server";



export const action: ActionFunction = async ({
    request,
}) => {

    const payload = await request.json();

    if (payload.code == null) {
        return await cors(request, json({ message: "Invalid Code" }, 400), { origin: '*' });
    }

    const award = await getAwardById(payload.code)

    if (!award) {
        return await cors(request, json({ message: "Invalid Code" }, 400), { origin: '*' });
    }

    await consumeAward(payload.code);
    switch (request.method) {
        case "POST": {
            return await cors(request, json({
                success: !award.consumed,
                code: payload.code,
            }, 200), { origin: '*' });
        }
    }
};

