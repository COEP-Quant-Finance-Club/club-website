import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

function Root() {
  try {
    return <App />;
  } catch (err) {
    console.error(err);
    return <div style={{padding:20}}>App crashed. Check console.</div>;
  }
}

createRoot(document.getElementById("root")!).render(
  <HashRouter>
    <Root />
  </HashRouter>
);