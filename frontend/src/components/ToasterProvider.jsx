"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: { fontSize: "13px", borderRadius: "8px" },
        success: { iconTheme: { primary: "#2E8B57", secondary: "#fff" } },
        error:   { iconTheme: { primary: "#C0392B", secondary: "#fff" } },
      }}
    />
  );
}
