import Keycloak from 'keycloak-connect';

export const keycloak = new Keycloak(
  {},
  {
    // clientId: 'myclient',
    'bearer-only': true,
    realm: 'myrealm',
    'auth-server-url': 'http://keycloak:8080',
    'ssl-required': 'external',
    resource: 'myclient',
    // 'public-client': true,
    'confidential-port': 8080,
  }
);
