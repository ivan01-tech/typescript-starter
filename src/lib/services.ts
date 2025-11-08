import nodemailer from "nodemailer";

export const TECHSERVICES_PASS = "dzwf xcle fplw znsm";
export const SENDER_EMAIL = "ivansilatsa@gmail.com"; // Email expéditeur

// Configuration SMTP (à ajuster selon votre fournisseur)
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Exemple avec Gmail, remplacez par votre serveur SMTP
  port: 587,
  secure: false, // true pour 465, false pour autres ports
  auth: {
    user: SENDER_EMAIL, // Remplacez par votre email SMTP
    pass: TECHSERVICES_PASS, // Remplacez par votre mot de passe ou token
  },
  tls: {
    rejectUnauthorized: false, // Optionnel, pour contourner les erreurs de certificat (non recommandé en production)
  },
});

export const FIREBASE_COLLECTIONS = {
  USERS: "client",
  TECHNICIANS: "Techniciens",
  Users: "Users",
  DISCUSSIONS: "discussions",
  MESSAGES: "messages",
  ENTREPRISE_BTP: "EntrepriseBtp",
  ADMINISTRATEUR: "Administrateur",
  ARCHITECTURE: "Architecture",
  ANNONCES: "Annonces",
  ANNULATION: "Annulation",
  BESOINS: "Besoins",
  BUREAU_ETUDE_BTP: "BureaudEtudeBTP",
  CV_RECRUTEMENTS: "CVrecrutements",
  CALENDRIER: "Calendrier",
  COMMENTAIRES: "Commentaires",
  CONSTANTES: "Constantes",
  DEMANDE_SERVICES: "DemandeServices",
  DEMANDE_SERVICES_BUREAU: "DemandeServicesBureau",
  DEVIS: "Devis",
  DEVIS_QUINCAILLER: "DevisQuincailler",
  DIAGNOSTICS: "Diagnostics",
  GLOBAL_SERVICE_WEB: "Globalserviceweb",
  LOCATIONS: "Lacations", // <- vérifie l’orthographe, "Locations" ?
  LIKES: "Likes",
  NOTE: "Note",
  NOTIFICATION: "Notification",
  PAIEMENT_SERVICES: "PaiementServices",
  PROGRAMMER_SERVICES: "ProgrammerServices",
  QUINCAILLERIE: "Quincaillerie",
  SERVICE_BUREAU_ETUDE: "ServiceBureauEtude",
  SERVICE_ENTREPRISE_BUREAU: "ServiceEntrepriseBureau",
  SERVICES: "Services",
  SERVICES_ENTREPRISE_ARCHITECTURE: "ServicesEntrepriseArchitecture",
  SERVICES_ENTREPRISE_BTP: "ServicesEntrepriseBTP",
  ADMINS_NOTIFICATIONS: "adminsNotifications",
  NOTIFICATION_QUINCAILLERIE: "notificationQuincaillerie",
  PAIEMENT_QUINCAILLER: "paiementQuincailer",
  SPECIALITE_QUINCAILLERIE: "specialitequincaillerie",
  SUBSECTORS: "subsectors",
  TECHNICIENS: "techniciens",
  TICKET_CLIENT: "ticketClient",
};
