
# 📘 Documentation Technique – DoteDoteDone

---

## 1. Architecture Générale

DoteDoteDone est une application Angular connectée à l’API REST de Trello.  
Elle se compose de :

- **Frontend Angular** : interface utilisateur, logique métier, NgRx store.
- **Backend distant** : API officielle de Trello (requêtes HTTP avec token).

L’ensemble de la logique d’appel API est centralisée dans des services, et l’état global est géré avec NgRx.

---

## 2. Structure de l’application

```
front-end/
├── app/
│   ├── components/        # Composants Angular
│   ├── services/          # Services métier + API
│   ├── store/             # NgRx (actions, reducers, effects)
│   └── models/            # Interfaces TypeScript
├── environments/          # Fichiers de configuration
└── index.html             # Point d’entrée de l’application
```

---

## 3. Composants principaux

| Composant             | Rôle |
|-----------------------|------|
| `AppComponent`        | Composant racine |
| `BoardComponent`      | Affiche un tableau |
| `CardComponent`       | Affiche et édite une carte |
| `ListComponent`       | Contient des cartes |
| `WorkspaceComponent`  | Gère les workspaces |
| `HeaderComponent`     | Barre de navigation |

---

## 4. Services principaux

| Service                | Description |
|------------------------|-------------|
| `TrelloApiService`     | Gère toutes les requêtes vers l’API Trello |
| `BoardService`         | Logique métier des boards |
| `CardService`          | Gestion des cartes Trello |
| `StoreService`         | Gestion de l’état avec NgRx |

---

## 5. Architecture de l’état (NgRx)

Chaque **feature** (`boards`, `cards`, etc.) contient :
- `actions.ts`
- `reducers.ts`
- `effects.ts`
- `selectors.ts`

Ce pattern permet une **séparation claire** de la logique métier et une **gestion unifiée** des effets asynchrones.

---

## 6. Cycle de vie (Angular)

Les composants suivent le cycle classique Angular :
- `ngOnInit()` pour l’initialisation (ex : récupération des données)
- `ngOnDestroy()` pour le nettoyage (désabonnement aux observables)
- Utilisation de `async pipe` pour lier les Observables au template HTML

---

## 7. API Trello utilisée

| Méthode | Endpoint                  | Description |
|---------|---------------------------|-------------|
| GET     | `/1/members/me`           | Récupérer l’utilisateur connecté |
| POST    | `/1/boards/`              | Créer un nouveau board |
| PUT     | `/1/cards/{id}`           | Modifier une carte |
| DELETE  | `/1/cards/{id}`           | Supprimer une carte |

> La clé et le token API doivent être définis dans `environment.ts`.

---

## 8. Dépendances techniques

- Angular 19
- NgRx
- Angular Material
- Trello REST API
- Karma / Jasmine pour les tests

---

## 9. Sécurité

Les identifiants API sont stockés dans `environment.ts` (non versionné).  

---

