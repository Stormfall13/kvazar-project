import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';


const AuthOProviderWithNavigate = ({ children }) => {

  
  const domain = 'dev-trjl8eirx68x8ei5.us.auth0.com';
  const clientId = 'fksQ2qdol2plzExE2jVA8pDspAx0o7wx' ;
  const redirectUri = 'http://localhost:3000' ;

  // Проверка наличия всех необходимых переменных окружения
  try {
    if (!domain || !clientId || !redirectUri) {
      throw new Error("Unable to initalise auth");
      
    }
  } catch (error) {
    console.log(error);
  }
  // Callback функция для обработки редиректа после аутентификации
  const onRedirectCallback = (appState, user) => {
    console.log("USER", user);
  }

  // Рендер компонента Auth0Provider
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}

export default AuthOProviderWithNavigate;

