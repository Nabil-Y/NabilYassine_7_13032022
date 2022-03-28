# Développez un algorithme de recherche avec JavaScript

## Site

[Les petits plats](https://nabil-y.github.io/NabilYassine_7_13032022/)

## Objectifs

> - Intégrer les maquettes pour avoir un site responsive
> - Afficher dynamiquement des éléments HTML à partir d'un JSON
> - Implémenter une fonction de recherche avec JavaScript

## Maquettes

Le style du site étant minimaliste et ne demandant pas énormément de lignes, j'ai opté pour l'utilisation de CSS sans framework/préprocesseur et d'un fichier reset pour assurer une compatibilité internavigateurs.

Pour la mise en place du responsive, j'ai utilisé un affichage **grid** avec les propriétes **repeat** et **auto-fill** qui permet de rendre une grille responsive avec le moins de code possible.

```css
grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
```

## Affichage dynamique

Pour ce qui est de la création dynamique des cartes et des listes, j'ai décidé d'utiliser des templates HTML.

Il suffit de placer une balise < template > à la fin de la balise < body > du HTML et d'y insérer des élements enfants qui seront réutilisables dans le JS.

Le navigateur ne lira pas le contenu de la balise template à l'écran mais comme on peut le récupérer dans le JavaScript c'est un moyen pratique de ne pas travailler avec des méthodes **.innerHTML**.

```html
<template>
  <li data-search-li><a></a></li>
</template>
```

On pourra ensuite récupérer le contenu plus tard en clonant le contenu du template.

```js
const li = document.querySelector("template").content.cloneNode(true)
  .children[0];
```

Si on selectionne juste le template, on aura un fragment de document inutilisable, il faut donc cloner des éléments présents dans le template pour pouvoir les réutiliser et ajouter des données dans les balises.

## Algorithme de recherche

Les recettes du site sont stockées dans une variable **recipes** qui contient les données au format JSON.

L'objectif est de récupérer les informations et de filtrer les recettes affichées en fonction de l'entrée de l'utilisateur dans la barre de recherche.

Il y a aussi la possibilité d'affiner cette recherche à l'aide de filtres dans les champs de recherche secondaire.

Pour se faire, j'ai crée une fonction qui affiche les cartes et une fonction qui affiche les listes en fonction d'un paramètre **data** qui represente l'ensemble des recettes à notre disposition.

> Choix de l'algorithme de recherche
>
> - Boucles For
> - Méthodes Array (filter, some)

La fonction de recherche a été isolée dans le fichier search.js afin de réaliser des tests et de vérifier plus éfficacement la performance.

La fonction de recherche se relance à chaque changement de valeur dans les barres de recherches avec l'événement **input** et appelle les fonctions de création de carte et de listes pour mettre à jour la page.

Tout le processus de vérification est documenté dans la [fiche d'investigation de fonctionnalité](https://github.com/Nabil-Y/NabilYassine_7_13032022/blob/dev/Fiche_d'investigation_de_fonctionnalite.pdf)
