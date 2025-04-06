
# 🎨 Documentation UI/UX – DoteDoteDone

## 🖌️ Thème et Couleurs

L'application utilise un thème **sombre et violet**, apportant un contraste marqué, une identité visuelle forte, et une lisibilité optimale sur écrans.  
Voici la palette utilisée :

| Couleur         | Code Hex     | Utilisation principale                       |
|-----------------|--------------|----------------------------------------------|
| Dark            | `#130e1b`    | Fond principal                               |
| Dark (alt)      | `#251a33`    | Fonds secondaires                            |
| Lighter Dark    | `#322547`    | Sections surélevées / hover                  |
| Hover Background| `#3a3550`    | Hover sur éléments cliquables                |
| Violet          | `#453f78`    | Accent, boutons principaux                   |
| Light Violet    | `#736cb2`    | Survol, hover, secondary buttons             |
| White (texte)   | `#d7d7ea`    | Texte principal                              |
| Grey (muted)    | `#aaa2af`    | Info, légendes, icônes secondaires           |

## 🅰️ Typographie

- La typographie utilisée est celle par **défaut d’Angular Material**, optimisée pour la lisibilité.
- Tailles harmonisées pour hiérarchie claire : titres, sections, paragraphes, boutons.

---

## 🧭 Parcours Utilisateur

- **Accueil** : Page listant tous les tickets de tous les workspaces.
- **Filtrage** : L’utilisateur peut filtrer par **workspace**.
- **Actions rapides** : Ajouter / éditer / supprimer des **cards**, **workspaces**, **boards** ou **lists**.
- **Navigation Kanban** : Via la navbar, on accède à une vue Kanban où :
  - Chaque workspace contient plusieurs boards.
  - Chaque board contient des listes avec des tickets (cards).
- **Drag & Drop** :
  - Les cartes peuvent être déplacées **entre listes** ou **réordonnées** dans une même liste.
  - Les listes peuvent aussi être déplacées, modifiées ou supprimées.

---

## 🧩 Composants UI

- **Navbar** persistante avec accès rapide aux vues principales.
- **Modales flottantes** pour :
  - Créer / Éditer une carte
  - Créer un workspace / board / list
  - Sélection de **template de board** à la création
- **Feedbacks utilisateurs** :
  - Snackbars pour succès / erreur
  - Messages de confirmation pour toutes les actions destructives (suppression)
  - Écran de chargement
  - Transitions douces (fade) lors des changements de page
  - Animation d’introduction à la première ouverture

---

## 📱 Responsive Design

- Interface complètement **responsive** :
  - Fonctionne sur **mobile, tablette, desktop**
  - Composants UI s’adaptent aux tailles d’écran
  - Menus se replient ou s’allègent selon le contexte

---

## 💡 Principes UX appliqués

- **Minimiser les actions** pour accéder aux fonctionnalités : 1 clic = 1 action utile
- **Visibilité des éléments cliquables**
- **Feedback immédiat** après chaque action
- **Confirmation explicite** pour toute action critique
- **Fluidité et transition douce** → fade, animation de bienvenue, etc.
- **Ergonomie pensée utilisateur** (logique de navigation claire, menus intuitifs)


