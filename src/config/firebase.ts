import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import config from "./config";
import { getFirestore } from "firebase/firestore";

export const firebase = initializeApp(config.firebase);
export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const catsDB = "example-app-data";
