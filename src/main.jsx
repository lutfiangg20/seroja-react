import ReactDOM from "react-dom/client";
import App from "./App.jsx";
/* import { Provider } from "react-redux";
import store from "./stores/store.js"; */
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/inter";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  //   {/* <Provider store={store}> */}
  //   {/*  </Provider> */}
  // </React.StrictMode>
  <App />
);
