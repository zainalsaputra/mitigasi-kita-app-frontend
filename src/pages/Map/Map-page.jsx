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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate()
  useEffect(() => {
    console.log("Selected city:", selectedCity);
  }, [selectedCity]);

  return (
    <div className="flex flex-col">
      <Navbar className="fixed top-0 left-0 w-full z-[9999] bg-white shadow-md" />
      
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="flex flex-col md:flex-row flex-1 p-4 gap-4 mt-[100px]">
        
        {/* MAP SECTION */}
        <div className="w-full h-[250px] sm:h-[300px] md:w-2/3 md:h-[500px] rounded-lg overflow-hidden shadow-lg z-10 order-1 md:order-1">
          <MapContainer
            center={
              selectedCity?.lat && selectedCity?.long
                ? [selectedCity.lat, selectedCity.long]
                : [-2.5, 118]
            }
            zoom={selectedCity ? 10 : 5}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%", zIndex: 10 }}
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
        <div className="w-full md:w-1/3 bg-[#0D3553] p-4 sm:p-5 md:p-6 rounded-lg shadow-lg text-white flex flex-col justify-between z-20 order-2 md:order-2">
          {/* Form Prediksi */}
          <div className="bg-white rounded-sm shadow p-6 space-y-6 text-black font-poppins">
            <CitySelect onCityChange={setSelectedCity} />
            <button
              onClick={() =>
                handlePredictionPresenter(selectedCity, setPrediction)
              }
              className="w-full bg-[#0D3553] text-white font-poppins font-bold py-3 px-6 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!selectedCity}
            >
              Prediksi
            </button>
          </div>

          {/* Hasil Prediksi */}
          {prediction && (
            <div className="bg-white text-black p-6 rounded-sm shadow mt-6 space-y-4 text-sm overflow-auto max-h-[500px] items-center">
              <h3 className="text-lg sm:text-xl md:text-xl font-semibold mb-4 font-poppins text-center">Informasi Prediksi</h3>
              {prediction ? (
              <>
                <p className="flex items-center gap-3">
                  <FaLocationDot color="6D0000" size={20} />
                  <strong className="text-black font-bold font-poppins text-lg">Lokasi:</strong> 
                  <span className="text-black font-poppins text-lg">{prediction.city}</span>
                </p>
                <p className="flex items-center gap-3">
                  <FaCircleInfo color="0D3553" size={20} />
                  <strong className="text-black font-bold font-poppins text-lg">Status:</strong> 
                  <span className="text-black font-poppins text-lg">{prediction.status}</span>
                </p>
                <p className="flex items-center gap-3">
                  <FaWaveSquare color="C43238" size={20} />
                  <strong className="text-black font-bold font-poppins text-lg">Gempa Bumi:</strong> 
                  <span className="font-poppins text-black text-lg">{prediction.magnitude} M</span>
                </p>
                <p className="flex items-center gap-3">
                  <FaWater color="0687C3" size={20} />
                  <strong className="text-black font-bold font-poppins text-lg">Potensi Tsunami:</strong> 
                  <span className="font-poppins text-black text-lg">{prediction.potensi_tsunami}</span>
                </p>
                <p className="flex items-center gap-3">
                  <FaCloudSun color="FB9608" size={25} />
                  <strong className="text-black font-bold font-poppins text-lg">Cuaca:</strong> 
                  <span className="font-poppins text-black text-lg">{prediction.temperature_2m_max} °C</span>
                </p>
                <div className="flex justify-center mt-4">
                  <button
                    onClick={() => handleSaveHistoryPresenter(prediction, navigate)}
                    className="bg-[#C43238] text-white font-semibold py-3 px-4 rounded text-sm transition-colors flex items-center gap-2"
                  >
                    <FaDownload color="white" size={20} />
                    Simpan ke History
                  </button>
                </div>
              </>
            ) : (
              <p className="text-center text-white text-base">Silakan pilih lokasi dan klik tombol "Prediksi" untuk melihat hasil prediksi bencana.</p>
            )}
            </div>
          )}
        </div>
      </div>
      </div>
      <Footer />
    </div>  
  );
}

export default Map;
