// @flow
import { Provider } from "mobx-react";
import * as React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import stores from "stores";
import ErrorBoundary from "components/ErrorBoundary";
import ScrollToTop from "components/ScrollToTop";
import Theme from "components/Theme";
import Toasts from "components/Toasts";
import Routes from "./routes";
import env from "env";

let DevTools;
if (process.env.NODE_ENV !== "production") {
  DevTools = require("mobx-react-devtools").default; // eslint-disable-line global-require
}

const element = document.getElementById("root");

if (element) {
  render(
    <>
      <ErrorBoundary>
        <Provider {...stores}>
          <Theme>
            <Router>
              <>
                <ScrollToTop>
                  <Routes />
                </ScrollToTop>
                <Toasts />
              </>
            </Router>
          </Theme>
        </Provider>
      </ErrorBoundary>
      {DevTools && <DevTools position={{ bottom: 0, right: 0 }} />}
    </>,
    element
  );
}

window.addEventListener("load", async () => {
  // installation does not use Google Analytics, or tracking is blocked on client
  // no point loading the rest of the analytics bundles
  if (!env.GOOGLE_ANALYTICS_ID || !window.ga) return;

  // https://github.com/googleanalytics/autotrack/issues/137#issuecomment-305890099
  await import("autotrack/autotrack.js");

  window.ga("require", "outboundLinkTracker");
  window.ga("require", "urlChangeTracker");
  window.ga("require", "eventTracker", {
    attributePrefix: "data-",
  });
});
