import Footer from "../../components/footer";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import CitySelect from "../Location/CitySelect-page";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
import ChangeView from "../../components/ChangeView";
import { handlePredictionPresenter, handleSaveHistoryPresenter } from "../../../presenters/map-presenter";
import { FaLocationDot, FaCircleInfo, FaWaveSquare, FaWater, FaCloudSun, FaDownload } from "react-icons/fa6";

// Fix for default Leaflet icon issues
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

  return (
    // Hapus 'min-h-screen flex flex-col' dari div terluar
    // Biarkan tinggi div ini menyesuaikan dengan kontennya.
    <div className="font-poppins text-black"> {/* Tambahkan class font jika diperlukan */}
      <Navbar />

      {/* Tambahkan padding-top untuk offset Navbar, seperti di Education.jsx */}
      {/* Hapus mt-20 dari div ini karena sudah diganti dengan pt-24 */}
      <div className="pt-24 pb-16 flex flex-col md:flex-row gap-6"> {/* Menyesuaikan layout utama */}
        {/* MAP SECTION */}
        {/* Pertimbangkan untuk mengubah h-[500px] agar lebih responsif vertikal,
            misalnya menggunakan 'h-96' atau 'aspect-video' jika memungkinkan,
            atau membiarkan flex-1 jika parent-nya punya tinggi yang terkontrol.
            Untuk awal, kita bisa pertahankan h-[500px] dulu dan lihat hasilnya. */}
        <div className="w-full md:w-2/3 h-[500px] rounded-xl overflow-hidden shadow-lg">
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
              <Marker position={[selectedCity.lat, selectedCity.long]}>
                <Popup>
                  {selectedCity.label}
                  <br />
                  Lat: {selectedCity.lat}, Long: {selectedCity.long}
                </Popup>
              </Marker>
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

        {/* PREDICTION PANEL SECTION */}
        {/* Jika ingin panel ini memiliki tinggi yang lebih dinamis,
            Anda mungkin perlu menghapus max-h-[500px] atau mengaturnya dengan lebih fleksibel. */}
        <div className="w-full md:w-1/3 bg-[#0D3553] p-6 rounded-xl shadow-lg text-white flex flex-col justify-between">
          {/* Form Prediksi */}
          <div className="bg-white rounded-xl shadow p-6 space-y-6">
            <CitySelect onCityChange={setSelectedCity} />
            <button
              onClick={() =>
                handlePredictionPresenter(selectedCity, setPrediction)
              }
              className="w-full bg-[#0D3553] text-white font-poppins font-bold py-3 px-6 rounded hover:bg-[#09263b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedCity}
            >
              Prediksi
            </button>
          </div>

          {/* Hasil Prediksi */}
          {prediction && (
            <div className="bg-white text-black p-6 rounded-xl shadow mt-6 space-y-4 text-sm overflow-auto max-h-[500px]">
              <h3 className="text-2xl font-semibold mb-4 font-poppins text-center">Informasi Prediksi</h3>
              <p className="flex items-center gap-3">
                <FaLocationDot color="6D0000" size={25} />
                <strong className="text-black font-bold font-poppins text-xl">Lokasi:</strong> 
                <span className="text-black font-poppins text-xl">{prediction.city}</span>
              </p>
              <p className="flex items-center gap-3">
                <FaCircleInfo color="0D3553" size={25} />
                <strong className="text-black font-bold font-poppins text-xl">Status:</strong> 
                <span className="text-black font-poppins text-xl">{prediction.status}</span>
              </p>
              <p className="flex items-center gap-3">
                <FaWaveSquare color="C43238" size={25} />
                <strong className="text-black font-bold font-poppins text-xl">Gempa Bumi:</strong> 
                <span className="font-poppins text-black text-xl">{prediction.magnitude} M</span>
              </p>
              <p className="flex items-center gap-3">
                <FaWater color="0687C3" size={25} />
                <strong className="text-black font-bold font-poppins text-xl">Potensi Tsunami:</strong> 
                <span className="font-poppins text-black text-xl">{prediction.potensi_tsunami}</span>
              </p>
              <p className="flex items-center gap-3">
                <FaCloudSun color="FB9608" size={30} />
                <strong className="text-black font-bold font-poppins text-xl">Cuaca:</strong> 
                <span className="font-poppins text-black text-xl">{prediction.temperature_2m_max} °C</span>
              </p>
              <div className="flex justify-center mt-4">
                <button
                  onClick={() => handleSaveHistoryPresenter(prediction)}
                  className="bg-[#C43238] hover:bg-[#a92d32] text-white font-semibold py-3 px-8 rounded text-sm transition-colors flex items-center gap-2"
                >
                  <FaDownload color="white" size={20} />
                  Simpan ke History
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Map;