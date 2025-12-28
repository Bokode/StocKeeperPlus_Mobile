# StocKeeper+ Mobile

Bienvenue sur la documentation de l'application mobile de **StocKeeper+**. Cette application permet de gérer la totalité des aliments présents chez vous.

## Fonctionnalités Principales

* **Affichage des stocks** : Vue d'ensemble des stocks présents dans votre maison.
* **Recettes** : Affichage de recettes adaptées aux aliments que vous possédez déjà, afin de savoir quoi cuisiner avec vos stocks.
* **Carte** : Une carte permettant d'aller acheter vos aliments au plus proche.
* **Calendrier** : Un calendrier vous permettant de visualiser les dates de péremption de tous vos aliments.
* **Notifications (optionnel)** : Alertes pour les aliments proches de la date de péremption.

## Technologies Utilisées

* **Environnement de développement & build** : [Expo (Metro Bundler)](https://expo.dev/)
* **Framework Mobile** : [React Native](https://reactnative.dev/)
* **Navigation** : [Expo Router](https://docs.expo.dev/router/introduction/)
* **Gestion d'état** : [Redux](https://redux.js.org/)
* **Icônes** : [FontAwesome](https://fontawesome.com/)
* **Stockage local** : [AsyncStorage](https://reactnative.directory/package/@react-native-async-storage/async-storage)
* **Requêtes HTTP** : Fetch API (avec gestion des identifiants/cookies)

## Prérequis

Pour lancer ce projet, vous avez uniquement besoin de :

* **Docker Desktop** (ou Docker Engine + Docker Compose) installé et lancé sur votre machine.
* **Le dossier StocKeeperPlusProject** contenant l'API et la base de données.

*L'API et la base de données sont conteneurisée et servies via Vite à l'intérieur de l'environnement Docker.*

## Installation & Démarrage

### Lancement de l'API et de la base de données

Ouvrez un terminal à la racine du dossier StocKeeperPlusProject (le dossier parent contenant `api` et `website`) et exécutez la commande :

```bash
docker compose up --build

```
*Le conteneur de l'API et de la base de données sera construit et lancé automatiquement.*


### Lancement de l'application mobile

Ouvrez un autre terminal à la racine du dossier StocKeeperPlusMobile et créez un fichier `.env` contenant 
```
EXPO_PUBLIC_IP_ADRESS=<votre_adresse_IP_locale>
```

Puis exécutez la commande :
```bash
npm start
```

### Vérification

Une fois le démarrage terminé :

* **Application mobile** : Accessible via le QR code ou l'URL.

