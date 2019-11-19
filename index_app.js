
//////////// 1. MAP COMPONENTS ////////////



// Adding the map 


var map = L.map('mapdiv').setView([46.56598,6.57148], 12);
var mapsvg = L.svg('mapsvg').addTo(map) // including a svg layer to the map;


// Custom basemaps definition

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


// Creating the basemap set

var baseLayers = {
    "Carte complète": mapbox_full,
    "Carte vierge": mapbox_noalt,
    "Photos aériennes ESRI": esriImagery
};


// Adding the basemap set

var overlays = {};
L.control.layers(baseLayers, overlays).addTo(map);

mapbox_full.addTo(map);


//Display of coordinates according to the location of the mouse pointer

map.on('mousemove', function(e){
  var coord = e.latlng;
  $('#coordinates').html('&emsp;&emsp;<b>Coordonnées:</b> ' + coord.lat.toFixed(5) +' / '+ coord.lng.toFixed(5)); 
});



//////////// 2. FEATURES & MARKERS ////////////



/////// 2.1. List of features IDs ///////


// TYPE: School

var schools = ['APP','BER','OEX','BEG','AIG','AUB','CVR','CPR','CRA','COR','AVE','BEX','CHE','MOO','CRI','CUG','BLO','BUS','GEN','EPA','ECH','ECU','COS','COP','GRA','GLA','LTP','LIM','LCF','LSA','LBG','LVI','LBV','LEL','LUT','LBT','LOL','VDJ','ORB','PAY','MOU','MSL','JOR','MOR','ORO','STP','NYO','MOE','PRE','OLL','ROL','VAL','REN','LAV','PUL','PRI','YVO','VIL','YLM','YFB','VEV','STC']

/////// 2.2. Custom markers ///////


// Common dimensions

var marker = L.Icon.extend({
    options: {
    iconSize: [29, 37],
    iconAnchor: [14.5, 37],
    popupAnchor: [0, -28]
    }
});


// Defining the design of the markers

var marker_school = new marker({iconUrl: 'images/marqueur_ecole_8.svg'}); // TYPE: School ; STATE: Unselected
var marker_school_selected = new marker({iconUrl: 'images/marqueur_ecole_select.svg'}); // TYPE: School ; STATE: Selected


// Create data for squares:

var squares = [];
for (i=0;i<30196;i++) {
    squares.push({long:+ population.features[i].geometry.coordinates[0], lat: +population.features[i].geometry.coordinates[1]+0.001, duree: +population.features[i].properties.duree, pop: +population.features[i].properties.pop, bassin: ''+population.features[i].properties.bassin})}

var duree = [];
for (i=0;i<30196;i++) {
    duree.push(population.features[i].properties.duree)}

var pop = [];
for (i=0;i<30196;i++) {
    pop.push(population.features[i].properties.pop)}

var bassin = [];
for (i=0;i<30196;i++) {
    bassin.push(population.features[i].properties.bassin)}
       
       
/////// 2.3. Adding markers with popups ///////


// TYPE : School ; STATE : Unselected

var schools_layer = L.geoJson(schools_features, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: marker_school});
    },
    onEachFeature: function(feature, dataLayer) {
        var popupText =  "<b>"+feature.properties.label+"</b>"
            + "<br>" + feature.properties.adresse+ ", "+feature.properties.NPA+" "+feature.properties.ville 
            + "<br>" + "<br>" + '<button ion-button clear round onclick=select_popup()'+'>Sélectionner cette unité</button>';
        dataLayer.bindPopup(popupText); }
})
       
       
// TYPE : School ; STATE : Selected

var schools_layer_selected = L.geoJson(schools_features, {
       pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {icon: marker_school_selected});
    },
        onEachFeature: function(feature, dataLayer) {
            var popupText =  "<b>"+feature.properties.label+"</b>"
                + "<br>" + feature.properties.adresse+ ", "+feature.properties.NPA+" "+feature.properties.ville 
                + "<br>"+ "<br>" + '<button ion-button clear round onclick=unselect_popup()'+'>Désélectionner cette unité</button>';
            dataLayer.bindPopup(popupText); }
});

        
        
/////// 2.4. jQuery plug-in for creating a drop-down list to display a selected service type  ///////


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
            var cell = $('<div class="dropdownCell">' + opts.title + '</div>');
           
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


// When an event from the drop-down list is selected, show the corresponding markers

function f(){
    schools_layer.addTo(map)
    d3.select("#hide_box_unites_selectionnees").remove();
}
$("ul").imgDropDown({title:"&nbsp;Sélectionnez le type de service :", selectEvent:f});
       

       
//////////// 3. UNIT SELECTION POSSIBILITES ////////////



/////// 3.1. Selection by checkboxes ///////


// For the first unit (because of a different ID)

function select_unit_first(){
    var checkBox = document.getElementById('APP');
    if (checkBox.checked == true){
        map.addLayer(schools_layer_selected["_layers"][116]) // Replace the marker to give it a darker appearance, indicating that its status is: Selected
        map.removeLayer(schools_layer["_layers"][53]);  // Remove the older marker
    }else{
        map.removeLayer(schools_layer_selected["_layers"][116])
        map.addLayer(schools_layer["_layers"][53]);
    }
}


// For the other units (IDs logically follows from now on)

function select_unit(){
    for (i=1;i<62;i++) {
    var checkBox = document.getElementById(schools[i]);
    if (checkBox.checked == true){
        map.addLayer(schools_layer_selected["_layers"][parseInt(i,10)+117])
        map.removeLayer(schools_layer["_layers"][parseInt(i,10)+54]);
    }else{
        map.removeLayer(schools_layer_selected["_layers"][parseInt(i,10)+117])
        map.addLayer(schools_layer["_layers"][parseInt(i,10)+54]);
    }
}
return
}
       
       
// Creating a new window to manage the selected entities

$(window).on('load', function() {
    $(".bouton_check").click(function(){
       $('.hover_bg').show();
    });
    $('.hover_close').click(function(){
        $('.hover_bg').hide();
    });
});


//Display the number of selected units

$(document).ready(function(){ 
  $('#form').click(function(){ 
   $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length)
   hide_box_choix_duree()
   if (document.querySelectorAll('input[name=foo]:checked').length == schools.length){
        document.getElementById("selectAll").checked = true
        }else{
        document.getElementById("selectAll").checked = false
        };
   });
});


//Allow access to the travel time choice box as soon as at least one unit is selected in the checkboxes

function hide_box_choix_duree(){ 
   if (document.querySelectorAll('input[name=foo]:checked').length > 0){
        document.getElementById("hide_box_choix_duree").style.display = "none"
        }else{
        document.getElementById("hide_box_choix_duree").style.display = "block"
        document.getElementById("hide_box_population").style.display = "block"
}}


/////// 3.2. Selection by lasso ///////


// Definition of the two types of lasso: the lasso for selecting markers and the lasso for deselecting markers. Radio buttons indicate which mode we are in.

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

    
// The lasso tool returns the geographic coordinates of the selected elements. To identify which units are involved, a list of coordinates classified according to the unit ID is created.

var coordinates = ["46.5524086, 6.4297215", "46.6907245, 6.7057165", "46.4743674, 7.1312982", "46.4403738, 6.2468853", "46.3187374, 6.9708943", "46.4940604, 6.3954748", "46.7045608, 6.5749699", "46.5336453, 6.5739469", "46.3789484, 6.1726711", "46.4715746, 6.8448702", "46.8798573, 7.0366842", "46.2522016, 7.0130046", "46.5855443, 6.6077453", "46.445212, 6.8987843", "46.5439189, 6.5750927", "46.5815063, 6.6430866", "46.4665558, 6.8962018", "46.5513361, 6.5523566", "46.4337478, 6.2210846", "46.5455857, 6.6548154", "46.639174, 6.6474212", "46.5321015, 6.5673683", "46.6102069, 6.5062618", "46.3225526, 6.1882738", "46.8134897, 6.6489963", "46.4222575, 6.2597661", "46.4546696, 6.857572", "46.5410705, 6.6471498", "46.536805, 6.6322301", "46.6586675, 6.5158301", "46.5317402, 6.6215684", "46.5188149, 6.6382495", "46.5201384, 6.6195153", "46.5102048, 6.6317965", "46.5077991, 6.6848613", "46.5225645, 6.6438024", "46.3610699, 7.0519186", "46.5996674, 6.2196535", "46.732252, 6.5311927", "46.8229452, 6.9433032", "46.6714581, 6.8009236", "46.5584618, 6.634623", "46.5940134, 6.7675028", "46.5170152, 6.5008187", "46.5718624, 6.8241561", "46.486524, 6.4548241", "46.3819385, 6.225876", "46.435056, 6.913221", "46.5166463, 6.52486", "46.2922718, 6.9886027", "46.4576549, 6.3315522", "46.7140355, 6.3789113", "46.5314798, 6.5885808", "46.4924435, 6.7664971", "46.5128634, 6.6600442", "46.5363416, 6.6073155", "46.7972112, 6.7406152", "46.3981361, 6.9296795", "46.77412, 6.6365431", "46.7690191, 6.6452823", "46.459251, 6.8476297", "46.8230407, 6.5001722"];


// Selecting the first unit (again because of a different ID)

if (lassoResult.innerHTML.includes(coordinates[0]) == true){
    map.addLayer(schools_layer_selected["_layers"][116]) // Replace the marker to give it a darker appearance, indicating that its status is: Selected
    map.removeLayer(schools_layer["_layers"][53])  // Remove the older marker
    document.getElementById("APP").checked = true // Check the checkbox corresponding to the selected unit
    $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length); // Update selected units count
}
 
 
//Selecting the other units (IDs logically follows from now on)

for (i=1;i<62;i++) {
if (lassoResult.innerHTML.includes(coordinates[i])==true){
    map.addLayer(schools_layer_selected["_layers"][parseInt(i,10)+117])
    map.removeLayer(schools_layer["_layers"][parseInt(i,10)+54])
    document.getElementById(schools[i]).checked = true
     $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length);
}
}


// Test if the travel time selection box can be accessed after lasso operations (at least one unit must be selected).

hide_box_choix_duree()

return
}});


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

    
    // Deselecting the first unit (again because of a different ID)
    
     var coordinates = ["46.3187374, 6.9708943","46.5524086, 6.4297215","46.4940604, 6.3954748","46.8798573, 7.0366842","46.4403738, 6.2468853","46.6907245, 6.7057165","46.2522016, 7.0130046","46.4665558, 6.8962018","46.5513361, 6.5523566","46.4743674, 7.1312982","46.5336453, 6.5739469","46.7045608, 6.5749699","46.5855443, 6.6077453","46.445212, 6.8987843","46.3225526, 6.1882738","46.4715746, 6.8448702","46.6102069, 6.5062618","46.3789484, 6.1726711","46.5439189, 6.5750927","46.5815063, 6.6430866","46.639174, 6.6474212","46.5321015, 6.5673683","46.5455857, 6.6548154","46.4337478, 6.2210846","46.4222575, 6.2597661","46.8134897, 6.6489963","46.6586675, 6.5158301","46.4546696, 6.857572","46.5201384, 6.6195153","46.5317402, 6.6215684","46.5225645, 6.6438024","46.5410705, 6.6471498","46.5102048, 6.6317965","46.5188149, 6.6382495","46.536805, 6.6322301","46.5584618, 6.634623","46.5996674, 6.2196535","46.3610699, 7.0519186","46.5077991, 6.6848613","46.5940134, 6.7675028","46.435056, 6.913221","46.5170152, 6.5008187","46.6714581, 6.8009236","46.3819385, 6.225876","46.2922718, 6.9886027","46.732252, 6.5311927","46.5718624, 6.8241561","46.8229452, 6.9433032","46.5166463, 6.52486","46.5363416, 6.6073155","46.4924435, 6.7664971","46.5128634, 6.6600442","46.5314798, 6.5885808","46.4576549, 6.3315522","46.486524, 6.4548241","46.8230407, 6.5001722","46.7140355, 6.3789113","46.459251, 6.8476297","46.3981361, 6.9296795","46.7690191, 6.6452823","46.77412, 6.6365431","46.7972112, 6.7406152"];
     
     if (lassoResult.innerHTML.includes(coordinates[0]) == true){
        map.removeLayer(schools_layer_selected["_layers"][116])
        map.addLayer(schools_layer["_layers"][53])
        document.getElementById("APP").checked = false
        $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length);
     }
     
     
    // Deselecting the other units (IDs logically follows from now on)
    
    for (i=1;i<62;i++) {
    if (lassoResult.innerHTML.includes(coordinates[i])==true){
        map.removeLayer(schools_layer_selected["_layers"][parseInt(i,10)+117])
        map.addLayer(schools_layer["_layers"][parseInt(i,10)+54])
        document.getElementById(schools[i]).checked = false
         $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length);
    }
    }
    
    
    // Test if the travel time selection box can be accessed after lasso operations (at least one unit must be selected).

    hide_box_choix_duree()
    return
}});


 // Allow to switch between the 2 modes of the lasso tool
 
lasso_unselect.addEventListener('click', function() {
    if (lasso_unsel.enabled()) {
        lasso_unsel.disable();
    } else {
        lasso_unsel.enable();
    }
});


/////// 3.3. Selection by popup ///////


 // Defining what should happen by selecting a marker

function select_popup(){
    for (i=1;i<62;i++) {
    if (schools_layer["_layers"][53].isPopupOpen() == true){ // For the first unity
        map.addLayer(schools_layer_selected["_layers"][116]) // Replace the marker to give it a darker appearance, indicating that its status is: Selected
        map.removeLayer(schools_layer["_layers"][53]) // Remove the older marker
    document.getElementById("APP").checked = true // Check the checkbox corresponding to the selected unit
    $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length)} // Update the count of the selected units
    else if (schools_layer["_layers"][parseInt(i,10)+54].isPopupOpen() == true){ // For the other units
        map.addLayer(schools_layer_selected["_layers"][parseInt(i,10)+117]) 
        map.removeLayer(schools_layer["_layers"][parseInt(i,10)+54])
    document.getElementById(schools[i]).checked = true
        $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length)
        hide_box_choix_duree()
        return
        }
    }
};
    
    
// Defining what should happen by deselecting a marker

function unselect_popup(){
    for (i=1;i<62;i++) {
    if (schools_layer_selected["_layers"][116].isPopupOpen() == true){
        map.removeLayer(schools_layer_selected["_layers"][116])
        map.addLayer(schools_layer["_layers"][53])
    document.getElementById("APP").checked = false
    $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length)}
    else if (schools_layer_selected["_layers"][parseInt(i,10)+117].isPopupOpen() == true){
        map.removeLayer(schools_layer_selected["_layers"][parseInt(i,10)+117])
        map.addLayer(schools_layer["_layers"][parseInt(i,10)+54])
    document.getElementById(schools[i]).checked = false
        $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length)
        hide_box_choix_duree()
        return
        }
    }
};


//////////// 4. REQUIREMENTS FOR RESULTS DISPLAY  ////////////



/////// 4.1. Initialization of global variables ///////


var selectedBassinSquares=[] // Contains all squares and their attributes belonging to the selected areas
var selectedBassin=[] // Contains all population counts belonging to the selected areas
  
var selectedSquares=[]  // Contains all squares and their attributes belonging to the selection displayed on the map
var selectedPop = [] // Contains all population counts belonging to the selection displayed on the map
var selectedDuree =[] // Contains all travel times belonging to the selection displayed on the map
  
var selectedSquaresSorted = [] // Contains all squares and their attributes belonging to the selection displayed on the map, sorted by travel time
var selectedSquaresSortP = [] // Contains all the population counts belonging to the selection displayed on the map, sorted by travel time
  
var histogram = [] // Contains the "hidden" histogram (as an array) of the travel times belonging to the selection displayed on the map. It is by definition a frequency histogram whereas we want a population histogram. This one will not be represented, and further changes must be made.
var barsValue = [] // Contains the number of inhabitants represented by each bin of the histogram
var donneesHist = [] // Contains the number of inhabitants represented by each bin of the histogram, as an array in order to be read with d3
var linesSteps =[] // Contains the position of the horizontal lines of the displayed histogram
var linesStepsNumberArr=[] // Contains the position of the horizontal lines of the displayed histogram, as an array in order to be read with d3
var numberOfBins = 15 // The number of bins of the displayed histogram

var colorScaleLinear = d3.scale.linear().domain([0,d3.max(pop)]).range(["lightblue","red"]) // Linear color scale with d3 (not used on the current version of the application)
var colorScaleCat = d3.scale.ordinal().domain(schools).range(["#2c7bb6","#00ccbc","#90eb9d","#f29e2e","#e76818","#d7191c"]) // Categorial color scale with d3


/////// 4.2. Initialization of some practical tools ///////


// Function that returns the sum of a given array

const arrSum = arr => arr.reduce((a,b) => a + b, 0)


// Function that adds an apostrophe to separate the thousands of large numbers

function lisibilite_nombre(nbr) { 
var nombre = ''+nbr; var retour = ''; var count=0; 
for(var i=nombre.length-1 ; i>=0 ; i--) { 
if(count!=0 && count % 3 == 0) retour = nombre[i]+"'"+retour ; 
else retour = nombre[i]+retour ; count++; } 
return retour; }


// Function that transforms time expressions from "seconds" to "minutes" format

function secToMin(time)
{   
    // Hours, minutes and seconds
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


// Function that update square position if something change (i.e. zoom or map pan)

function update() {
  d3.select("#mapdiv")
  .selectAll("rect")
    .attr("x", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
    .attr("y", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
    .attr("width",function(e){return (0.0009*Math.pow(2.004, map.getZoom()))})
    .attr("height",function(e){return (0.0009*Math.pow(2.004, map.getZoom()))})
    .style("stroke-width", function(e){return (0.0000005*Math.pow(2.5,map.getZoom()))});
}


/////// 4.3. Slider box & Population box various functionalities ///////


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


// Function that erase the displayed squares on the map without the selected markers

function eraseSquares(){
 
    d3.selectAll("rect").remove()  // Erasing the squares
     
    selectedSquares=[]  // Reinitializing some variables
    selectedIds=[] 
    selectedPop=[]
    selectedBassin=[]
    allDurations = []

    $("#selectedPop").html(arrSum(selectedPop))  // Reinitializing the rect values
    $("#selectedBass").html(arrSum(selectedBassin))
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


// Function that erase the displayed squares on the map with the selected markers (see previous function above for details)

function eraseSelection(){
    d3.selectAll("rect").remove()
    selectedSquares=[]
    selectedIds=[]

    for (i=1;i<62;i++) {
        map.removeLayer(schools_layer_selected["_layers"][116])
        map.addLayer(schools_layer["_layers"][53])
        document.getElementById("APP").checked = false
        document.getElementById("selectAll").checked = false
        map.addLayer(schools_layer["_layers"][parseInt(i,10)+54])
        map.removeLayer(schools_layer_selected["_layers"][parseInt(i,10)+117])
        document.getElementById(schools[i]).checked = false
        document.getElementById("POP").checked = false
    }

    selectedPop=[]
    selectedBassin=[]
    allDurations = []

    $("#count_checked_checkboxes").html(document.querySelectorAll('input[name=foo]:checked').length)
    $("#selectedPop").html(arrSum(selectedPop))
    $("#selectedBass").html(arrSum(selectedBassin))
    $("#selectedPerc").html(0)
    $("#MWD").html(0)
    $("#MWDtot").html(0)
    $("#meanDeviation").html("-")
    $("#eval").html("-")

    hide_box_choix_duree()

    var emp = d3.select("#box_hist").select("svg")
    if ( emp == null){
    }else{
        d3.select("#box_hist").select("svg").remove()
    }
};


// Function that shows/hides d3 population differentials

function togglePOP(){
    var checkboxPOP = document.querySelector("input[name=POP]");
     if(checkboxPOP.checked) {
    d3.select("#mapdiv").selectAll("rect").remove()
    d3.select("#mapdiv")
        .select("svg")
        .selectAll("mySquares")
        .data(selectedSquares)
        .enter()
        .append("rect")
            .attr("x", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("y", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
            .attr("width", "0.469")
            .attr("height", "0.469")
            .attr("fill", function(d){return colorScaleCat(d.bassin)})
            .style("stroke", "white")
            .style("stroke-width", 1)
            .style("stroke-linejoin", "round")
            .style("fill-opacity", function(d){return ((Math.sqrt(0.0012*d.pop))*1.5)})

    update()
} else {
    d3.select("#mapdiv").selectAll("rect").remove()
    d3.select("#mapdiv")
        .select("svg")
        .selectAll("mySquares")
        .data(selectedSquares)
        .enter()
        .append("rect")
            .attr("x", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
            .attr("y", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
            .attr("width", "0.469")
            .attr("height", "0.469")
            .attr("fill", function(d){return colorScaleCat(d.bassin)})
            .style("stroke", "white")
            .style("stroke-width", 1)
            .style("stroke-linejoin", "round")
            .style("fill-opacity", 0.8)
    update()
}};



//////////// 5. EVENTS RELATED TO THE DRAG OF THE SLIDER ////////////



/////// 5.1. Function initialization ///////


// Creating the function encompassing all events related to the slider movement

$(document).ready(function () {
    slider.oninput = function () {


        // Update the slider value after drag

        sliderOutput.innerHTML = this.value
            

        /////// 5.2. Filling or updating global variables ///////
            
            
        // Fill the global variable selectedIDs with every ID corresponding to the selected areas (based on checkboxes status)

        selectedIds=[]
        id = $("#form input:checked").each(function() {
            if (selectedIds.includes($(this).attr("id"))){
            }else{
            selectedIds.push( $(this).attr("id"))};
        });


        // Fill the global variable selectedSquares with all squares and their attributes belonging to the selection displayed on the map

        selectedSquares.length = 0 // to update the count to zero at each new value chosen, avoid adding preexistent squares at each search
        for (i=0;i<30196;i++) {
            if (duree[i]<sliderOutput.innerHTML*60 && selectedIds.includes(squares[i].bassin) ==true){
                selectedSquares.push(squares[i])
            }
        };


        // Fill the global variable selectedBassinSquares with all squares and their attributes belonging to the selected areas

        selectedBassinSquares.length = 0
        for (i=0;i<30196;i++) {
            if (duree[i]<30000&&selectedIds.includes(squares[i].bassin) ==true){
                selectedBassinSquares.push(squares[i])
            }
        };


        // Function to fill the global variable selectedDuree with all travel times belonging to the selection displayed on the map

        function selectDuree(){
            selectedDuree=[]
            for (i=0;i<selectedSquares.length;i++){
                selectedDuree.push(selectedSquares[i].duree)
            }
        };


        // Function to fill the global variable sortSelectedSquares with all squares and their attributes belonging to the selection displayed on the map, sorted by ascending travel time

        function sortSelectedSquares(){
            selectedSquaresSorted = []
            selectedSquaresSorted.push(selectedSquares.sort(function(a, b) {
                return parseFloat(a.duree) - parseFloat(b.duree)
            }))
            selectedSquaresSortP = []
            for (i=0;i<selectedSquares.length;i++){
                selectedSquaresSortP.push(selectedSquaresSorted[0][i].pop)
            }
        }


        /////// 5.3. Squares on map ///////


        // Adding the squares on the map with d3
        
        d3.select("#mapdiv").select("svg").selectAll("rect").remove(); //effacer l'ancienne sélection pour la remplacer par la nouvelle

        d3.select("#mapsvg")
            .selectAll("rect")
            .data(selectedSquares)
            .enter()
            .append("rect")
                .attr("x", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).x })
                .attr("y", function(d){ return map.latLngToLayerPoint([d.lat, d.long]).y })
                .attr("width", "0.469")
                .attr("height", "0.469")
                .attr("fill", function(d){return colorScaleCat(d.bassin)})
                .style("stroke", "white")
                .style("stroke-width", 1)
                .style("stroke-linejoin", "round")
                .style("fill-opacity", 0.8)
            
        // Test if the population grid box can be accessed after slider move (condition: at least one square must be displayed on the map).

        if (selectedSquares.length > 0){
            document.getElementById("hide_box_population").style.display = "none"
        }else{
            document.getElementById("hide_box_population").style.display = "block"
        };


        /////// 5.4. Displayed values in rects ///////


        // Returns the sum of the inhabitants living in the selection displayed on the map

        function selectPop(){
            selectedPop=[]
            for (i=0;i<selectedSquares.length;i++){
                selectedPop.push(selectedSquares[i].pop)
            }
            $("#selectedPop").html(lisibilite_nombre(arrSum(selectedPop)))
        }


        // Returns the sum of the inhabitants living in the selected areas

        function selectBassin(){
            selectedBassin=[]
            for (i=0;i<selectedBassinSquares.length;i++){
                selectedBassin.push(selectedBassinSquares[i].pop)
            }
            $("#selectedBass").html(lisibilite_nombre(arrSum(selectedBassin)))
        }


        // Returns the percentage of the inhabitants living in the selected areas displayed on the map

        function selectPercentage(){
            $("#selectedPerc").html((arrSum(selectedPop)/arrSum(selectedBassin)*100).toFixed(2))

            
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
            
            allDurations=[] // Calculation of the weighted mean duration of the selection displayed on map
            for (i=0;i<selectedSquares.length;i++){
                allDurations.push(selectedSquares[i].pop*selectedSquares[i].duree)
            }
            
            var MWD = secToMin(arrSum(allDurations)/arrSum(selectedPop))
            $("#MWD").html(MWD)
            
            allDurationsBassin=[] // Calculation of the weighted mean duration of the selected areas
            for (i=0;i<selectedBassin.length;i++){
                allDurationsBassin.push(selectedBassinSquares[i].pop*selectedBassinSquares[i].duree)
            }
            
            var MWDtot = secToMin(arrSum(allDurationsBassin)/arrSum(selectedBassin))
            $("#MWDtot").html(MWDtot)
            
            allDurationsCanton=[] // Calculation of the weighted mean duration of the selection displayed on map
            for (i=0;i<squares.length;i++){
                allDurationsCanton.push(squares[i].pop*squares[i].duree)
            }
            
            var meanDeviation = Math.round((arrSum(allDurationsBassin)/arrSum(selectedBassin))-arrSum(allDurationsCanton)/arrSum(pop))
            if (meanDeviation >0){
                $("#meanDeviation").html("+" + secToMin(meanDeviation))
                document.getElementById("meanDeviation").className = "positiveMeanDeviation"
                document.getElementById("eval").className = "badEval"
            }else{
                $("#meanDeviation").html("-"+secToMin(-(meanDeviation)))
                document.getElementById("meanDeviation").className = "negativeMeanDeviation"
                document.getElementById("eval").className = "goodEval"
            }

            if (meanDeviation > 120){ // If-loop determining the smiley's mood ;-)
                $("#eval").html("TRÈS SUPÉRIEUR " +"<br>"+ "&#128577" + "&#128577" + "&#128577")
            }else if (meanDeviation > 60){
                $("#eval").html("SUPÉRIEUR " +"<br>"+ "&#128577" + "&#128577")
            }else if (meanDeviation > 1){
                $("#eval").html("PEU SUPÉRIEUR " +"<br>"+ "&#128577")
            }else if (Math.round((arrSum(allDurationsBassin)/arrSum(selectedBassin))-arrSum(allDurationsCanton)/arrSum(pop)) > -1){
                $("#eval").html("MOYEN " +"<br>"+ "&#128528")
            }else if (Math.round((arrSum(allDurationsBassin)/arrSum(selectedBassin))-arrSum(allDurationsCanton)/arrSum(pop)) > -60){
                $("#eval").html("PEU INFÉRIEUR " +"<br>"+ "&#128578")
            }else if (Math.round((arrSum(allDurationsBassin)/arrSum(selectedBassin))-arrSum(allDurationsCanton)/arrSum(pop)) > -120){
                $("#eval").html("INFÉRIEUR " +"<br>"+ "&#128578" + "&#128578")
            }else {$("#eval").html("TRÈS INFÉRIEUR " +"<br>"+ "&#128578" + "&#128578" + "&#128578")}
        

        
        }



        /////// 5.5. Histogram ///////


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

                histogram = []
                histogram.push(d3.layout.histogram()
                    .bins(numberOfBins)
                    (selectedDuree))
                    

                // Fill the global variable barsValue with the number of inhabitants represented by each bin of the histogram

                barsValue=[]   
                for (i=0;i<numberOfBins;i++){
                    barsValue.push(arrSum(selectedSquaresSortP.splice(0,histogram[0][i].y)))
                }

                // Fill the global variable donneesHist with the number of inhabitants represented by each bin of the histogram, as an array in order to be read with d3

                donneesHist=[]
                donneesHist = d3.range(numberOfBins).map(function(d,i){
                    return {'id':(histogram[0][i].x)/60,'value': barsValue[i],'barWidth':(histogram[0][i].dx)/60}
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
                    .domain([0,(d3.max(selectedDuree))/60])
                    .range([0,widthHist])

                    
                // Range & domain of the y axis

                var yScale = d3.scale.linear()
                    .domain([0,d3.max(barsValue)])
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
                    .data(donneesHist)
                    .enter()
                    .append("g")
                    
                var tip = d3.tip()
                  .attr('class', 'd3-tip')
                  .offset([-10, 0])
                  .html(function(d) {
                    return "<nobr>"+String.fromCodePoint(0x23F3)+" : "+secToMin(Math.round((d.id)*60))+"-"+secToMin(Math.round((d.id+d.barWidth)*60))+" min. <br><br>"+String.fromCodePoint(0x1F466)+" : <span style='color:#ffffff'>" + lisibilite_nombre(d.value) + " hab.</span></nobr>";
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

                linesSteps =[]
                for(i=1;i<10;i++){
                    linesSteps.push(parseInt((d3.select("#box_hist").select("svg").selectAll("text")[0].slice(-i)[0].innerHTML),10)) //Create an array of the 10 last "text" elements found in the histogram box
                }
                function isZero(element) {
                    return element == 0;
                }
                linesSteps.length = linesSteps.findIndex(isZero) //Find the 0 (origin) in the array and remove it as well as the following "text" elements that do not relate to the y axis.
 
                
                // Creating an array of these values
                
                for (i=1;i<linesSteps.length;i++){
                linesStepsNumberArr=[]
                linesStepsNumberArr.push(d3.range(linesSteps.length).map(function(d,i){
                    return {'id':i,'value': linesSteps[i]}
                }))};


                // Adding the horizontal bars with d3

                var barSteps = canevas.append('g').attr('class', 'bars separators');
                barSteps.selectAll('line')
                    .data(linesStepsNumberArr[0])
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



