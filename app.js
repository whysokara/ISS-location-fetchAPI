//Making a map and tiles
const mymap = L.map("issMap").setView([0, 0], 6);
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);
//Making a custom icon
const issIcon = L.icon({
  iconUrl: "iss200.png",
  iconSize: [50, 32],
  iconAnchor: [26, 16],
});

const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";
let firstTime = true;
async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude, altitude } = data;

  const aspect = 1.5625;
  const w = (altitude * aspect) / 10;
  const h = altitude / 10;
  issIcon.options.iconSize = [w, h];
  issIcon.options.iconAnchor = [w / 2, h / 2];

  marker.setLatLng([latitude, longitude]);

  if (firstTime) {
    mymap.setView([latitude, longitude], 2);
    firstTime = false;
  }

  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("lon").textContent = longitude.toFixed(2);
  document.getElementById("alt").textContent = altitude.toFixed(2);
  //setTimeout(() => getISS(api_url), 1000)
}
getISS();

setInterval(getISS, 1000);
