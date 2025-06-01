import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8180',
    realm: 'ZeniVault',
    clientId: 'finance-client'
});

const initKeycloak = (): Promise<Keycloak> => {
    return new Promise((resolve, reject) => {
        keycloak.init({ onLoad: 'check-sso', checkLoginIframe: false })
            .then(authenticated => {
                if (authenticated) {
                    const token = keycloak.token;
                    console.log('Token:', token); //później usuń (do testowania w postman)

                    // odświażanie tokena
                    setInterval(() => {
                        keycloak.updateToken(30).catch(() => {
                            console.error('Failed to refresh token');
                        });
                    }, 10000);
                }
                resolve(keycloak);
            })
            .catch(error => reject(error));
    });
};

export { keycloak, initKeycloak };