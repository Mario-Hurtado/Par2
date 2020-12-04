import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { IntlProvider } from "react-intl";
import localeEsMessages from "./locales/espanol";
import localeEnMessages from "./locales/ingles";

const userLang = navigator.language || navigator.userLanguage;

ReactDOM.render(
  <React.StrictMode>
    <IntlProvider
      locale={userLang}
      messages={
        userLang.substring(0, 2) === "es" ? localeEsMessages : localeEnMessages
      }
    >
      <App />
    </IntlProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
