import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ContextProvider } from "./contexts/Context";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Routes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
