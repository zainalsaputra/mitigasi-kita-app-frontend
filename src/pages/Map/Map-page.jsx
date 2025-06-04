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
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});



function Map() {
  const [selectedCity, setSelectedCity] = useState(null);

  useEffect(() => {
    console.log("Selected city:", selectedCity);
  }, [selectedCity]);
  
  console.log("Render Map with selectedCity:", selectedCity);
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
        </div>
      </div>
      <Footer />
    </div>
  );
  
}

export default Map;