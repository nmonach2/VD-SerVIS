

////////////////////-------- 1. MAP COMPONENTS --------////////////////////



/////////// ----- 1.1. Leaflet and basemaps ----- ///////////


// Add Leaflet map 

var map = L.map('mapdiv').setView([46.56598,6.57148], 12);
var mapsvg = L.svg('mapsvg').addTo(map) // include svg layer to map;


// Imagery and custom Mapbox basemaps definition

var esriImagery = L.tileLayer(
  'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/t\ile/{z}/{y}/{x}', {
    attribution: '&copy; <a href="http://www.esri.com">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
);
var mapbox_noalt = L.tileLayer(
  'https://api.mapbox.com/styles/v1/nmonach2/cjcapgfny0z7n2so5eqjw1hu7/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm1vbmFjaDIiLCJhIjoiY2pjYWxubjE5MGE4cjJ3bzJzcmQ4NGozcyJ9.TEgutrRKiZ9QAjSKlQYlfw', {
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }
);
var mapbox_full = L.tileLayer(
  'https://api.mapbox.com/styles/v1/nmonach2/cjcfj6mmv5cv62sp2qy8y9wpo/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoibm1vbmFjaDIiLCJhIjoiY2pjYWxubjE5MGE4cjJ3bzJzcmQ4NGozcyJ9.TEgutrRKiZ9QAjSKlQYlfw',{
    attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  }
);


// Create basemaps set

var baseLayers = {
    "Carte complète": mapbox_full,
    "Carte vierge": mapbox_noalt,
    "Photos aériennes ESRI": esriImagery
};


// Add basemap set to map

var overlays = {};
L.control.layers(baseLayers, overlays).addTo(map);

mapbox_full.addTo(map);


//Display of coordinates according to the location of the mouse pointer

map.on('mousemove', function(e){
  var coord = e.latlng;
  $('#coordinates').html('&emsp;&emsp;<b>Coordonnées:</b> ' + coord.lat.toFixed(5) +' / '+ coord.lng.toFixed(5)); 
});



/////////// ----- 1.2. Markers ----- ///////////


//Set default marker properties

var marker = L.Icon.extend({
    options: {
    iconSize: [29, 37],
    iconAnchor: [14.5, 37],
    popupAnchor: [0, -28]
    }
});


// Initializing schools markers (ECS)

var ECS_units_layer = L.geoJson(ECS_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/ECS_marker.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM + "</b>"
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=select_popup()'+'>Sélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
ECS_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/ECS_marker.svg"]').hide("slow");


// Initializing selected schools markers (ECS)

var ECS_sel_units_layer = L.geoJson(ECS_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/ECS_marker_sel.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM +"</b>"
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=unselect_popup()'+'>Désélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
ECS_sel_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/ECS_marker_sel.svg"]').hide("slow");
        
        
// Initializing ambulance markers (AMB)

var AMB_units_layer = L.geoJson(AMB_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/AMB_marker.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.ORGANISATI + " - " + feature.properties.ANTENNE+"</b>"
            + "<br>" + feature.properties.COMPL
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=select_popup()'+'>Sélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
AMB_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/AMB_marker.svg"]').hide("slow");
        
        
// Initializing selected ambulance markers (AMB)

var AMB_sel_units_layer = L.geoJson(AMB_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/AMB_marker_sel.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.ORGANISATI + " - " + feature.properties.ANTENNE+"</b>"
            + "<br>" + feature.properties.COMPL
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=unselect_popup()'+'>Désélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
AMB_sel_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/AMB_marker_sel.svg"]').hide("slow");
        

               
// Initializing hospital emergencies markers (URG)

var URG_units_layer = L.geoJson(URG_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/URG_marker.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=select_popup()'+'>Sélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
URG_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/URG_marker.svg"]').hide("slow");
        
        
// Initializing selected hospital emergencies markers (URG)

var URG_sel_units_layer = L.geoJson(URG_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/URG_marker_sel.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=unselect_popup()'+'>Désélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
URG_sel_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/URG_marker_sel.svg"]').hide("slow");


// Initializing public consultation centers markers (CDC)

var CDC_units_layer = L.geoJson(CDC_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/CDC_marker.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=select_popup()'+'>Sélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
CDC_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/CDC_marker.svg"]').hide("slow");
        
        
// Initializing selected public consultation centers markers (CDC)

var CDC_sel_units_layer = L.geoJson(CDC_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/CDC_marker_sel.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=unselect_popup()'+'>Désélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
CDC_sel_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/CDC_marker_sel.svg"]').hide("slow");

             
// Initializing intensive care facilities markers (SOI)

var SOI_units_layer = L.geoJson(SOI_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/SOI_marker.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM
            + "<br>" + feature.properties.SITE +"</b>" 
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=select_popup()'+'>Sélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
SOI_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/SOI_marker.svg"]').hide("slow");
        
        
// Initializing selected intensive care facilities markers (SOI)

var SOI_sel_units_layer = L.geoJson(SOI_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/SOI_marker_sel.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=unselect_popup()'+'>Désélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
SOI_sel_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/SOI_marker_sel.svg"]').hide("slow");
        

// Initializing first-aid detachments markers (DPS)

var DPS_units_layer = L.geoJson(DPS_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/DPS_marker.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.CODE + " - " + feature.properties.SDIS
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=select_popup()'+'>Sélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
DPS_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/DPS_marker.svg"]').hide("slow");
        
        
// Initializing selected first-aid detachments markers (DPS)

var DPS_sel_units_layer = L.geoJson(DPS_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/DPS_marker_sel.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.CODE + " - " + feature.properties.SDIS
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=unselect_popup()'+'>Désélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
DPS_sel_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/DPS_marker_sel.svg"]').hide("slow");


// Initializing support detachments markers (DAP)

var DAP_units_layer = L.geoJson(DAP_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/DAP_marker.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.CODE + " - " + feature.properties.SDIS
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=select_popup()'+'>Sélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
DAP_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/DAP_marker.svg"]').hide("slow");
        
        
// Initializing selected support detachments markers (DAP)

var DAP_sel_units_layer = L.geoJson(DAP_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/DAP_marker_sel.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.CODE + " - " + feature.properties.SDIS
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=unselect_popup()'+'>Désélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
DAP_sel_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/DAP_marker_sel.svg"]').hide("slow");


// Initializing pharmacies markers (PHA)

var PHA_units_layer = L.geoJson(PHA_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/PHA_marker.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=select_popup()'+'>Sélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
PHA_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/PHA_marker.svg"]').hide("slow");
        
        
// Initializing selected pharmacies markers (PHA)

var PHA_sel_units_layer = L.geoJson(PHA_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/PHA_marker_sel.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.ADRESSE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=unselect_popup()'+'>Désélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
PHA_sel_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/PHA_marker_sel.svg"]').hide("slow");


// Initializing doctors markers (MED)

var MED_units_layer = L.geoJson(MED_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/MED_marker.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.ADRESSE + ", " + feature.properties.VILLE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=select_popup()'+'>Sélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
MED_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/MED_marker.svg"]').hide("slow");
        
        
// Initializing selected doctors markers (MED)

var MED_sel_units_layer = L.geoJson(MED_units, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: new marker({iconUrl: "images/markers/MED_marker_sel.svg"})});
    }, 
    onEachFeature: function(feature, dataLayer) {
        var popupText =  
            "<b>" + feature.properties.NOM+"</b>"
            + "<br>" + feature.properties.ADRESSE + ", " + feature.properties.VILLE
            + "<br>" + "<br>" + '<button ion-button clear round onclick=unselect_popup()'+'>Désélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); 
        }});   
MED_sel_units_layer.addTo(map);
$('.leaflet-pane img[src="images/markers/MED_marker_sel.svg"]').hide("slow");
        
        
        
////////////////////-------- 2. SERVICE TYPE SELECTION --------////////////////////



/////////// ----- 2.1. jQuery plug-in for dropdown list ----- ///////////


// Creating a dropdown list to select service type
// (Inspired from a tutorial by Pierre Schwartz on developpez.com : https://khayyam.developpez.com/articles/web/javascript/jquery/plugin/)

(function($) {
//Plug-in definition
    $.fn.imgDropDown = function(options) {   
       
        // Defining the default settings
        var defaults = {
            title: "",
            selectEvent: null
        };   
        // Combination of provided and default settings
        var opts = $.extend(defaults, options);       
               
        // Creating a list of service types
        function createList(f){
            // Creating the first zone (always visible), displaying the selected option
            var cell = $('<div class="dropdownCell" id ="dropdownCell">' + opts.title + '</div>');
           
            // Creating the second zone, displaying all other options
            var dropdown = $('<div class="dropdownPanel"></div>');               
                       
            $(this).find("li").each(function(){
            dropdown.append($('<div class="dropdownOpt"></div>')
                    .click(onSelect)
                    .attr("value", $(this).attr("value"))
                    .append($(this).html())       
                    .hover(function(){$(this).addClass("dropdownOptSelected");},
                           function(){$(this).removeClass("dropdownOptSelected");})
                );
            });

            // Hiding the drop-down box
            dropdown.hide();
            $.data(cell, "visible", false);
           
            // Replacing the <ul> tag by our personalized list
            $(this).after(dropdown);
            $(this).after(cell);
            $(this).remove();
       
            // Setting the drop-down event of the list
            cell.click(function(){       
                // If the list is dropped down
                if ($.data(cell, "visible")){
                    dropdown.slideUp("fast");
                    $.data(cell, "visible", false);
                }else{
                    dropdown.slideDown("fast");
                    $.data(cell, "visible", true);
                }
            });
           
            // Function called each time an element is selected
            function onSelect(){           
                cell.html($(this).html());
                cell.attr("value", $(this).attr("value"));
                dropdown.slideUp("fast");
               
                $.data(cell, "visible", false);
               
                // Calling a custom function
                if (opts.selectEvent)
                    opts.selectEvent($(this));
            }               
        }
           
        // Creating a customized drop-down list for all elements of the jQuery object
        $(this).each(createList);   

        // Fluid interface
        return $(this);
    };   
 })(jQuery);

 
 /////////// ----- 2.2. Service properties variables ----- ///////////
 
 
 // Initialization of various variables to store specific properties of the selected service (SER_...)
 
var SER_ID = [] // A string of 3 uppercase letters to identify the selected service type
var SER_units = [] // A list of all service type units with properties (fetched from the corresponding linked js. file)
var SER_units_id = [] // A list of all service type units ids (will be used for selection by checkboxes)
var SER_units_coord = [] // A list of all service type units coordinates (will be used for selection by lasso tool)
var SER_hectares = [] // A list of all hectares with units-related properties (fetched from the corresponding linked js. file)
var SER_hectares_D3 = [] // Contains all hectares in a D3-readable format
var SER_hectares_pop = []; // Contains an integer list of the population count in each hectare
var SER_first_marker_id = [] // An integer corresponding to the first service unit marker id (will be used for selection by popups)
var SER_second_marker_id = [] // An integer corresponding to the second service unit marker id (will be used for selection by popups) (NOTE : The assigned ID of the first marker does not belong to a logical sequence of IDS unlike the other markers.)
var SER_first_marker_sel_id = [] // An integer corresponding to the first service unit marker id (will be used for selection by popups)
var SER_second_marker_sel_id = [] // An integer corresponding to the second service unit marker id (will be used for selection by popups) (NOTE : see above)
var SER_units_layer = [] // An object that contains the markers layer properties
var SER_units_layer_sel = [] // An object that contains the selected markers layer properties
;


// Function to reinitialize all service-related properties variables when the user select a different service type

function SER_change (){
    SER_ID = []
    SER_units = []
    SER_units_id = []
    SER_units_coord = []
    SER_hectares = []
    SER_hectares_D3 = []
    SER_first_marker_id = []
    SER_second_marker_id = []
    SER_first_marker_sel_id = []
    SER_second_marker_sel_id = []
    SER_units_layer = []
    SER_units_layer_sel = []
}


 /////////// ----- 2.3. Service type selection events ----- ///////////
 
 
// When an event from the drop-down list is selected, run function below

function f(){


    // Common events to every selection before filling new properties variables

    $('.ch').each(function(){
        this.checked = false;
    }); // unselect all checkboxes

    eraseSelection(); // Reinitalize map content
    $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker.svg"]').hide("slow");
    $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker_sel.svg"]').hide("slow");  // Hide markers
    $("#count_checked_checkboxes").html(0); // Set selected units count to 0
    map.closePopup() // close all popups
    SER_change(); //Reinitialize all service-related properties variables when the user select a different service type (see 2.2)
    
    
    // Specific events depending on the selection
    
    // If ECS is selected
    
    if(document.getElementById("dropdownCell").innerHTML.indexOf("Ecoles") !== -1) { // If service type = schools (ECS), fill properties variables with ECS properties
        
        SER_ID = "ECS"
        for (i=0;i<62;i++) {
            SER_units.push(ECS_units.features[i])
        }
        for (i=0;i<ECS_hectares.features.length;i++) {
            SER_hectares.push(ECS_hectares.features[i])
        }
        SER_first_marker_id = 53
        SER_second_marker_id = SER_first_marker_id + 1
        SER_first_marker_sel_id = 178
        SER_second_marker_sel_id = SER_first_marker_sel_id + 1
        SER_units_layer = ECS_units_layer
        SER_sel_units_layer = ECS_sel_units_layer
        $('.leaflet-pane img[src="images/markers/ECS_marker.svg"]').show("slow"); // Show ECS markers
    };

    // If AMB is selected
        
    if(document.getElementById("dropdownCell").innerHTML.indexOf("Ambulances") !== -1) { // If service type = ambulances (AMB), fill properties variables with AMB properties

        SER_ID = "AMB"
        for (i=0;i<AMB_units.features.length;i++) {
            SER_units.push(AMB_units.features[i])
        }
        for (i=0;i<AMB_hectares.features.length;i++) {
            SER_hectares.push(AMB_hectares.features[i])
        }
        SER_first_marker_id = 303
        SER_second_marker_id = SER_first_marker_id + 1
        SER_first_marker_sel_id = 352
        SER_second_marker_sel_id = SER_first_marker_sel_id + 1
        SER_units_layer = AMB_units_layer
        SER_sel_units_layer = AMB_sel_units_layer
        $('.leaflet-pane img[src="images/markers/AMB_marker.svg"]').show("slow"); // Show AMB markers
    }
    
    // If URG is selected
        
    if(document.getElementById("dropdownCell").innerHTML.indexOf("Urgences") !== -1) { // If service type = ambulances (URG), fill properties variables with URG properties

        SER_ID = "URG"
        for (i=0;i<URG_units.features.length;i++) {
            SER_units.push(URG_units.features[i])
        }
        for (i=0;i<URG_hectares.features.length;i++) {
            SER_hectares.push(URG_hectares.features[i])
        }
        SER_first_marker_id = 401
        SER_second_marker_id = SER_first_marker_id + 1
        SER_first_marker_sel_id = 424
        SER_second_marker_sel_id = SER_first_marker_sel_id + 1
        SER_units_layer = URG_units_layer
        SER_sel_units_layer = URG_sel_units_layer
        $('.leaflet-pane img[src="images/markers/URG_marker.svg"]').show("slow"); // Show URG markers
    }
    
    // If CDC is selected
        
    if(document.getElementById("dropdownCell").innerHTML.indexOf("consultation") !== -1) { // If service type = ambulances (CDC), fill properties variables with CDC properties

        SER_ID = "CDC"
        for (i=0;i<CDC_units.features.length;i++) {
            SER_units.push(CDC_units.features[i])
        }
        for (i=0;i<CDC_hectares.features.length;i++) {
            SER_hectares.push(CDC_hectares.features[i])
        }
        SER_first_marker_id = 447
        SER_second_marker_id = SER_first_marker_id + 1
        SER_first_marker_sel_id = 534
        SER_second_marker_sel_id = SER_first_marker_sel_id + 1
        SER_units_layer = CDC_units_layer
        SER_sel_units_layer = CDC_sel_units_layer
        $('.leaflet-pane img[src="images/markers/CDC_marker.svg"]').show("slow"); // Show CDC markers
    }
    
    // If SOI is selected
        
    if(document.getElementById("dropdownCell").innerHTML.indexOf("soins") !== -1) { // If service type = ambulances (SOI), fill properties variables with SOI properties

        SER_ID = "SOI"
        for (i=0;i<SOI_units.features.length;i++) {
            SER_units.push(SOI_units.features[i])
        }
        for (i=0;i<SOI_hectares.features.length;i++) {
            SER_hectares.push(SOI_hectares.features[i])
        }
        SER_first_marker_id = 621
        SER_second_marker_id = SER_first_marker_id + 1
        SER_first_marker_sel_id = 720
        SER_second_marker_sel_id = SER_first_marker_sel_id + 1
        SER_units_layer = SOI_units_layer
        SER_sel_units_layer = SOI_sel_units_layer
        $('.leaflet-pane img[src="images/markers/SOI_marker.svg"]').show("slow"); // Show SOI markers
    }
    
    // If DPS is selected
        
    if(document.getElementById("dropdownCell").innerHTML.indexOf("premiers") !== -1) { // If service type = ambulances (DPS), fill properties variables with DPS properties

        SER_ID = "DPS"
        for (i=0;i<DPS_units.features.length;i++) {
            SER_units.push(DPS_units.features[i])
        }
        for (i=0;i<DPS_hectares.features.length;i++) {
            SER_hectares.push(DPS_hectares.features[i])
        }
        SER_first_marker_id = 819
        SER_second_marker_id = SER_first_marker_id + 1
        SER_first_marker_sel_id = 948
        SER_second_marker_sel_id = SER_first_marker_sel_id + 1
        SER_units_layer = DPS_units_layer
        SER_sel_units_layer = DPS_sel_units_layer
        $('.leaflet-pane img[src="images/markers/DPS_marker.svg"]').show("slow"); // Show DPS markers
    }
    
    // If DAP is selected
        
    if(document.getElementById("dropdownCell").innerHTML.indexOf("appui") !== -1) { // If service type = ambulances (DAP), fill properties variables with DAP properties

        SER_ID = "DAP"
        for (i=0;i<DAP_units.features.length;i++) {
            SER_units.push(DAP_units.features[i])
        }
        for (i=0;i<DAP_hectares.features.length;i++) {
            SER_hectares.push(DAP_hectares.features[i])
        }
        SER_first_marker_id = 1077
        SER_second_marker_id = SER_first_marker_id + 1
        SER_first_marker_sel_id = 1306
        SER_second_marker_sel_id = SER_first_marker_sel_id + 1
        SER_units_layer = DAP_units_layer
        SER_sel_units_layer = DAP_sel_units_layer
        $('.leaflet-pane img[src="images/markers/DAP_marker.svg"]').show("slow"); // Show DAP markers
    }
    
    // If PHA is selected
        
    if(document.getElementById("dropdownCell").innerHTML.indexOf("Pharmacies") !== -1) { // If service type = ambulances (PHA), fill properties variables with PHA properties

        SER_ID = "PHA"
        for (i=0;i<PHA_units.features.length;i++) {
            SER_units.push(PHA_units.features[i])
        }
        for (i=0;i<PHA_hectares.features.length;i++) {
            SER_hectares.push(PHA_hectares.features[i])
        }
        SER_first_marker_id = 1535
        SER_second_marker_id = SER_first_marker_id + 1
        SER_first_marker_sel_id = 1932
        SER_second_marker_sel_id = SER_first_marker_sel_id + 1
        SER_units_layer = PHA_units_layer
        SER_sel_units_layer = PHA_sel_units_layer
        $('.leaflet-pane img[src="images/markers/PHA_marker.svg"]').show("slow"); // Show PHA markers
    }
    
    // If MED is selected
        
    if(document.getElementById("dropdownCell").innerHTML.indexOf("Médecins") !== -1) { // If service type = ambulances (MED), fill properties variables with MED properties

        SER_ID = "MED"
        for (i=0;i<MED_units.features.length;i++) {
            SER_units.push(MED_units.features[i])
        }
        for (i=0;i<MED_hectares.features.length;i++) {
            SER_hectares.push(MED_hectares.features[i])
        }
        SER_first_marker_id = 2329
        SER_second_marker_id = SER_first_marker_id + 1
        SER_first_marker_sel_id = 4406
        SER_second_marker_sel_id = SER_first_marker_sel_id + 1
        SER_units_layer = MED_units_layer
        SER_sel_units_layer = MED_sel_units_layer
        $('.leaflet-pane img[src="images/markers/MED_marker.svg"]').show("slow"); // Show MED markers
    }

    
    // Common events to every selection after filling new properties variables
    
    for (i=0;i<SER_units.length;i++) {
        SER_units_id.push(SER_units[i].properties.ID)
    }
    for (i=0;i<SER_units.length;i++) {
        SER_units_coord.push(SER_units[i].geometry.coordinates)
    }
    d3.select("#hide_box_unites_selectionnees").remove()
};

$("ul").imgDropDown({title:"&nbsp;Sélectionnez le type de service :", selectEvent:f}); // Dropdown list default message and select event 





////////////////////-------- 3. UNIT SELECTION --------////////////////////



/////////// ----- 3.1. Selection by checkboxes ----- ///////////


// Function to toggle service units markers on map depending on checkbox status

function select_unit(){
    for (i=0;i<SER_units.length;i++) {
    if (document.getElementById(SER_units_id[i]).checked == true){
        $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker_sel.svg"]').eq(i).show("slow");
        $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker.svg"]').eq(i).hide("slow");
    }else{
        $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker_sel.svg"]').eq(i).hide("slow");
        $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker.svg"]').eq(i).show("slow");    
    }
}
return
}
       
       
// Creating a new window to manage the selected entities

$(window).on('load', function() {
    $(".bouton_check").click(function(){
        if ( document.getElementById("dropdownCell").innerHTML.indexOf("Ecoles") !== -1){$('.hover_bg').show("fast")}
        if ( document.getElementById("dropdownCell").innerHTML.indexOf("Ambulances") !== -1){$('.AMB_hover_bg').show("fast")}
        if ( document.getElementById("dropdownCell").innerHTML.indexOf("Urgences") !== -1){$('.URG_hover_bg').show("fast")}
        if ( document.getElementById("dropdownCell").innerHTML.indexOf("consultation") !== -1){$('.CDC_hover_bg').show("fast")}
        if ( document.getElementById("dropdownCell").innerHTML.indexOf("soins") !== -1){$('.SOI_hover_bg').show("fast")}
        if ( document.getElementById("dropdownCell").innerHTML.indexOf("premier") !== -1){$('.DPS_hover_bg').show("fast")}
        if ( document.getElementById("dropdownCell").innerHTML.indexOf("appui") !== -1){$('.DAP_hover_bg').show("fast")}
        if ( document.getElementById("dropdownCell").innerHTML.indexOf("Pharmacies") !== -1){$('.PHA_hover_bg').show("fast")}
        if ( document.getElementById("dropdownCell").innerHTML.indexOf("Médecins") !== -1){$('.MED_hover_bg').show("fast")}
    });
    $('.hover_close').click(function(){
        $('.hover_bg').hide("fast")
        $('.AMB_hover_bg').hide("fast");
        $('.URG_hover_bg').hide("fast");
        $('.CDC_hover_bg').hide("fast");
        $('.SOI_hover_bg').hide("fast");
        $('.DPS_hover_bg').hide("fast");
        $('.DAP_hover_bg').hide("fast");
        $('.PHA_hover_bg').hide("fast");
        $('.MED_hover_bg').hide("fast");
    });
});


//Display the number of selected units

$(document).ready(function(){ 
  $('#ECSform, #AMBform, #URGform, #CDCform, #SOIform, #DPSform, #DAPform, #PHAform, #MEDform').on('click',function(){ 
   $("#count_checked_checkboxes").html(document.querySelectorAll('input[name="'+SER_ID+'"]:checked').length)
   time_box_test()
   if (document.querySelectorAll('input[name="'+SER_ID+'"]:checked').length == SER_units.length){
        document.getElementById(SER_ID+"_selectAll").checked = true
        }else{
        document.getElementById(SER_ID+"_selectAll").checked = false
        };
   });
});


//Allow access to the travel time choice box as soon as at least one unit is selected in the checkboxes

function time_box_test(){ 
   if (document.querySelectorAll('input[name="'+SER_ID+'"]:checked').length > 0){
        document.getElementById("hide_box_choix_duree").style.display = "none"
    }else{
        document.getElementById("hide_box_choix_duree").style.display = "block"
        document.getElementById("hide_box_population").style.display = "block"
    }
}



/////////// ----- 3.2. Selection by lasso ----- ///////////


// Definition of two types of lasso: lasso for selecting markers and lasso for unselecting markers. Hidden radio buttons indicate which mode we are in.

function check_sel(){
    document.getElementById("sel").checked = true;
}

function check_unsel(){
    document.getElementById("unsel").checked = true;
}

var toggleLasso = document.querySelector("#lasso_unselect");
var lasso_unsel = L.lasso(map);


// Lasso tool initialization (for more informations, see http://github.com/zakjan/leaflet-lasso)
    
const mapElement = document.querySelector("#map");
var toggleLasso = document.querySelector("#lasso_select");
var lasso_sel = L.lasso(map);


// SELECTING units by lasso
    
map.on('lasso.finished', (event) => {
    if(document.getElementById('sel').checked) {
        let lassoResult = document.querySelector("#lassoResult_select");
        lassoResult.innerHTML = `${event.layers.length} layers:<br>` + event.layers.map(layer => `${layer.getLatLng().lat}, ${layer.getLatLng().lng}`).join('<br>');

        
        // Toggle service unit markers depending on the selected area
                
        for (i=0;i<SER_units.length;i++) {
            if (lassoResult.innerHTML.includes(SER_units_coord[i][1]+", "+SER_units_coord[i][0])==true){
                $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker_sel.svg"]').eq(i).show("slow");
                $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker.svg"]').eq(i).hide("slow");
                document.getElementById(SER_units_id[i]).checked = true
                $("#count_checked_checkboxes").html(document.querySelectorAll('input[name="'+SER_ID+'"]:checked').length);
            }
        }


        // Test if the travel time selection box can be accessed after lasso operations (at least one unit must be selected).

        time_box_test()
        return
    }
});


// Allow to activate or deactivate the lasso tool by clicking on a button.

lasso_select.addEventListener('click', function() {
    if (lasso_sel.enabled()) {
        lasso_sel.disable();
    } else {
        lasso_sel.enable();
    }
});


// DESELECTING units by lasso

map.on('lasso.finished', (event) => {
    if(document.getElementById('unsel').checked) {
        let lassoResult = document.querySelector("#lassoResult_unselect");
        lassoResult.innerHTML = `${event.layers.length} layers:<br>` + event.layers.map(layer => `${layer.getLatLng().lat}, ${layer.getLatLng().lng}`).join('<br>');

        
        // Deselecting the other units (IDs logically follows from now on)
        
        for (i=0;i<SER_units.length;i++) {
            if (lassoResult.innerHTML.includes(SER_units_coord[i][1]+", "+SER_units_coord[i][0])==true){
                $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker_sel.svg"]').eq(i).hide("slow");
                $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker.svg"]').eq(i).show("slow");
                document.getElementById(SER_units_id[i]).checked = false
                $("#count_checked_checkboxes").html(document.querySelectorAll('input[name="'+SER_ID+'"]:checked').length);
            }
        }
    
    
    // Test if the travel time selection box can be accessed after lasso operations (at least one unit must be selected).

    time_box_test()
    return
    }
});


 // Allow to switch between the 2 modes of the lasso tool
 
lasso_unselect.addEventListener('click', function() {
    if (lasso_unsel.enabled()) {
        lasso_unsel.disable();
    } else {
        lasso_unsel.enable();
    }
});



/////////// ----- 3.3. Selection by marker popup ----- ///////////


 // Define what should happen by SELECTING a marker
    
function select_popup(){
    for (i=1;i<SER_units.length;i++) {
        if (SER_units_layer["_layers"][SER_first_marker_id].isPopupOpen() == true){ // For the first unit (see NOTE in 2.2)
            $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker_sel.svg"]').eq(0).show("slow");// Show a similar marker with a darker appearance, indicating that its status is: Selected
            $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker.svg"]').eq(0).hide("slow"); // Remove the older unselected marker
            document.getElementById(SER_units_id[0]).checked = true // Check checkbox corresponding to the selected unit
            $("#count_checked_checkboxes").html(document.querySelectorAll('input[name="'+SER_ID+'"]:checked').length) // Update the selected units count
            time_box_test() // Update the count of the selected units
            map.closePopup() // Eventually close the popup
        }
        else if (SER_units_layer["_layers"][parseInt(i,10)+SER_second_marker_id].isPopupOpen() == true){ // For all other units
            $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker_sel.svg"]').eq(i).show("slow")
            $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker.svg"]').eq(i).hide("slow");
            document.getElementById(SER_units_id[i]).checked = true
            $("#count_checked_checkboxes").html(document.querySelectorAll('input[name="'+SER_ID+'"]:checked').length)
            time_box_test()
            map.closePopup()
            return
        }
    }
};

    
// Define what should happen by UNSELECTING a marker

function unselect_popup(){
    for (i=1;i<SER_units.length;i++) {
        if (SER_sel_units_layer["_layers"][SER_first_marker_sel_id].isPopupOpen() == true){
            $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker_sel.svg"]').eq(0).hide("slow") // hide selected marker
            $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker.svg"]').eq(0).show("slow") // show unselected marker instead
            document.getElementById(SER_units_id[0]).checked = false // Uncheck checkbox
            $("#count_checked_checkboxes").html(document.querySelectorAll('input[name="'+SER_ID+'"]:checked').length)
            time_box_test()
            map.closePopup()
        }
        else if (SER_sel_units_layer["_layers"][parseInt(i,10)+SER_second_marker_sel_id].isPopupOpen() == true){
            $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker_sel.svg"]').eq(i).hide("slow")
            $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker.svg"]').eq(i).show("slow");
            document.getElementById(SER_units_id[i]).checked = false
            $("#count_checked_checkboxes").html(document.querySelectorAll('input[name="'+SER_ID+'"]:checked').length)
            time_box_test()
            map.closePopup()
            return
        }
    }
};



////////////////////-------- 4. REQUIREMENTS FOR RESULTS DISPLAY --------////////////////////



 /////////// ----- 4.1 Selection properties variables ----- ///////////


 
// Selected units variables (SEL_...)

var SEL_units_hectares=[] // Contains all squares and their attributes belonging to the selected areas
var SEL_units_pop=[] // Contains all population counts belonging to the selected areas
var SEL_units_ids=[]  // Contains the list of the selected units IDs
  
  
// Display variables related to visible svg on map (DIS_...)

var DIS_hectares=[]  // Contains all squares and their attributes belonging to the selection displayed on the map
var DIS_pop = [] // Contains all population counts belonging to the selection displayed on the map
var DIS_time =[] // Contains all travel times belonging to the selection displayed on the map
var DIS_hectares_time_sorted = [] // Contains all squares and their attributes belonging to the selection displayed on the map, sorted by travel time
var DIS_pop_time_sorted = [] // Contains all the population counts belonging to the selection displayed on the map, sorted by travel time
var DIS_pond_time_by_hectare = [] // Contains an integers list of pop count * travel time for each hectare


// Histogram-related variables (HIS_...)

var HIS_hidden = [] // Contains the "hidden" histogram (as an array) of the travel times belonging to the selection displayed on the map. It is by definition a frequency histogram whereas we want a population histogram. This one will not be represented, and further changes must be made.
var HIS_bars_pop = [] // Contains the number of inhabitants represented by each bin of the histogram
var HIS_bars_pop_D3 = [] // Contains the number of inhabitants represented by each bin of the histogram, as an array in order to be read with d3
var HIS_lines_steps =[] // Contains the position of the horizontal lines of the displayed histogram
var HIS_lines_steps_D3=[] // Contains the position of the horizontal lines of the displayed histogram, as an array in order to be read with d3
var HIS_bins_number = 15 // The number of bins of the displayed histogram


// Color scale variables (COL_...)

var COL_linear_scale = d3.scale.linear().domain([0,d3.max(SER_hectares)]).range(["lightblue","red"]) // Linear color scale with d3 (not used on the current version of the application)
var COL_cat_scale = d3.scale.ordinal().domain(SER_units).range(["#2c7bb6","#00a6ca","#00ccbc","#40dcad","#90eb9d","#f9d057","#f29e2e","#e76818","#d7191c"]) // Categorial color scale with d3



 /////////// ----- 4.2. "Toolbox" functions ----- ///////////


// Function that returns the sum of a given array

const sum_array = arr => arr.reduce((a,b) => a + b, 0)


// Function that adds an apostrophe to separate the thousands of large numbers

function thousands_separator(nbr) { 
    var number = ''+nbr; var separated_number = ''; var count=0; 
    for(var i=number.length-1 ; i>=0 ; i--) { 
        if(count!=0 && count % 3 == 0) separated_number = number[i]+"'"+separated_number ; 
        else separated_number = number[i]+separated_number ; count++;
    } 
    return separated_number;
}


// Function that transforms time expressions from "seconds" to "minutes" format

function sec_to_min(time){   

    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;
    var ret = "";
    
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}


// Function that update svg shapes position if map view change (i.e. zoom or map pan)

function update() {
  d3.select("#mapdiv")
  .selectAll("rect")
    .attr("x", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
    .attr("y", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
    .attr("width",function(e){return (0.0009*Math.pow(2.004, map.getZoom()))})
    .attr("height",function(e){return (0.0009*Math.pow(2.004, map.getZoom()))})
    .style("stroke-width", function(e){return (0.0000005*Math.pow(2.5,map.getZoom()))});
}



////////////////////-------- 5. TIME & POPULATION SETTINGS --------////////////////////



 /////////// ----- 5.1 Slider ----- ///////////
 

// Creating the slider and displaying its value

var slider = document.getElementById("myRange");
var sliderOutput = document.getElementById("demo");
sliderOutput.innerHTML = slider.value;


// Moving the slider with the arrow buttons

function slideRight(){
        sliderOutput.innerHTML++
        slider.value++
        slider.oninput();
}

function slideLeft(){
    sliderOutput.innerHTML--
    slider.value--
    slider.oninput();
}



 /////////// ----- 5.2 Erase buttons ----- ///////////
 
 
// 1st button : Function that erase the displayed squares on the map without the selected markers

function eraseSquares(){
 
    d3.selectAll("rect").remove()  // Erasing the squares
     
   // Reinitializing some variables
    SER_hectares_D3 = []
    SEL_units_ids=[] 
    SEL_units_pop=[]
    DIS_pop=[]
    DIS_hectares=[] 
    DIS_pond_time_by_hectare = []

    // Reinitializing the results box values
    $("#DIS_pop").html(sum_array(DIS_pop))  
    $("#selectedBass").html(sum_array(SEL_units_pop))
    $("#selectedPerc").html(0)
    $("#MWD").html(0)
    $("#MWDtot").html(0)
    $("#meanDeviation").html("-")
    $("#eval").html("-")

    var emp = d3.select("#box_hist").select("svg") // Removing the histogram
    if ( emp == null){
    }else{
        d3.select("#box_hist").select("svg").remove()
    }
     
    document.getElementById("POP").checked = false // Uncheck the population differentials box
    document.getElementById("hide_box_population").style.display = "block" // Hide the population differentials box
};


// 2nd button : Function that erase the displayed squares on the map with the selected markers (see previous function above for details)

function eraseSelection(){
    d3.selectAll("rect").remove()
    DIS_hectares=[]
    SEL_units_ids=[]
    slider.value="0"
    sliderOutput.innerHTML="0"

    for (i=0;i<SER_units.length;i++) {
        document.getElementById(SER_ID+"_selectAll").checked = false
        $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker.svg"]').eq(i).show();
        $('.leaflet-pane img[src="images/markers/'+SER_ID+'_marker_sel.svg"]').eq(i).hide()
        document.getElementById(SER_units_id[i]).checked = false
        document.getElementById("POP").checked = false
    }

    SEL_units_pop=[]
    DIS_pop=[]
    DIS_pond_time_by_hectare = []

    $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length)
    $("#selectedPop").html(sum_array(DIS_pop))
    $("#selectedBass").html(sum_array(SEL_units_pop))
    $("#selectedPerc").html(0)
    $("#MWD").html(0)
    $("#MWDtot").html(0)
    $("#meanDeviation").html("-")
    $("#eval").html("-")

    time_box_test()

    var emp = d3.select("#box_hist").select("svg")
    if ( emp == null){
    }else{
        d3.select("#box_hist").select("svg").remove()
    }
};


 /////////// ----- 5.3 Population differentials ----- ///////////

 
 // Function that shows/hides d3 population differentials

function togglePOP(){
    var checkboxPOP = document.querySelector("input[name=POP]");
     if(checkboxPOP.checked) {
        d3.select("#mapdiv").selectAll("rect").remove()
        d3.select("#mapdiv")
            .select("svg")
            .selectAll("mySquares")
            .data(DIS_hectares)
            .enter()
            .append("rect")
                .attr("x", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
                .attr("y", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
                .attr("width", "0.469")
                .attr("height", "0.469")
                .attr("fill", function(d){return COL_cat_scale(d.bassin)})
                .style("stroke", "white")
                .style("stroke-width", 1)
                .style("stroke-linejoin", "round")
                .style("fill-opacity", function(d){if(document.getElementById("POPformat").checked){return((Math.sqrt(0.0012*d.pop))*1.5)}else if (document.getElementById("JOBSformat").checked){return((Math.sqrt(0.0012*d.jobs))*1.5)} else if (document.getElementById("POPJOBSformat").checked){return((Math.sqrt(0.0012*d.popjobs))*1.5)}})
        update()
     }
    else {
        d3.select("#mapdiv").selectAll("rect").remove()
        d3.select("#mapdiv")
            .select("svg")
            .selectAll("mySquares")
            .data(DIS_hectares)
            .enter()
            .append("rect")
                .attr("x", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
                .attr("y", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
                .attr("width", "0.469")
                .attr("height", "0.469")
                .attr("fill", function(d){return COL_cat_scale(d.bassin)})
                .style("stroke", "white")
                .style("stroke-width", 1)
                .style("stroke-linejoin", "round")
                .style("fill-opacity", 0.8)
        update()
    }
};



//////////// 6. SLIDER DRAG-RELATED EVENTS ////////////



 /////////// ----- 6.1. Function initialization ----- ///////////


// Creating the function encompassing all events related to the slider movement
                         

$(document).ready(function () {
    slider.oninput = function () {


        // Update the slider value after drag

        sliderOutput.innerHTML = this.value
            
            
            
 /////////// ----- 6.2. Updating global variables ----- ///////////
                    
                    
        SER_hectares_pop = []
        for (i=0;i<SER_hectares.length;i++) {
            if (document.getElementById("POPformat").checked){
                SER_hectares_pop.push(SER_hectares[i].properties.POP)
            }else if (document.getElementById("JOBSformat").checked){
                SER_hectares_pop.push(SER_hectares[i].properties.JOBS)
            }else if (document.getElementById("POPJOBSformat").checked){
                SER_hectares_pop.push(SER_hectares[i].properties.POPJOBS)
            }
        }
                    
        SER_hectares_D3 = []
        for (i=0;i<SER_hectares.length;i++) {
            SER_hectares_D3.push({long:+ SER_hectares[i].geometry.coordinates[0], lat: +SER_hectares[i].geometry.coordinates[1]+0.001, duree: +SER_hectares[i].properties.TIME*0.75, pop: +SER_hectares[i].properties.POP, jobs: +SER_hectares[i].properties.JOBS, popjobs: +SER_hectares[i].properties.POPJOBS ,bassin: ''+SER_hectares[i].properties.UNIT})
        }
                
        // Fill the global variable SEL_units_ids with every ID corresponding to the selected areas (based on checkboxes status)

        SEL_units_ids = []
        id = $("#"+SER_ID+"form input:checked").each(function() {
            if (SEL_units_ids.includes($(this).attr("id"))){
            }
            else{
            SEL_units_ids.push( $(this).attr("id"))
            };
        });


        // Fill the global variable DIS_hectares with all squares and their attributes belonging to the selection displayed on the map

        DIS_hectares.length = 0 // to update the count to zero at each new value chosen, avoid adding preexistent squares at each search
        for (i=0;i<SER_hectares.length;i++) {
            if (SER_hectares[i].properties.TIME*0.75<sliderOutput.innerHTML*60 && SEL_units_ids.includes(SER_hectares[i].properties.UNIT)){
                DIS_hectares.push(SER_hectares_D3[i])
            }
        };


        // Fill the global variable SEL_units_hectares with all squares and their attributes belonging to the selected areas

        SEL_units_hectares.length = 0
        for (i=0;i<SER_hectares.length;i++) {
            if (SER_hectares[i].properties.TIME*0.75<30000&&SEL_units_ids.includes(SER_hectares[i].properties.UNIT)){
                SEL_units_hectares.push(SER_hectares[i])
            }
        };


        // Function to fill the global variable DIS_time with all travel times belonging to the selection displayed on the map

        function selectDuree(){
            DIS_time=[]
            for (i=0;i<DIS_hectares.length;i++){
                DIS_time.push(DIS_hectares[i].duree)
            }
        };


        // Function to fill the global variable sortSelectedSquares with all squares and their attributes belonging to the selection displayed on the map, sorted by ascending travel time

        function sortSelectedSquares(){
            DIS_hectares_time_sorted = []
            DIS_hectares_time_sorted.push(DIS_hectares.sort(function(a, b) {
                return parseFloat(a.duree) - parseFloat(b.duree)
            }))
            DIS_pop_time_sorted = []
            for (i=0;i<DIS_hectares.length;i++){
                if (document.getElementById("POPformat").checked){
                    DIS_pop_time_sorted.push(DIS_hectares_time_sorted[0][i].pop)
                }else if (document.getElementById("JOBSformat").checked){
                    DIS_pop_time_sorted.push(DIS_hectares_time_sorted[0][i].jobs)
                }else if (document.getElementById("POPJOBSformat").checked){
                    DIS_pop_time_sorted.push(DIS_hectares_time_sorted[0][i].popjobs)
                }
            }
        };

        
        
/////////// ----- 6.3. Squares on map ----- ///////////


        // Adding the squares on the map with d3
        
        d3.select("#mapdiv").select("svg").selectAll("rect").remove(); //erase preexistent squares

        d3.select("#mapsvg")
            .selectAll("rect")
            .data(DIS_hectares)
            .enter()
            .append("rect")
                .attr("x", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
                .attr("y", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
                .attr("width", "0.469")
                .attr("height", "0.469")
                .attr("fill", function(d){return COL_cat_scale(d.bassin)})
                .style("stroke", "white")
                .style("stroke-width", 1)
                .style("stroke-linejoin", "round")
                .style("fill-opacity", 0.8)
            
            
        // Test if the population grid box can be accessed after slider move (condition: at least one square must be displayed on the map).

        if (DIS_hectares.length > 0){
            document.getElementById("hide_box_population").style.display = "none"
        }else{
            document.getElementById("hide_box_population").style.display = "block"
        };


        
/////////// ----- 6.4. Values in results box ----- ///////////


        // Returns the sum of the inhabitants living in the selection displayed on the map

        function selectPop(){
            DIS_pop=[]
            for (i=0;i<DIS_hectares.length;i++){
                if (document.getElementById("POPformat").checked){
                    DIS_pop.push(DIS_hectares[i].pop)
                }else if (document.getElementById("JOBSformat").checked){
                    DIS_pop.push(DIS_hectares[i].jobs)
                }else if (document.getElementById("POPJOBSformat").checked){
                    DIS_pop.push(DIS_hectares[i].popjobs)
                }
            }
            $("#selectedPop").html(thousands_separator(sum_array(DIS_pop)))
        }


        // Returns the sum of the inhabitants living in the selected areas

        function selectBassin(){
            SEL_units_pop=[]
            for (i=0;i<SEL_units_hectares.length;i++){
                if (document.getElementById("POPformat").checked){
                    SEL_units_pop.push(SEL_units_hectares[i].properties.POP)
                }else if (document.getElementById("JOBSformat").checked){
                    SEL_units_pop.push(SEL_units_hectares[i].properties.JOBS)
                }else if (document.getElementById("POPJOBSformat").checked){
                    SEL_units_pop.push(SEL_units_hectares[i].properties.POPJOBS)
                }
            }
            $("#selectedBass").html(thousands_separator(sum_array(SEL_units_pop)))
        }


        // Returns the percentage of the inhabitants living in the selected areas displayed on the map

        function selectPercentage(){
            $("#selectedPerc").html((sum_array(DIS_pop)/sum_array(SEL_units_pop)*100).toFixed(2))

            
            // Creating a progress bar for the percentage

            var emp = d3.select("#percBarBckgr").select("svg") // Removes the existing svg canvas in order to replace it with a new updated one
            if ( emp == null){
            }else{
                d3.select("#percBarBckgr").select("svg").remove()
            }
             
            var canevasPB =d3.select("#percBarBckgr").append("svg")  // Creating the canvas
                .attr ("width", 51)
                .attr ("height", 15)
                .append("g")

            var dataPB = []  // Indicating the current percentage value
            dataPB.push(parseInt(d3.select("#selectedPerc")[0][0].innerHTML,10))
            
            var progressBar = canevasPB.selectAll(".pb") // Creating a progress bar with d3
                .data(dataPB)
                .enter()
                .append("g")
             progressBar.append("rect")
                .attr("x", 0)
                .attr("y", 0)
                .attr ("width", function (d){return (d/2)})
                .attr ("height", 3)
                .attr("fill","#44b8ea")
        }


        // Calculation of the 2 values related to the weighted mean duration

        function meanWeightedDuration(){
            
            DIS_pond_time_by_hectare=[] // Calculation of the weighted mean duration of the selection displayed on map
            for (i=0;i<DIS_hectares.length;i++){
                if (document.getElementById("POPformat").checked){
                    DIS_pond_time_by_hectare.push(DIS_hectares[i].pop*DIS_hectares[i].duree)
                }else if (document.getElementById("JOBSformat").checked){
                    DIS_pond_time_by_hectare.push(DIS_hectares[i].jobs*DIS_hectares[i].duree)
                }else if (document.getElementById("POPJOBSformat").checked){
                    DIS_pond_time_by_hectare.push(DIS_hectares[i].popjobs*DIS_hectares[i].duree)
                }
            }
        
            
            var MWD = sec_to_min(sum_array(DIS_pond_time_by_hectare)/sum_array(DIS_pop))
            $("#MWD").html(MWD)
            
            DIS_pond_time_by_hectareBassin=[] // Calculation of the weighted mean duration of the selected areas
            for (i=0;i<SEL_units_pop.length;i++){
                if (document.getElementById("POPformat").checked){
                    DIS_pond_time_by_hectareBassin.push(SEL_units_hectares[i].properties.POP*SEL_units_hectares[i].properties.TIME*0.75)
                }else if (document.getElementById("JOBSformat").checked){
                    DIS_pond_time_by_hectareBassin.push(SEL_units_hectares[i].properties.JOBS*SEL_units_hectares[i].properties.TIME*0.75)
                }else if (document.getElementById("POPJOBSformat").checked){
                    DIS_pond_time_by_hectareBassin.push(SEL_units_hectares[i].properties.POPJOBS*SEL_units_hectares[i].properties.TIME*0.75)
                }
            }
            
            var MWDtot = sec_to_min(sum_array(DIS_pond_time_by_hectareBassin)/sum_array(SEL_units_pop))
            $("#MWDtot").html(MWDtot)
            
            SER_pond_time_by_hectare_vd=[] // Calculation of the weighted mean duration of the selection displayed on map
            for (i=0;i<SER_hectares_D3.length;i++){
                if (document.getElementById("POPformat").checked){
                    SER_pond_time_by_hectare_vd.push(SER_hectares_D3[i].pop*SER_hectares_D3[i].duree)
                }else if (document.getElementById("JOBSformat").checked){
                    SER_pond_time_by_hectare_vd.push(SER_hectares_D3[i].jobs*SER_hectares_D3[i].duree)
                }else if (document.getElementById("POPJOBSformat").checked){
                    SER_pond_time_by_hectare_vd.push(SER_hectares_D3[i].popjobs*SER_hectares_D3[i].duree)
                }
            }
            
            var meanDeviation = Math.round((sum_array(DIS_pond_time_by_hectareBassin)/sum_array(SEL_units_pop))-sum_array(SER_pond_time_by_hectare_vd)/sum_array(SER_hectares_pop))
            if (meanDeviation >0){
                $("#meanDeviation").html("+" + sec_to_min(meanDeviation))
                document.getElementById("meanDeviation").className = "positiveMeanDeviation"
                document.getElementById("eval").className = "badEval"
            }else{
                $("#meanDeviation").html("-"+sec_to_min(-(meanDeviation)))
                document.getElementById("meanDeviation").className = "negativeMeanDeviation"
                document.getElementById("eval").className = "goodEval"
            }

            if (meanDeviation > 120){ // If-loop determining the smiley's mood ;-)
                $("#eval").html("TRÈS SUPÉRIEUR " +"<br>"+ "&#128577" + "&#128577" + "&#128577")
            }else if (meanDeviation > 60){
                $("#eval").html("SUPÉRIEUR " +"<br>"+ "&#128577" + "&#128577")
            }else if (meanDeviation > 1){
                $("#eval").html("PEU SUPÉRIEUR " +"<br>"+ "&#128577")
            }else if (Math.round((sum_array(DIS_pond_time_by_hectareBassin)/sum_array(SEL_units_pop))-sum_array(SER_pond_time_by_hectare_vd)/sum_array(SER_hectares_pop)) > -1){
                $("#eval").html("MOYEN " +"<br>"+ "&#128528")
            }else if (Math.round((sum_array(DIS_pond_time_by_hectareBassin)/sum_array(SEL_units_pop))-sum_array(SER_pond_time_by_hectare_vd)/sum_array(SER_hectares_pop)) > -60){
                $("#eval").html("PEU INFÉRIEUR " +"<br>"+ "&#128578")
            }else if (Math.round((sum_array(DIS_pond_time_by_hectareBassin)/sum_array(SEL_units_pop))-sum_array(SER_pond_time_by_hectare_vd)/sum_array(SER_hectares_pop)) > -120){
                $("#eval").html("INFÉRIEUR " +"<br>"+ "&#128578" + "&#128578")
            }else {$("#eval").html("TRÈS INFÉRIEUR " +"<br>"+ "&#128578" + "&#128578" + "&#128578")}
        }


/////////// ----- 6.5. Histogram ----- ///////////


         // Creating the histogram with d3

        function hist(){
                
            
            // Removes the existing svg canvas in order to replace it with a new updated one

            var emp = d3.select("#box_hist").select("svg")
            if ( emp == null){
            }else{
                d3.select("#box_hist").select("svg").remove()
            }

            if (sliderOutput.innerText != "0"){ //Draw histogram only if slider is set to a non-null value
                
                // Fill the global variable histogram with the "hidden" histogram (as an array) of the travel times belonging to the selection displayed on the map

                HIS_hidden = []
                HIS_hidden.push(d3.layout.histogram()
                    .bins(HIS_bins_number)
                    (DIS_time))
                    

                // Fill the global variable HIS_bars_pop with the number of inhabitants represented by each bin of the histogram

                HIS_bars_pop=[]   
                for (i=0;i<HIS_bins_number;i++){
                    HIS_bars_pop.push(sum_array(DIS_pop_time_sorted.splice(0,HIS_hidden[0][i].y)))
                }

                // Fill the global variable HIS_bars_pop_D3 with the number of inhabitants represented by each bin of the histogram, as an array in order to be read with d3

                HIS_bars_pop_D3=[]
                HIS_bars_pop_D3 = d3.range(HIS_bins_number).map(function(d,i){
                    return {'id':(HIS_hidden[0][i].x)/60,'value': HIS_bars_pop[i],'barWidth':(HIS_hidden[0][i].dx)/60}
                });


                // Setting the dimensions

                var widthHist = 272
                var heightHist = 130
                var paddingHist = 50

                                // Creating the canvas for the histogram
                    
                var canevas =d3.select("#box_hist").append("svg")
                    .attr ("width", widthHist+65)
                    .attr ("height", heightHist + paddingHist)
                    .append("g")
                        .attr("transform","translate(55,10)");

                // Range & domain of the x axis
                        
                var xScale = d3.scale.linear()
                    .domain([0,(d3.max(DIS_time))/60])
                    .range([0,widthHist])

                    
                // Range & domain of the y axis

                var yScale = d3.scale.linear()
                    .domain([0,d3.max(HIS_bars_pop)])
                    .range([heightHist,0]);

                    
                // Creating the x axis

                var xAxis = d3.svg.axis()
                    .scale(xScale)
                    .orient("bottom")
                    .ticks (10)
                    
                    
                //Label for x axis
                
                canevas.append("text")
                .attr("text-anchor", "end")
                .attr("x", (widthHist/2)+35)
                .attr("y", heightHist +25)
                .text("Temps de trajet [en min.]")
                .attr("class","axisLabels")

                    
                // Creating the y axis

                var yAxis = d3.svg.axis()
                    .scale(yScale)
                    .orient("left")
                    .ticks (5)
                    .tickFormat(d3.format(" "))

                    
                //Label for y axis
                    
                canevas.append("text")
                .attr("text-anchor", "end")
                .attr("transform", "rotate(-90)")
                .attr("x", -50)
                .attr("y", -47)
                .text("Population")
                .attr("class","axisLabels")

                    
                // Adding the axis to the canvas

                var groupX = canevas.append("g")
                    .attr('class', 'axis')
                    .attr("transform","translate(0," + heightHist + ")")
                    .call(xAxis);

                var groupY = canevas.append("g")
                    .attr('class', 'axis')
                    .attr("transform","translate(0,0)")
                    .call(yAxis);
                    
                // Adding the bars to the canvas

                var bars =canevas.selectAll(".bars")
                    .data(HIS_bars_pop_D3)
                    .enter()
                    .append("g")
                    
                var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    return "<nobr>"+String.fromCodePoint(0x23F3)+" : "+sec_to_min(Math.round((d.id)*60))+"-"+sec_to_min(Math.round((d.id+d.barWidth)*60))+" min. <br><br>"+String.fromCodePoint(0x1F466)+" : <span style='color:#ffffff'>" + thousands_separator(d.value) + " hab.</span></nobr>";
                })
                  
                canevas.call(tip)
    
                bars.append("rect")
                    .attr("x", function(d){return xScale(d.id);}) 
                    .attr("y", function(d){return yScale(d.value);}) 
                    .attr ("width", function (d){return xScale(d.barWidth)-1}) 
                    .attr ("height", function (d){return heightHist - yScale(d.value);})
                    .attr("class","bar")
                          .on('mouseover', tip.show)
                          .on('mouseout', tip.hide)	
                    

                // Determining the horizontal lines values ( = labels of Y axis)

                HIS_lines_steps =[]
                for(i=1;i<10;i++){
                    HIS_lines_steps.push(parseInt((d3.select("#box_hist").select("svg").selectAll("text")[0].slice(-i)[0].innerHTML),10)) //Create an array of the 10 last "text" elements found in the histogram box
                }
                function isZero(element) {
                    return element == 0;
                }
                HIS_lines_steps.length = HIS_lines_steps.findIndex(isZero) //Find the 0 (origin) in the array and remove it as well as the following "text" elements that do not relate to the y axis.
 
                
                // Creating an array of these values
                
                for (i=1;i<HIS_lines_steps.length;i++){
                HIS_lines_steps_D3=[]
                HIS_lines_steps_D3.push(d3.range(HIS_lines_steps.length).map(function(d,i){
                    return {'id':i,'value': HIS_lines_steps[i]}
                }))};


                // Adding the horizontal bars with d3

                var barSteps = canevas.append('g').attr('class', 'bars separators');
                barSteps.selectAll('line')
                    .data(HIS_lines_steps_D3[0])
                    .enter()
                    .append('line')
                    .attr('x1', function(d){ return widthHist;})
                    .attr('x2', function(d){ return 0; })
                    .attr('y1', function(d){ return yScale(d.value); })
                    .attr('y2', function(d){ return yScale(d.value); })
                    .style('stroke', '#ffffff')
                    .style('stroke-width', '1')
                    .style('opacity', '0.5');
            }
        };
         

/////////// ----- 6.6. Various updates functions ----- ///////////

         
        // Finally, execution of pre-existing functions

        update() // For the beginning
        map.on("moveend", update) // For map moves afterwards

        selectDuree() // Update global variable
        sortSelectedSquares() // Update global variable

        togglePOP() // Check if the population differentials should be displayed

        selectPop() // Update the values of the displayed population count (1st rect)
        selectBassin() // Update the values of the total population count in selected areas (2nd rect)
        selectPercentage() // Update the values of the percentage (3rd rect)
        meanWeightedDuration() //Update the values of the weighted mean duration boxes (4th & 5th rects)

        hist() // Draw histogram
        
    }
});

