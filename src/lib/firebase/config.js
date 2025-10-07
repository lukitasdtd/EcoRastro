"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storage = exports.db = exports.app = void 0;
// Importa las funciones que necesites de los SDKs que necesites
var app_1 = require("firebase/app");
var storage_1 = require("firebase/storage");
var firestore_1 = require("firebase/firestore");
// TODO: Agrega la configuración de tu proyecto de Firebase
// Para un despliegue web, esto suele estar disponible en la consola de Firebase
// en Configuración del Proyecto > General > Tus apps > App web de Firebase > Configuración.
var firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
// Inicializa Firebase
var app = !(0, app_1.getApps)().length ? (0, app_1.initializeApp)(firebaseConfig) : (0, app_1.getApp)();
exports.app = app;
var db = (0, firestore_1.getFirestore)(app);
exports.db = db;
var storage = (0, storage_1.getStorage)(app);
exports.storage = storage;
