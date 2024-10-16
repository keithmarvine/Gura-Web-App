var map = L.map("map").setView([45.046597, 26.397728], 14);

// Open Street Map
var osm = L.tileLayer(
  "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}",
  {
    attribution:
      '&copy; <a href="https://obaidipedia.com/" target="_blank">obaidipedia</a>',
  }
);

// Stadia Outdoors
var Stadia_Outdoors = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://obaidipedia.com/" target="_blank">obaidipedia</a>',
    ext: "png",
  }
);

// Esri World Topo Map
var Esri_WorldTopoMap = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      '&copy; <a href="https://obaidipedia.com/" target="_blank">obaidipedia</a>',
  }
);
Esri_WorldTopoMap.addTo(map);

// Esri World Imagery
var Esri_WorldImagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      '&copy; <a href="https://obaidipedia.com/" target="_blank">obaidipedia</a>',
  }
);

// Stadia Alidade Smooth Dark
var dark_map = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}",
  {
    minZoom: 0,
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://obaidipedia.com/" target="_blank">obaidipedia</a>',
    ext: "png",
  }
);

// // WMS Request
var geoserverLayer = L.tileLayer.wms(
  "http://localhost:8080/geoserver/Prahova/wms?",
  {
    layers: "Gura Vadului",
    format: "image/png",
    transparent: true,
    attribution: "Gura Vadalui",
  }
);

// WFS Request
var wfsLayer = L.Geoserver.wfs("http://localhost:8080/geoserver/Prahova/ows?", {
  layers: "Gura Vadului",
  onEachFeature: function (feature, layer) {
    layer.bindPopup(
      "Name: " +
        "<b>" +
        feature.properties.name +
        "</b>" +
        "<br>" +
        "Surface: " +
        "<b>" +
        feature.properties.surface +
        "</b>" +
        "<br>" +
        "Type: " +
        "<b>" +
        feature.properties.type +
        "</b>" +
        "<br>" +
        "Status: " +
        "<b>" +
        feature.properties.status +
        "</b>" +
        "<br>" +
        "Color: " +
        "<b>" +
        feature.properties.color +
        "</b>"
    );
  },

  style: function (feature) {
    var region = feature.properties.name; // Access the 'name' attribute
    var fillColor;

    // List of 100 unique colors
    var colors = [
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF00FF",
      "#00FFFF",
      "#800000",
      "#008000",
      "#000080",
      "#808000",
      "#800080",
      "#008080",
      "#C0C0C0",
      "#FFA500",
      "#A52A2A",
      "#DEB887",
      "#5F9EA0",
      "#7FFF00",
      "#D2691E",
      "#FF7F50",
      "#6495ED",
      "#FFF8DC",
      "#DC143C",
      "#00FFFF",
      "#00008B",
      "#008B8B",
      "#B8860B",
      "#A9A9A9",
      "#006400",
      "#BDB76B",
      "#8B008B",
      "#556B2F",
      "#FF8C00",
      "#9932CC",
      "#8B0000",
      "#E9967A",
      "#8FBC8F",
      "#483D8B",
      "#2F4F4F",
      "#00CED1",
      "#9400D3",
      "#FF1493",
      "#00BFFF",
      "#696969",
      "#1E90FF",
      "#B22222",
      "#FFFAF0",
      "#228B22",
      "#DCDCDC",
      "#FFD700",
      "#DAA520",
      "#808080",
      "#008000",
      "#ADFF2F",
      "#F0FFF0",
      "#FF69B4",
      "#CD5C5C",
      "#4B0082",
      "#FFFFF0",
      "#F0E68C",
      "#E6E6FA",
      "#FFF0F5",
      "#7CFC00",
      "#FFFACD",
      "#ADD8E6",
      "#F08080",
      "#E0FFFF",
      "#FAFAD2",
      "#D3D3D3",
      "#90EE90",
      "#FFB6C1",
      "#FFA07A",
      "#20B2AA",
      "#87CEFA",
      "#778899",
      "#B0C4DE",
      "#FFFFE0",
      "#32CD32",
      "#FAF0E6",
      "#66CDAA",
      "#0000CD",
      "#BA55D3",
      "#9370DB",
      "#3CB371",
      "#7B68EE",
      "#00FA9A",
      "#48D1CC",
      "#C71585",
      "#191970",
      "#F5FFFA",
      "#FFE4E1",
    ];

    // Assign a color based on the region name
    var colorIndex = Math.floor(Math.random() * colors.length);
    fillColor = colors[colorIndex];

    return {
      color: "#000000",
      weight: 2,
      fillColor: fillColor,
      fillOpacity: 0.7,
    };
  },
});

// Tile Group
var baseMaps = {
  OSM: osm,
  "Dark Map": dark_map,
  "Topo Map": Esri_WorldTopoMap,
  "World Imagery": Esri_WorldImagery,
  Stadia: Stadia_Outdoors,
};
var overlayMaps = {
  "WMS Layer": geoserverLayer,
  "WFS Layer": wfsLayer,
};
var layerControl = L.control
  .layers(baseMaps, overlayMaps, { collapsed: false })
  .addTo(map);

// Map Scale
L.control
  .scale({
    imperial: false,
  })
  .addTo(map);

// Populate the dropdown button with province names from geoserver
function populateDropdown(data) {
  var dropdown = document.getElementById('areaDropdown');

  var allOption = document.createElement("option");
  allOption.value = "All";
  allOption.text = "All";
  dropdown.appendChild(allOption);

  var noneOption = document.createElement("option");
  noneOption.value = "None";
  noneOption.text = "None";
  dropdown.appendChild(noneOption);

  if (data && data.features) {
    data.features.forEach(function (feature){
      var option = document.createElement("option");
      option.value = feature.properties.name;
      option.text = feature.properties.name;
      dropdown.appendChild(option);
    });
  } else {
    console.error("No Data or Feature found in the geoserver response");
  }

  dropdown.addEventListener("change", function () {
    var selectedArea = this.value;
    toggleLayers(selectedArea);
  });

  toggleLayers("All");
}

$.ajax({
  url: "http://localhost:8080/geoserver/Prahova/ows?",
  data: {
    service: "WFS",
    request: "GetFeature",
    typeName: "Prahova:Gura Vadului",
    outputFormat: "application/json",
  },
  success: function (data) {
    populateDropdown(data);
  },
  error: function () {
    console.log("Error loading data from Geoserver WFS service");
  },
});

function toggleLayers(selectedArea) {
  map.eachLayer(function (layer) {
    map.removeLayer(layer);
  });

  Esri_WorldImagery.addTo(map);

  if (selectedArea === "All") {
    wfsLayer.addTo(map);
    map.fitBounds(wfsLayer.getBounds());
  } else if (selectedArea === "None") {
    map.fitBounds(wfsLayer.getBounds());
  } else {
    var filteredWfsLayer = L.Geoserver.wfs(
      "http://localhost:8080/geoserver/Prahova/ows?",
      {
        layers: "Gura Vadului",
        onEachFeature: function (feature, layer) {
          layer.bindPopup(
            "Name: " +
              "<b>" +
              feature.properties.name +
              "</b>" +
              "<br>" +
              "Surface: " +
              "<b>" +
              feature.properties.surface +
              "</b>" +
              "<br>" +
              "Type: " +
              "<b>" +
              feature.properties.type +
              "</b>" +
              "<br>" +
              "Status: " +
              "<b>" +
              feature.properties.status +
              "</b>" +
              "<br>" +
              "Color: " +
              "<b>" +
              feature.properties.color +
              "</b>"
          );
        },

        style: function (feature) {
          var region = feature.properties.name; // Access the 'name' attribute
          var fillColor;

          var colors = [
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FF00FF",
            "#00FFFF",
            "#800000",
            "#008000",
            "#000080",
            "#808000",
            "#800080",
            "#008080",
            "#C0C0C0",
            "#FFA500",
            "#A52A2A",
            "#DEB887",
            "#5F9EA0",
            "#7FFF00",
            "#D2691E",
            "#FF7F50",
            "#6495ED",
            "#FFF8DC",
            "#DC143C",
            "#00FFFF",
            "#00008B",
            "#008B8B",
            "#B8860B",
            "#A9A9A9",
            "#006400",
            "#BDB76B",
            "#8B008B",
            "#556B2F",
            "#FF8C00",
            "#9932CC",
            "#8B0000",
            "#E9967A",
            "#8FBC8F",
            "#483D8B",
            "#2F4F4F",
            "#00CED1",
            "#9400D3",
            "#FF1493",
            "#00BFFF",
            "#696969",
            "#1E90FF",
            "#B22222",
            "#FFFAF0",
            "#228B22",
            "#DCDCDC",
            "#FFD700",
            "#DAA520",
            "#808080",
            "#008000",
            "#ADFF2F",
            "#F0FFF0",
            "#FF69B4",
            "#CD5C5C",
            "#4B0082",
            "#FFFFF0",
            "#F0E68C",
            "#E6E6FA",
            "#FFF0F5",
            "#7CFC00",
            "#FFFACD",
            "#ADD8E6",
            "#F08080",
            "#E0FFFF",
            "#FAFAD2",
            "#D3D3D3",
            "#90EE90",
            "#FFB6C1",
            "#FFA07A",
            "#20B2AA",
            "#87CEFA",
            "#778899",
            "#B0C4DE",
            "#FFFFE0",
            "#32CD32",
            "#FAF0E6",
            "#66CDAA",
            "#0000CD",
            "#BA55D3",
            "#9370DB",
            "#3CB371",
            "#7B68EE",
            "#00FA9A",
            "#48D1CC",
            "#C71585",
            "#191970",
            "#F5FFFA",
            "#FFE4E1",
          ];

          var colorIndex = Math.floor(Math.random() * colors.length);
          fillColor = colors[colorIndex];

          return {
            color: "#000000",
            weight: 2,
            fillColor: fillColor,
            fillOpacity: 0.7,
          };
        },
        outputFormat: "application/json",
        CQL_FILTER: "name = '" + selectedArea + "'",
        attribution: "Vura Gadalui",
      }
    );
    filteredWfsLayer.addTo(map);
  }
}
