import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { loadHistoryDetailPresenter, deleteHistoryAndRedirectPresenter } from "../../../presenters/detailHistory-presenter";
import MySwal from "sweetalert2"
import {
  FaMapMarkerAlt,
  FaWaveSquare,
  FaWater,
  FaTrash,
  FaArrowRight,
  FaArrowLeft
} from 'react-icons/fa';
import { FaCircleInfo, FaCloudSun } from 'react-icons/fa6';


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

      const confirmDelete = (id) => {
          MySwal.fire({
            html: `
              <div class="text-white text-center font-bold text-lg mb-4">
                Apa Anda yakin ingin <br />menghapus History ini?
              </div>
               <div class="flex justify-center gap-4">
              <button id="cancel-btn" class="bg-white text-gray-700 font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
                Cancel
              </button>
              <button id="confirm-delete-btn" class="bg-white text-red-700 font-bold px-4 py-2 rounded hover:bg-gray-100 transition">
                Delete
              </button>
            </div>
            `,
            background: "#dc2626",
            showConfirmButton: false,
            allowOutsideClick: false,
            customClass: {
              popup: "rounded-lg px-8 py-6",
            },
            didOpen: () => {
              const confirmBtn = document.getElementById("confirm-delete-btn");
              const cancelBtn = document.getElementById("cancel-btn");
      
              if (confirmBtn) {
                confirmBtn.addEventListener("click", () => {
                  MySwal.close();
                  handleDelete(id); // panggil delete setelah konfirmasi
                });
              }
      
              if (cancelBtn) {
                cancelBtn.addEventListener("click", () => {
                  MySwal.close();
                });
              }
            },
          });
        };
    
      if (!data) return <p>Loading...</p>;

      return (
        <div className="min-h-screen flex flex-col bg-white">
          <Navbar />

          <main className="flex-1 pt-24 px-4 md:px-6 pb-8 flex justify-center items-start">
            <div className="bg-[#002B5B] p-6 rounded-2xl text-white w-full max-w-lg shadow-lg">
              
              {/* Tombol Kembali */}
              <button
                onClick={() => navigate(-1)}
                className="flex items-center mb-6 text-white font-poppins"
              >
                <FaArrowLeft className="mr-2" /> Kembali
              </button>


              {/* Kartu Utama */}
              <div className="bg-white text-black rounded-xl p-6 space-y-4">
                
                {/* Info Lokasi & Status */}
                <div className="text-center">
                  <p className="font-bold text-lg mb-1">Lokasi: {data.city}</p>
                  <p className="mb-1"><b>Agency:</b> {data.agency}</p>
                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-white text-sm ${
                      data.status === "Aman"
                        ? "bg-green-600"
                        : data.status === "Waspada"
                        ? "bg-yellow-500"
                        : "bg-red-600"
                    }`}
                  >
                    Status: {data.status}
                  </span>
                </div>

                {/* Info Gempa */}
                <div className="bg-[#022D5A] text-white rounded-lg p-4">
                  <h3 className="font-bold mb-2 text-base">Informasi Gempa Bumi</h3>
                  <p>Magnitudo: {data.magnitude}</p>
                  <p>Kedalaman: {data.depth} km</p>
                  <p>Potensi Tsunami: {data.potensi_tsunami}</p>
                </div>

                {/* Info Cuaca */}
                <div className="bg-[#022D5A] text-white rounded-lg p-4">
                  <h3 className="font-bold mb-2 text-base">Informasi Cuaca</h3>
                  <p>Suhu Min: {data.temperature_2m_min} °C</p>
                  <p>Suhu Max: {data.temperature_2m_max} °C</p>
                  <p>Kecepatan Angin: {data.windspeed_10m_max} km/h</p>
                  <p>Curah Hujan: {data.precipitation_sum} mm</p>
                </div>

                {/* Tombol Delete */}
                <div className="text-center pt-2">
                  <button
                    onClick={() => confirmDelete(id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      );
}

export default DetailHistory