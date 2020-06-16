# VD-SerVis

Application dynamique de visualisation de données géographiques, développée en HTML-CSS-JS.

Cette version sert de support d'analyse et de visualisation pour le Mémoire de Master.

L'application VD-SerVis est hébergée sur serveur à l'URL suivant : [https://nmonach2.github.io/VD-SerVIS/](https://nmonach2.github.io/VD-SerVIS/)

L'utilisateur trouvera ci-après quelques informations relatives à cette application (aide, crédits, infos, etc...).

![alt text](https://github.com/nmonach2/VD-SerVis/blob/master/images/CaptureAppli.JPG)


# Fichiers de l'app
Les fichiers suivants figurent dans le présent répertoire et sont nécessaires au fonctionnement de l'application :
- `index_app.html` :  Script HTML - Structure de l'app (à lancer avec Chrome)
- `style_app.css` :   Script CSS - Styles de l'app
- `index_app.js` :    Script JavaScript - Interactivité de l'app
- `..._units.js` :    Fichiers de données en format JS - Localisation des unités de service et propriétés
- `..._hectares.js` : Fichiers de données en format JS - Localisation des hectares de référence et propriétés
- `favicon.ico` :     Logo de l'app
- `images` :          Dossier contenant les icônes et marqueurs utilisés dans l'app
- `data` :            Dossier contenant les données de localisation des unités de service en .csv
- `script` :          Dossier contenant le script d'allocation depuis OTP ayant permis de générer les données utilisées (cf rubrique "[Données](https://github.com/nmonach2/VD-SerVis/blob/master/README.md#donn%C3%A9es)")



# Description

VD-SerVis est une application permettant de visualiser l'accessibilité aux services d'urgence et de constater et quantifier les inégalités spatiales qui en résultent. 

Les services implémentés sont les suivants:
- Les services d'urgences hospitalières
- Les bases d'ambulances
- Les centres publics de consultation médicale
- Les pharmacies
- Les cabinets médicaux
- Les détachements de premiers secours (SDIS)
- Les détachements d'appui (SDIS)
- Les établissements scolaires secondaires, service public "test" (cf. dossier)

Les contraintes d'accessibilité et les temps de trajets sont des éléments particulièrement primordiaux en géographie de l'urgence, ce qui rend l'utilisation de VD-SerVis spécialement intéressante. En considérant que toutes les unités de service sont qualitativement égales, c'est le **temps de trajet** qui agit comme composante prédominante dans le choix de l'une d'entre elles. 

L'application VD-SerVis est destinée à des fins informatives et instructives pour le grand public, ainsi qu'à des fins de planification, d'évaluation et de prévention pour les responsables des services de santé. Finalement, elle sert de support aux analyses menées dans le présent Mémoire de Master.


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

### Les paramètres de sélection

En premier lieu, l'utilisateur est invité à interagir avec les **paramètres de sélection** en 3 étapes successives:
1. Choix du type de service
2. Choix des unités de service
3. Choix du temps de trajet maximum
Il est en outre possible de choisir le mode de décompte de la population et de visualiser les densités.

Trois différents moyens de sélection des unités ont été implémentés, afin d'améliorer l'ergonomie, le temps de sélection et les combinaisons possibles :
- Un formulaire de cases à cocher (checkboxes)
- Un clic sur les marqueurs de la carte (popup)
- Un outil lasso pour une sélection spatiale (plus d'infos sur cet outil [ici](https://github.com/zakjan/leaflet-lasso))

### La carte Leaflet

Elle contient les marqueurs relatifs au type de service sélectionné. Chacune de opérations de sélection provoque un évènement sur la **carte**, ce qui permet de mieux visualiser dans l'espace la sélection choisie et ses implications. Il est aussi possible - et recommandé - d'utiliser les fonctionnalités présentes sur l'espace de la carte afin de maximiser l'expérience utilisateur dans le choix de la sélection. Le fond de carte est également interchangeable et les coordonnées du pointeur de la souris (WGS84 [lat/lon]) sont reportées dans le coin inférieur gauche. 

### Les résultats de la sélection 

Finalement, les **résultats de la sélection** proposent une série de statistiques relatives à la sélection opérée. Elles varient de façon dynamique relativement aux modifications de sélection opérées par l'utilisateur.



# Données

### Temps de trajet et affiliation à un bassin
Les données relatives aux temps de trajet ont été extraites directement depuis le serveur d'OTP ([Open Trip Planner]( https://www.opentripplanner.org/)) grâce aux requêtes formulées dans le script python joint `script.py`. Après exécution du script, le fichier de données obtenu a été nettoyé et les quelques données manquantes ou soumises à un problème manifeste de calcul ont été corrigées par interpolation.

### Population
Les données relatives à la population sont issues du [recensement démographique sur la population et les ménages](https://www.bfs.admin.ch/bfs/fr/home/actualites/quoi-de-neuf.assetdetail.1442443.html) mené par l'Office Fédéral de la Statistique en 2015 et publié en 2016. Ces données sont disponibles à l'hectomètre, ce qui est à ce jour le plus fin niveau d'analyse qui puisse être mis à disposition.

### Unités de service
La localisation des unités de services a été obtenue en transformant les adresses physiques des établissements listés en coordonnées géographiques. La liste des unités, actualisée en 2020, proviennent de différents sources selon le type de service. Se rapporter au dossier pour consulter les sources spécifiques.

![alt text](https://github.com/nmonach2/VD-SerVis/blob/master/images/CaptureAppli2.JPG)

### Suggestions, remerciements et crédits
Toute suggestion de modification ou d'amélioration est la bienvenue.

Ce travail constitue mon premier projet de géovisualisation dynamique, il s'agit également de ma première expérience approfondie avec les langages HTML, CSS et JS et avec la programmation en général. De l'idée à l'implémentation, ...il n'y a de loin pas eu qu'un seul pas ! Le nombre d'heures de travail passées n'ont par conséquent pas été comptabilisées, et s'il fallait tout de même le faire, cela se monterait certainement autour des 1,5 - 2 Mio de secondes... sans compter les pauses !
Merci à ma famille, Samuel, Sandrine et Jean-François de m'avoir soutenu dans ces moments, alors même que vous n'y compreniez pas grand chose ! ;-)

Copyright © Nicolas Monachon - 2020
