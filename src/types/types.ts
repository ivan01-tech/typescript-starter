// types.ts
export interface GeoCoordinates {
  latitude: number;
  longitude: number;
}

export interface UserData {
  uid: string;
  email: string;
  name?: string;
  prenom?: string;
  tel?: string;
  photoUrl?: string;
  [key: string]: any; // Permet d'accepter des champs dynamiques
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
