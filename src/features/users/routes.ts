import { onRequest } from "firebase-functions/https";
import { corsMiddleware } from "../../middleware/cors.middleware";
import * as functions from "firebase-functions";
import { createUserController } from "./controllers";

export const createUserCors = onRequest(async (req, res) => {
  if (corsMiddleware(req, res)) return;
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  try {
    const { uid, email, ...rest } = req.body;
    const user = await createUserController(uid, email, rest);

    return res.json({ ok: true, message: "Benutzer erstellt", user });
  } catch (err: any) {
    functions.logger.error("createUser Fehler:", err);
    return res
      .status(err.status || 500)
      .json({ ok: false, message: err.message || "Serverfehler", errors: err.errors });
  }
});
