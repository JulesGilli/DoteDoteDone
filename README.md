
# 📘 DoteDoteDone – Application de gestion de projet connectée à Trello

DoteDoteDone est une application Angular permettant de gérer des espaces de travail, tableaux, listes et cartes, connectée à l'API Trello.  
Elle propose une interface moderne avec Angular Material, une gestion d’état via NgRx, et une architecture modulaire orientée composants et services.

---

## 🚀 Lancement du projet

### Prérequis
- Node.js (version ≥ 18)
- Angular CLI : `npm install -g @angular/cli`

### Installation

```bash
npm install
```

### Lancer en développement

```bash
ng serve
```

Puis accéder à : [http://localhost:4200](http://localhost:4200)

### Build pour la production

```bash
ng build
```

---

## 📁 Structure du projet

```
src/
├── app/
│   ├── components/        # Composants Angular pour UI (Card, Board, Modal, etc.)
│   ├── services/          # Services pour les appels API, logique CRUD
│   ├── models/            # Modèles TypeScript (CardModel, BoardModel, etc.)
│   ├── store/             # NgRx Store (actions, reducers, effects)
│   ├── api/               # Fonctions liées à l’API Trello (encapsulées)
│   └── data/dataAPI/      # Données mockées ou transformées
├── environments/          # Config environnements (clé/token Trello)
└── index.html
```

---

## 🔌 API Trello utilisée

- `GET /1/members/me`
- `POST /1/boards/`
- `PUT /1/cards/{id}`
- `DELETE /1/cards/{id}`
- Authentification via clé et token stockés dans `environment.ts`

---

## 🧱 Technologies

- Angular 15+
- NgRx pour la gestion d’état
- Angular Material pour l’UI
- Trello REST API
- Jasmine & Karma pour les tests unitaires

---

## 🧪 Tests

### Lancer les tests unitaires

```bash
ng test
```

> Tests réalisés avec Jasmine, Karma

---

