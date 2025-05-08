import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Geçici olarak sabit değerler kullanıyoruz
// TODO: Bu değerleri .env dosyasından alacak şekilde güncelle
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "friends-app-xxxxx.firebaseapp.com",
  databaseURL: "https://friends-app-xxxxx.firebaseio.com",
  projectId: "friends-app-xxxxx",
  storageBucket: "friends-app-xxxxx.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app); 