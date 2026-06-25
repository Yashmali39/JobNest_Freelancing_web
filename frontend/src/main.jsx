import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import {
  Toaster,
} from "react-hot-toast";

import {
  RoleProvider,
} from "./context/RoleContext";

import "./index.css";

import {
  AuthProvider,
} from "./context/AuthContext";

ReactDOM.createRoot(
  document.getElementById(
    "root"
  )
).render(
  <AuthProvider>
    <RoleProvider>
      <App />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background:
              "#111111",
            color:
              "#ffffff",
            border:
              "1px solid #262626",
          },
        }}
      />
    </RoleProvider>
  </AuthProvider>
);