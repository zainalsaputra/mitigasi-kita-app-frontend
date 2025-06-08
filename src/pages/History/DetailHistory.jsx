import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { loadHistoryDetailPresenter, deleteHistoryAndRedirectPresenter } from "../../../presenters/detailHistory-presenter";
import {
  FaMapMarkerAlt,
  FaWaveSquare,
  FaWater,
  FaTrash,
  FaArrowLeft,
  FaBolt,
  FaArrowsAltV,
  FaThermometerHalf,
  FaWind,
  FaCloudRain,
  FaBuilding,
} from "react-icons/fa";
import { FaCloudSun, FaCircleInfo } from "react-icons/fa6";

function DetailHistory() {
  const { id } = useParams();
  const [data, setHistory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistoryDetailPresenter(id, setHistory);
  }, [id]);

    const handleDelete = async () => {
      deleteHistoryAndRedirectPresenter(id, navigate);
      };
    
      if (!data) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4  pb-8 flex justify-center items-start ">
        <div className="bg-[#0D3553] p-4 md:p-8 rounded-lg text-white w-full max-w-lg font-poppins"
        style={{ boxShadow: "2px 2px 8px rgba(0, 0, 0, 1)" }}>

          {/* Tombol Kembali */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center mb-4 text-white font-semibold hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Kembali
          </button>

          {/* Kartu Utama */}
          <div className="bg-white text-black rounded-xl p-4 mb-6 space-y-4 text-md "
          style={{ boxShadow: "inset 6px 4px 2px rgba(0, 0, 0, 0.5)" }}>
            {/* Info Lokasi & Status */}
            <div className="text-center font-bold  text-lg ">
              <p className="mb-1 flex items-center justify-center gap-2">
                <FaMapMarkerAlt className="text-black " />
                Lokasi: 
                <span className="font-normal mr">{data.city}</span>
              </p>
              <p className="mb-1 flex items-center justify-center gap-2">
                <FaBuilding className="text-md text-black " />
                Agency:
                <span className="font-normal">{data.agency}</span>
              </p>
              <span
                className={`inline-flex items-center mt-2 px-4 py-2 rounded-md text-white ${
                  data.status === "Aman"
                    ? "bg-green-600"
                    : data.status === "Waspada"
                    ? "bg-yellow-500 text-black"
                    : "bg-red-600"
                }`}
              >
                <FaCircleInfo className="mr-2" />
                Status:
                <span className="font-normal pl-2">{data.status}</span>
              </span>
            </div>

            {/* Info Gempa */}
            <div className="bg-[#0D3553] text-white rounded-lg p-4 font-bold">
              <div className="flex items-center gap-2 mb-2 text-lg">
                <FaWaveSquare />
                <h3>Informasi Gempa Bumi</h3>
              </div>
              <p className="flex items-center gap-2">
                <FaBolt /> Magnitudo: 
                <span className="font-normal">{data.magnitude}</span>
              </p>
              <p className="flex items-center gap-2  ">
                <FaArrowsAltV /> Kedalaman: 
                <span className="font-normal">{data.depth} km</span>
              </p>
              <p className="flex items-center gap-2  ">
                <FaWater /> Potensi Tsunami: 
                <span className="font-normal">{data.potensi_tsunami}</span>
              </p>
            </div>

            {/* Info Cuaca */}
            <div className="bg-[#0D3553] text-white rounded-lg p-4 font-bold">
              <div className="flex items-center gap-2 mb-2 text-lg">
                <FaCloudSun />
                <h3 className="font-bold text-base">Informasi Cuaca</h3>
              </div>
              <p className="flex items-center gap-2">
                <FaThermometerHalf /> Suhu Min: 
                <span className="font-normal">{data.temperature_2m_min} °C </span>
              </p>
              <p className="flex items-center gap-2">
                <FaThermometerHalf /> Suhu Max: 
                <span className="font-normal">{data.temperature_2m_max} °C</span>
              </p>
              <p className="flex items-center gap-2">
                <FaWind /> Kecepatan Angin: 
                <span className="font-normal">{data.windspeed_10m_max} km/h</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCloudRain /> Curah Hujan:
                <span className="font-normal">{data.precipitation_sum} mm</span>
              </p>
            </div>

                {/* Tombol Delete */}
                <div className="text-center pt-2">
                  <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </main>

      <Footer className="mt-auto" />
    </div>
  );
}

export default DetailHistory;
