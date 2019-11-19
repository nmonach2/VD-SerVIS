# VD-SerVis
Outil dynamique de visualisation de l'accessibilité aux services publics

Application dynamique de visualisation de données géographiques, développée en HTML-CSS-JS. Une version plus complète avec de nouvelles fonctionnalités et données est à venir et servira de support d'analyse et de visualisation pour le Mémoire de Master directement.


![alt text](https://github.com/nmonach2/VD-SerVis/blob/master/images/CaptureAppli.JPG)

# Indications
L'application VD-SerVis est hébergée sur serveur à l'adresse suivante : adresse à venir
L'utilisateur trouvera ci-après quelques informations relatives à cette application (aide, crédits, infos, etc...).

# Description

VD-SerVis est une application permettant de visualiser l'accessibilité aux services publics et de constater et quantifier les inégalités spatiales qui en résultent. 

La version actuelle ne comprend pour l'instant qu'un prototype de service implémenté : les établissements secondaires scolaires. Dans les prochaines mises à jours, d'autres services publics y seront rajoutés, notamment dans le domaine de la santé, des secours et des urgences médicales. Les contraintes d'accessibilité et les temps de trajets sont des éléments notables dans la géographie de l'urgence, ce qui rend l'utilisation de VD-SerVis particulièrement intéressante.

# Utilisation

L'interface se divise en 3 blocs majeurs :
- **Les paramètres de sélection** sur la partie gauche de l'écran
- **La carte Leaflet** au centre de l'écran
- **Les résultats de la sélection** sur la partie droite de l'écran

L'utilisateur est invité à interagir avec les **paramètres de sélection** où il peut choisir notamment le type de service, sélecionner toutes ou partie des unités de service réparties sur le territoire vaudois, indiquer un temps de trajet maximal, et afficher les densités de population. Trois différents moyens de sélection ont été implémentés, afin d'améliorer l'ergonomie, le temps de sélection et les combinaisons possibles :
- Un formulaire de cases à cocher (checkboxes)
- Un clic sur un marqueur de la carte (popup)
- Un outil lasso pour une sélection spatiale

Chacune de ces opérations implique un évènement sur la **carte**, ce qui permet de mieux visualiser dans l'espace la sélection choisie et ses implications. Il est aussi possible - et recommandé - d'utiliser les fonctionnalités présentes sur l'espace de la carte afin de maximiser l'expérience utilisateur dans le choix de la sélection. Il est possible d'alterner le fond de carte.

Finalement, les **résultats de la sélection** proposent une série de statistiques relatives à la sélection opérée. Elles varient de façon dynamique relativement aux modifications de sélection opérées par l'utilisateur. Cette partie affiche :
- le nombre d'habitants dans la zone affichée sur la carte
- le nombre total d'habitants dans le bassin d'influence des unités sélectionnées
- le poucentage des habitants présents dans la sélection
- le temps de trajet moyen pondéré dans la zone affichée sur la carte
- le temps de trajet moyen pondéré dans le bassin d'influence des unités sélectionnées
- une appréciation de la qualité de l'accessibilité au service dans lesdits bassins (comparée à la moyenne pondérée vaudoise)
- un histogramme des temps de trajet relatif à la sélection


# Divers

Les données relatives aux temps de trajet ont été extraites directement depuis le serveur d'OTP (Open Trip Planner https://www.opentripplanner.org/) grâce aux requêtes formulées dans le script python joint `script.py`.

Les données relatives à la population sont issues du recensement démographique sur la population et les ménages mené par l'Office Fédéral de la Statistique en 2015 et publié en 2016 : https://www.bfs.admin.ch/bfs/fr/home/actualites/quoi-de-neuf.assetdetail.1442443.html. Ces données sont disponibles à l'hectomètre, ce qui est à ce jour le plus fin niveau d'analyse qui puisse être mis à disposition.

![alt text](https://github.com/nmonach2/VD-SerVis/blob/master/images/CaptureAppli2.JPG)

Copyright © 2019 - Nicolas Monachon
