//Making a map and tiles
const mymap = L.map("issMap").setView([0, 0], 6);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
//Making a custom icon
const myIss = L.icon({
  iconUrl: "iss200.png",
  iconSize: [50, 32],
  iconAnchor: [26, 16],
});

const marker = L.marker([0, 0], { icon: myIss }).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude } = data;

  marker.setLatLng([latitude, longitude]);
  mymap.setView([latitude, longitude], 8);

  document.getElementById("lat").textContent = latitude;
  document.getElementById("lon").textContent = longitude;
  //setTimeout(() => getISS(api_url), 1000)
}
getISS();
