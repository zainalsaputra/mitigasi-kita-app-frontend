import Footer from "../../components/footer";
import React, { useState} from "react";
import Navbar from "../../components/navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import CitySelect from "../Location/CitySelect-page";
import { useEffect } from "react";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import ChangeView from "../../components/ChangeView";
import { getAccessTokenWithRefresh } from "../../utils/auth";
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});



function Map() {
  const [selectedCity, setSelectedCity] = useState(null);
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    console.log("Selected city:", selectedCity);
  }, [selectedCity]);

  const handlePrediction = async () => {
    if (!selectedCity?.lat || !selectedCity?.long) return;

    try {
      const res = await fetch("https://earthquake-tsunami-model-api-production.up.railway.app/predict", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: selectedCity.lat,
          longitude: selectedCity.long,
        }),
      });
      const result = await res.json();
      if (result.status === "success") {
        setPrediction(result.data);
      } else {
        alert("Prediksi gagal: " + result.message);
      }
      } catch (error) {
        console.error("Error fetching prediction:", error);
        alert("Terjadi kesalahan saat mengambil data prediksi.");
      }
    }
  
    const handleSaveHistory = async () => {
      const token = await getAccessTokenWithRefresh();
      if (!token) {
        console.error("Tidak ada token yang ditemukan. Pastikan Anda sudah login.");
        return;
      }
      if (!prediction) {
        alert("Tidak ada data prediksi untuk ditampilkan.");
        return;
      }

      try {
        const res = await fetch("https://mitigasi-kita-app-backend-production.up.railway.app/api/history", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(prediction),
        });
        if (res.ok) {
          alert("Prediksi berhasil disimpan!");
        } else {
          const err = await res.json();
          console.log("Gagal menyimpan: " + err.message);
        }
      } catch (error) {
        console.error("Error saving history:", error);
        alert("Terjadi kesalahan saat menyimpan data prediksi.");
      }
    }
  // console.log("Render Map with selectedCity:", selectedCity);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 p-4 gap-4 pt-24">
        <div className="w-full md:w-2/3 h-[500px]">
          <MapContainer
            center={
              selectedCity?.lat && selectedCity?.long
                ? [selectedCity.lat, selectedCity.long]
                : [-2.5, 118]
            }
            zoom={selectedCity ? 10 : 5}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {selectedCity && selectedCity.lat && selectedCity.long && (
              <>
                {console.log("Render Marker at:", [
                  selectedCity.lat,
                  selectedCity.long,
                ])}
                <Marker position={[selectedCity.lat, selectedCity.long]}>
                  <Popup>
                    {selectedCity.label}
                    <br />
                    Lat: {selectedCity.lat}, Long: {selectedCity.long}
                  </Popup>
                </Marker>
              </>
            )}

            <ChangeView
              center={
                selectedCity?.lat && selectedCity?.long
                  ? [selectedCity.lat, selectedCity.long]
                  : [-2.5, 118]
              }
              zoom={selectedCity ? 10 : 5}
            />
          </MapContainer>
        </div>
        {/* cityselect */}
        <div className="w-full md:w-1/3 lg:w-1/4 space-y-4">
          <CitySelect onCityChange={setSelectedCity} />

          <button
            onClick={handlePrediction}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            disabled={!selectedCity}
        >
          Prediksi
          </button>

          {prediction && (
            <div className="bg-white p-4 rounded shadow">
              <h3>Informasi Prediksi</h3>
              <p><strong>Lokasi:</strong> {prediction.city}</p>
              <p><strong>Status:</strong> {prediction.status}</p>
              <p><strong>Gempa Bumi:</strong> {prediction.magnitude} M</p>
              <p><strong>Potensi Tsunami:</strong> {prediction.potensi_tsunami}</p>
              <p><strong>Cuaca:</strong> {prediction.temperature_2m_max} °C</p>
              <button onClick={handleSaveHistory}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
              >
              Simpan ke History
              </button>
            </div>
            
          )}
        </div>
        
      </div>
      <Footer />
    </div>
  );
  
}

export default Map;