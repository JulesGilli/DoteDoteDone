
# 📘 Documentation Technique – DoteDoteDone

## 👨‍💻 Auteur
**Jules GILLI**  
Projet réalisé dans le cadre du module `T-DEV-600`.

---

## 1. Architecture Générale

DoteDoteDone est une application Angular orientée gestion de projet, connectée à l’API Trello.  
Elle est structurée de manière modulaire avec séparation claire des responsabilités :
- **Composants** pour l’interface
- **Services** pour la logique métier et les appels API
- **Store NgRx** pour la gestion d’état globale
- **Modèles TypeScript** pour typer les données
- **Gestion des modales** via des composants dédiés

---

## 2. Structure du projet

```
src/
├── app/
│   ├── components/        # UI : cards, boards, lists, modals, etc.
│   ├── services/          # Appels API et logique métier
│   ├── store/             # Gestion d’état via NgRx
│   ├── models/            # Interfaces TypeScript pour les données
│   ├── api/               # Fonctions encapsulées pour l’API Trello
│   └── data/dataAPI/      # Données mockées ou traitées
├── environments/          # Variables d’environnement (clé/token)
└── index.html
```

---

## 3. Modèles principaux

- `CardModel`: id, name, desc, idList
- `ListModel`: id, name, idBoard
- `BoardModel`: id, name, desc
- `WorkspaceModel`: id, name
- `MemberModel`: id, fullName, username

---

## 4. Services

| Service             | Rôle |
|---------------------|------|
| `CardService`       | CRUD pour les cartes |
| `BoardService`      | Gestion des tableaux |
| `ListService`       | Gestion des listes |
| `MemberService`     | Récupère les membres |
| `AuthService`       | Gestion de l’auth Trello |
| `ApiTrelloService`  | Requêtes HTTP Trello |

---


## 5. Cycle de vie Angular

- `ngOnInit()` pour initialiser les données depuis le store
- `ngOnDestroy()` pour le nettoyage
- Utilisation d’observables combinées (`combineLatest`, `mergeMap`)
- Data binding via `async pipe` dans le HTML

---

## 6. Sécurité

- Les clés Trello sont définies dans `environment.ts`
- Le fichier n’est **pas versionné** pour des raisons de sécurité

---

## 7. API Trello utilisée

Exemples d’appels :
- `GET /1/boards/` → récupérer les boards
- `POST /1/cards/` → créer une carte
- `PUT /1/cards/{id}` → modifier une carte
- `DELETE /1/cards/{id}` → supprimer une carte
- Auth via `key` et `token`

---
