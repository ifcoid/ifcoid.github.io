import Map from "https://cdn.skypack.dev/ol/Map.js";
import View from "https://cdn.skypack.dev/ol/View.js";
import TileLayer from "https://cdn.skypack.dev/ol/layer/Tile.js";
import VectorLayer from "https://cdn.skypack.dev/ol/layer/Vector.js";
import VectorSource from "https://cdn.skypack.dev/ol/source/Vector.js";
import OSM from "https://cdn.skypack.dev/ol/source/OSM.js";
import { fromLonLat, toLonLat } from "https://cdn.skypack.dev/ol/proj.js";
import {
  Style,
  Stroke,
  Icon,
  Fill,
} from "https://cdn.skypack.dev/ol/style.js";


const attributions =
  '<a href="https://petapedia.github.io/" target="_blank">&copy; PetaPedia Indonesia</a> ';
const place = [107.57634352477324, -6.87436891415509];

// Layer dan sumber data untuk peta dasar
const basemap = new TileLayer({
  source: new OSM({ attributions: attributions }),
});

// Konfigurasi tampilan awal peta
const defaultstartmap = new View({
  center: fromLonLat(place),
  zoom: 16,
});

// Layer dan sumber data untuk jalan
const roadsSource = new VectorSource();
const roadsLayer = new VectorLayer({
  source: roadsSource,
  style: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 2,
    }),
  }),
});

// Layer dan sumber data untuk marker
const markerSource = new VectorSource();
const markerLayer = new VectorLayer({
  source: markerSource,
  style: new Style({
    image: new Icon({
      src: "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path fill="red" d="M12 2C8.14 2 5 5.14 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.86-3.14-7-7-7zm0 10.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>`),
      scale: 1,
      anchor: [0.5, 1],
    }),
  }),
});

// Layer dan sumber data untuk poligon
const polygonSource = new VectorSource();
const polygonLayer = new VectorLayer({
  source: polygonSource,
  style: new Style({
    fill: new Fill({
      color: "rgba(165, 163, 164, 0.59)", // Warna arsiran (biru transparan)
    }),
    stroke: new Stroke({
      color: "gray",
      width: 2,
    }),
  }),
});

let clickedCoordinates = null; // Variabel untuk menyimpan koordinat yang diklik
console.log("petapedia.js loaded!");

// Inisialisasi peta
export async function displayMap() {
  const map = new Map({
    target: "listing-map",
    layers: [basemap, roadsLayer, markerLayer, polygonLayer], // Tambahkan polygonLayer
    view: defaultstartmap,
  });

  // Tangani klik pada peta
  map.on("singleclick", function (event) {
    clickedCoordinates = toLonLat(event.coordinate); // Konversi koordinat ke lon/lat
    console.log(`Clicked on: ${clickedCoordinates[0]}, ${clickedCoordinates[1]}`);
    addMarker(event.coordinate); // Tambahkan marker pada lokasi yang diklik
  });

  // Event listener untuk tombol "SearchRegion"
  document.getElementById("searchRegion").addEventListener("click", async function () {
    if (clickedCoordinates) {
      const [longitude, latitude] = clickedCoordinates;

      // Fetch GeoJSON dari API
      const geoJSON = await fetchRegionGeoJSON(longitude, latitude);
      if (geoJSON) {
        displayPolygonOnMap(geoJSON); // Tampilkan poligon dari GeoJSON
      } else {
        alert("Failed to fetch region data. Please try again.");
      }
    } else {
      alert("Please click on the map to select a region.");
    }
  });

  // Event listener untuk tombol "SearchRoad"
  document.getElementById("searchRoad").addEventListener("click", async function () {
    if (clickedCoordinates) {
      const maxDistance = document.getElementById("maxDistance").value;
      if (!maxDistance || isNaN(maxDistance)) {
        alert("Please enter a valid max distance!");
        return;
      }

      const response = await fetchRoads(clickedCoordinates[0], clickedCoordinates[1], Number(maxDistance));
      if (response) {
        const geoJSON = convertToGeoJSON(response);
        displayRoads(geoJSON); // Tampilkan jalan pada peta
      }
    } else {
      alert("Please click on the map first!");
    }
  }); 
}
