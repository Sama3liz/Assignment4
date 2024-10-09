import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBuQGJ3PvRpzEX73VJWbBjRrVoNcVnPRKw",
  authDomain: "portfolio-v1-edisonnacato.firebaseapp.com",
  projectId: "portfolio-v1-edisonnacato",
  storageBucket: "portfolio-v1-edisonnacato.appspot.com",
  messagingSenderId: "74043737504",
  appId: "1:74043737504:web:5c468b69034da71b8690c5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const loginWithEmailAndPassword = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const loginWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

const logout = () => {
  return signOut(auth);
};

const showModal = (title, message) => {
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  const myModal = new bootstrap.Modal(document.getElementById("myModal"));
  myModal.show();
};

document.addEventListener("DOMContentLoaded", () => {
  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    document.getElementById("loginForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      loginWithEmailAndPassword(email, password)
        .then(() => {
          window.location.href = "/home.html";
        })
        .catch((error) => {
          showModal("Error", `Error: ${error.message}`);
        });
    });

    document.getElementById("googleSignInBtn").addEventListener("click", () => {
      loginWithGoogle()
        .then(() => {
          window.location.href = "/home.html";
        })
        .catch((error) => {
          showModal(
            "Error",
            `Error en el inicio de sesión con Google: ${error.message}`
          );
        });
    });
  }

  if (window.location.pathname.includes("home.html")) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        document.getElementById("userEmail").textContent =
          user.email || "No email available";
      } else {
        window.location.href = "/index.html";
      }
    });

    document.getElementById("logoutBtn").addEventListener("click", () => {
      logout()
        .then(() => {
          window.location.href = "/index.html";
        })
        .catch((error) => {
          showModal("Error", `Error: ${error.message}`);
        });
    });
  }
});
