import { fbCfg } from "./firebaseconfig";

export const environment = {
  production: true,
    firebase: {
  	apiKey: fbCfg.apiKey,
    authDomain: fbCfg.authDomain,
    databaseURL: fbCfg.databaseURL,
    projectId: fbCfg.projectId,
    storageBucket: fbCfg.storageBucket,
    messagingSenderId: fbCfg.messagingSenderId,
    appId: fbCfg.appId,
    measurementId: fbCfg.measurementId
  }
};
