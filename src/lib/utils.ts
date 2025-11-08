// utils.ts

import { GeoCoordinates, ValidationResult } from "../types/types";
import { UserData } from "../types/types";

// If both UserData and GeoCoordinates are in the same file, combine the import:

/**
 * Vérifie si un objet possède toutes les propriétés spécifiées.
 */
export function ObjectHasProperties<T extends object>(
  obj: T,
  properties: (keyof T)[],
): boolean {
  if (!obj || typeof obj !== 'object' || !Array.isArray(properties)) {
    return false;
  }

  return properties.every((prop) =>
    Object.prototype.hasOwnProperty.call(obj, prop),
  );
}

/**
 * Retourne l'URL d'une Cloud Function
 */
export function getFunctionUrl(endpoint: string): string {
  return `${process.env.CLOUD_FUNCTION_BASE_ENDPOINT}/${endpoint}`;
}

/**
 * Calcule la distance entre deux coordonnées GPS en kilomètres (Haversine).
 */
export function calculateDistance(
  a: GeoCoordinates,
  b: GeoCoordinates,
): number {
  const R = 6371; // Rayon de la Terre en km
  const dLat = degreesToRadians(b.latitude - a.latitude);
  const dLon = degreesToRadians(b.longitude - a.longitude);
  const lat1 = degreesToRadians(a.latitude);
  const lat2 = degreesToRadians(b.latitude);

  const haversine =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
  return R * c;
}

/**
 * Convertit des degrés en radians.
 */
export function degreesToRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

// ==============================
// FONCTIONS DE VALIDATION
// ==============================

/**
 * Valide un numéro de téléphone camerounais (+237 suivi de 9 chiffres)
 */
export const validateCameroonPhone = (tel: string): boolean => {
  if (!tel) return false;
  const regex = /^\+237[6-9]\d{8}$/;
  return regex.test(tel);
};

/**
 * Valide un email
 */
export const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email) && email.length <= 254;
};

/**
 * Valide un nom ou prénom (min 2 caractères, max 50, lettres uniquement)
 */
export const validateName = (name: string): boolean => {
  if (!name) return false;
  const regex = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;
  const trimmed = name.trim();
  return regex.test(trimmed) && trimmed.length >= 2 && trimmed.length <= 50;
};

/**
 * Valide une URL (photoUrl)
 */
export const validatePhotoUrl = (url: string): boolean => {
  if (!url) return true; // Optionnel
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'https:' || urlObj.protocol === 'http:';
  } catch {
    return false;
  }
};

/**
 * Valide les données utilisateur complètes
 */
export const validateUserData = (userData: UserData): ValidationResult => {
  const errors: string[] = [];

  // UID
  if (
    !userData.uid ||
    typeof userData.uid !== 'string' ||
    userData.uid.length < 20
  ) {
    errors.push('UID invalide (doit être un identifiant Firebase valide)');
  }

  // Email
  if (!validateEmail(userData.email)) {
    errors.push('Email invalide');
  }

  // Nom
  if (userData.name && !validateName(userData.name)) {
    errors.push('Nom invalide (2-50 caractères, lettres uniquement)');
  }

  // Prénom
  if (userData.prenom && !validateName(userData.prenom)) {
    errors.push('Prénom invalide (2-50 caractères, lettres uniquement)');
  }

  // Téléphone
  if (userData.tel && !validateCameroonPhone(userData.tel)) {
    errors.push('Numéro de téléphone invalide (format: +237XXXXXXXXX)');
  }

  // Photo URL
  if (userData.photoUrl && !validatePhotoUrl(userData.photoUrl)) {
    errors.push('URL de photo invalide (doit être une image HTTPS valide)');
  }

  // Champs interdits
  const forbiddenFields = ['password', 'token', 'secret', '__'];
  Object.keys(userData).forEach((key) => {
    if (forbiddenFields.some((forbidden) => key.includes(forbidden))) {
      errors.push(`Champ interdit: ${key}`);
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
  };
};
