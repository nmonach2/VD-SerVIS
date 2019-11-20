# VD-SerVis
Outil dynamique de visualisation de l'accessibilité aux services publics

Application dynamique de visualisation de données géographiques, développée en HTML-CSS-JS. Une version plus complète avec de nouvelles fonctionnalités et données est à venir et servira de support d'analyse et de visualisation pour le Mémoire de Master directement.


![alt text](https://github.com/nmonach2/VD-SerVis/blob/master/images/CaptureAppli.JPG)



# Indications
L'application VD-SerVis est hébergée sur serveur à l'adresse suivante : [adresse à venir]

L'utilisateur trouvera ci-après quelques informations relatives à cette application (aide, crédits, infos, etc...).



# Description

VD-SerVis est une application permettant de visualiser l'accessibilité aux services publics et de constater et quantifier les inégalités spatiales qui en résultent. 

La version actuelle correspond à la phase terminale de conception. En adéquation avec l'approche TDD (test-driven-development), un seul prototype de service "prétexte" a été implémenté jusqu'à ce que la conception soit achevée : les établissements secondaires scolaires. Dans les prochaines mises à jours, d'autres services publics seront rajoutés, notamment dans le domaine de la santé, des secours et des urgences médicales, à savoir :
- Les services d'urgences hospitalières
- Les services de secours pré-hospitaliers (ambulances/SMUR)
- Les services de sauvetage et de secours (SDIS)
- Les permanences médicales
- Les pharmacies
- ...

Les contraintes d'accessibilité et les temps de trajets sont des éléments particulièrement primordiaux en géographie de l'urgence, ce qui rend l'utilisation de VD-SerVis spécialement intéressante. En considérant que toutes les unités de service sont qualitativement égales, c'est le temps de trajet qui agit comme composante prédominante dans le choix de l'une d'entre elles. 

L'application VD-SerVis est destinée à des fins informatives et instructives pour le grand public, ainsi qu'à des fins de planification, d'évaluation et de prévention pour les responsables des services de santé.



# Eléments d'interface

L'interface se divise en 4 blocs majeurs :
- A. **Le bandeau** sur le haut de l'écran
- B. **Les paramètres de sélection** sur la partie gauche de l'écran
- C. **La carte Leaflet** au centre de l'écran
- D. **Les résultats de la sélection** sur la partie droite de l'écran

![alt text](https://github.com/nmonach2/VD-SerVis/blob/master/images/blocs.png)

L'utilisateur peut interagir avec plusieurs éléments de l'interface (1-16 sur la carte ci-dessous) afin d'obtenir le visuel désiré ainsi que certains résultats dépendant de sa sélection (I - VI).

![alt text](https://github.com/nmonach2/VD-SerVis/blob/master/images/interface.png)



# Utilisation

## Les paramètres de sélection

En premier lieu, l'utilisateur est invité à interagir avec les **paramètres de sélection** en 3 étapes successives:
1. Choix du type de service
2. Choix des unités de service
3. Choix du temps de trajet maximum
Il est en outre possible d'afficher les densités de population.

Trois différents moyens de sélection des unités ont été implémentés, afin d'améliorer l'ergonomie, le temps de sélection et les combinaisons possibles :
- Un formulaire de cases à cocher (checkboxes)
- Un clic sur les marqueurs de la carte (popup)
- Un outil lasso pour une sélection spatiale (plus d'infos sur cet outil [ici](https://github.com/zakjan/leaflet-lasso))

## La carte Leaflet

Elle contient les marqueurs relatifs au type de service sélectionné. Chacune de opérations de sélection provoque un évènement sur la **carte**, ce qui permet de mieux visualiser dans l'espace la sélection choisie et ses implications. Il est aussi possible - et recommandé - d'utiliser les fonctionnalités présentes sur l'espace de la carte afin de maximiser l'expérience utilisateur dans le choix de la sélection. Le fond de carte est également interchangeable et les coordonnées du pointeur de la souris (WGS84 [lat/lon]) sont reportées dans le coin inférieur gauche. 

## Les résultats de la sélection 

Finalement, les **résultats de la sélection** proposent une série de statistiques relatives à la sélection opérée. Elles varient de façon dynamique relativement aux modifications de sélection opérées par l'utilisateur.



# Données

## Temps de trajet et affiliation à un bassin
Les données relatives aux temps de trajet ont été extraites directement depuis le serveur d'OTP ([Open Trip Planner]( https://www.opentripplanner.org/)) grâce aux requêtes formulées dans le script python joint `script.py`. Après exécution du script, le fichier de données obtenu a été nettoyé et les quelques données manquantes ou soumises à un problème manifeste de calcul ont été corrigées par interpolation.

## Population
Les données relatives à la population sont issues du [recensement démographique sur la population et les ménages](https://www.bfs.admin.ch/bfs/fr/home/actualites/quoi-de-neuf.assetdetail.1442443.html) mené par l'Office Fédéral de la Statistique en 2015 et publié en 2016. Ces données sont disponibles à l'hectomètre, ce qui est à ce jour le plus fin niveau d'analyse qui puisse être mis à disposition.

## Unités de service
La localisation des services publics (dans l'état actuel, celui des établissements scolaires secondaires vaudois) a été obtenue en transformant les adresses des établissements listés en coordonnées géographiques. La liste des unités, actualisée en 2019, provient du [site](https://www.vd.ch/toutes-les-autorites/departements/departement-de-la-formation-de-la-jeunesse-et-de-la-culture-dfjc/direction-generale-de-lenseignement-obligatoire-dgeo/les-etablissements-scolaires/) de l'Etat de Vaud

![alt text](https://github.com/nmonach2/VD-SerVis/blob/master/images/CaptureAppli2.JPG)

Copyright © 2019 - Nicolas Monachon
