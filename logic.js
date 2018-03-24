var queryURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

d3.json(queryURL, function(data) {
    createFeatures(data.features);
});

function createFeatures(earthquakeData) {

    // Define a function we want to run once for each feature in the features array
    // Give each feature a popup describing the place and time of the earthquake
    function handleFeature(feature, layer) {
        layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    }

    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the handleFeature function once for each piece of data in the array
    var earthquakes = L.geoJSON(earthquakeData, {
        onEachFeature: handleFeature
    });
    // Create a layer with all earthquake data
    var earthquakes = L.geoJSON(earthquakeData);

    // Sending our earthquakes layer to the createMap function
    createMap(earthquakes);
}

function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGl0dGxlc3Rkb2xsIiwiYSI6ImNqZHdnbTBzYTQ3bXUyeG80ZTQ3dWJtNjIifQ.uvSL6xgyBBXQSJ1Yopx9gA");

    var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibGl0dGxlc3Rkb2xsIiwiYSI6ImNqZHdnbTBzYTQ3bXUyeG80ZTQ3dWJtNjIifQ.uvSL6xgyBBXQSJ1Yopx9gA");

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
        "Street Map": streetmap,
        "Dark Map": darkmap
    };

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
        Earthquakes: earthquakes
    };

    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("map", {
        center: [37.09, -95.71],
        zoom: 5,
        layers: [darkmap, earthquakes]
    });

    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control
        .layers(baseMaps, overlayMaps, {
            collapsed: false
        }).addTo(myMap);
}