import configJson from "./auth_config.json";

const config = {
  googleAPIkey: process.env.REACT_APP_GOOGLE_API_KEY 
}

export function getConfig() {
  const audience =
    configJson.audience && configJson.audience !== "https://dev-3ax5h5jrbvuxe1xq.eu.auth0.com/api/v2/"
      ? configJson.audience
      : null;
    

  return {
    domain: configJson.domain,
    clientId: configJson.clientId,
    ...(audience ? { audience } : null),
  };
}

export default config;