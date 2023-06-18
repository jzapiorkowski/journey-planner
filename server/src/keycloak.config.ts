import Keycloak from 'keycloak-connect';

const config = {
  'confidential-port': 0,
  realm: 'myrealm',
  'auth-server-url': 'http://localhost:8080/',
  'ssl-required': 'external',
  resource: 'myapiclient',
  'bearer-only': true,
  'public-client': true,
};

export const keycloak = new Keycloak({}, config);
