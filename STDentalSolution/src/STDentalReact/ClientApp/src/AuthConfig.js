import { PublicClientApplication, AuthenticationResult, Configuration } from '@azure/msal-browser';
 
const ClientId = '363c1499-e1e3-445a-bd6d-d10ac6324b3e';
const Epam_AAD = 'b41b72d0-4e9f-4c26-8a69-f949f367c91d';
 
const config: Configuration = {
  auth: {
    authority: `https://login.microsoftonline.com/${ClientId}`,
    clientId: Epam_AAD,
    navigateToLoginRequestUrl: true,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: true,
  },
};
 
export const authenticationParameters = {
  scopes: [
    'https://analysis.windows.net/powerbi/api/App.Read.All',
    'https://analysis.windows.net/powerbi/api/Dataset.Read.All',
    'https://analysis.windows.net/powerbi/api/Dashboard.Read.All',
    'https://analysis.windows.net/powerbi/api/Report.Read.All',
  ],
};
 
export const msalObj = new PublicClientApplication(config);