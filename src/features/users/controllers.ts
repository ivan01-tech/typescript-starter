// import { FIREBASE_COLLECTIONS } from "../../lib/services";
// import { validateUserData } from "../../lib/utils";
import admin from "src/config/firebase-admin";
import { FIREBASE_COLLECTIONS } from "src/lib/services";
import { validateUserData } from "src/lib/utils";


const db = admin.firestore();

export async function createUserController(uid: string, email: string, data: any) {
  const userData = { uid, email, ...data };
  const validation = validateUserData({ uid, email });

  if (!validation.isValid) {
    throw { status: 400, message: "Daten ungültig", errors: validation.errors };
  }

  // Email prüfen
  const emailQuery = await db
    .collection(FIREBASE_COLLECTIONS.Users)
    .where("email", "==", email)
    .limit(1)
    .get();
  if (!emailQuery.empty) {
    throw { status: 409, message: "Email bereits benutzt" };
  }

  await db.collection(FIREBASE_COLLECTIONS.Users).doc(uid).set({
    ...userData,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    isActive: true,
  });

  return { uid, ...userData };
}
