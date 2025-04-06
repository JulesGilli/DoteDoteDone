
# 📘 README.md – DoteDoteDone

## 🎯 Présentation

DoteDoteDone est une application Angular de gestion de projet connectée à l’API Trello. Elle permet :
- la gestion des workspaces, boards, listes et cartes,
- l’assignation de membres à une carte,
- une interface claire et responsive via Angular Material.

---

## 🚀 Lancement du projet

### Prérequis
- Node.js (≥ 18)
- Angular CLI : `npm install -g @angular/cli`

### Installation

```bash
npm install
```

### Démarrer en développement

```bash
ng serve
```
Puis ouvrir [http://localhost:4200](http://localhost:4200)

### Build production

```bash
ng build
```

Les fichiers compilés sont générés dans `dist/front-end/`.

---

## 🧪 Tests

### Tests unitaires

```bash
ng test
```

### Tests end-to-end (optionnel)

```bash
ng e2e
```

> ℹ️ Vous pouvez intégrer Cypress ou Playwright pour les e2e.

---

## 🧱 Structure du projet

```
front-end/
├── src/
│   ├── app/               # Composants, services, store
│   │   ├── components/
│   │   ├── services/
│   │   ├── store/
│   │   └── models/
│   ├── environments/      # Config dev/prod
│   └── index.html
├── angular.json
├── package.json
└── README.md
```

---

## 🛠️ Technologies utilisées

- Angular 19
- NgRx (gestion d’état)
- Angular Material
- Trello REST API

---

## 🔐 API Trello

- `GET /1/members/me`
- `POST /1/boards/`
- `PUT /1/cards/{id}`
- `DELETE /1/cards/{id}`
- …

La clé API et le token sont à configurer dans `environment.ts`.

---

