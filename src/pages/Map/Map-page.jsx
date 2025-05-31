import NavbarMap from "../../components/navbarMap";
import Footer from "../../components/footer";
import mapboxgl from 'mapbox-gl';
import { useRef, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";


mapboxgl.accessToken = "pk.eyJ1IjoiYXByaWwwMiIsImEiOiJjbWJjNDFqMnUxN2UwMmxwcnRkamdheG1rIn0.o1BdolGcT2cg-sYgHN9RXA";
const markers = [
  { id: 1, lat: -6.2, lng: 106.8, status: "bahaya" }, // Jakarta
  { id: 2, lat: -7.2, lng: 112.7, status: "waspada" }, // Surabaya
  { id: 3, lat: -0.9, lng: 100.4, status: "aman" }, // Padang
];

const getColor = (status) => {
  if (status === "bahaya") return "red";
  if (status === "waspada") return "yellow";
  return "green";
};

function Map() {
  const mapContainer = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v10",
      center: [117, -2],
      zoom: 4,
    });

    markers.forEach((marker) => {
      const el = document.createElement("div");
      el.className = "marker";
      el.style.backgroundColor = getColor(marker.status);
      el.style.width = "20px";
      el.style.height = "20px";
      el.style.borderRadius = "50%";

      new mapboxgl.Marker(el)
        .setLngLat([marker.lng, marker.lat])
        .setPopup(new mapboxgl.Popup().setText(`Status: ${marker.status}`))
        .addTo(map);
    });

    return () => map.remove();
  }, []);

  return (
    <div>
      <NavbarMap />
      <div className="flex justify-center pt-24 px-4">
        <div
          ref={mapContainer}
          className="w-[80vw] h-[70vh] rounded shadow-lg"
        />
        <div className="ml-4 p-4 bg-white rounded shadow">
          <h2 className="font-bold mb-2">Gempa Terkini</h2>
          <p>Magnitude: 5.2</p>
          <p>Lokasi: 87 km barat daya Bengkulu</p>
          <p>Kedalaman: 10 Km</p>

          <h2 className="font-bold mt-4">Keterangan</h2>
          <ul>
            <li>
              <span className="inline-block w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Bahaya
            </li>
            <li>
              <span className="inline-block w-3 h-3 bg-yellow-400 rounded-full mr-2"></span>
              Waspada
            </li>
            <li>
              <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Aman
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Map;