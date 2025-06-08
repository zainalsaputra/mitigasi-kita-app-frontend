import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { loadHistoryDetailPresenter, deleteHistoryAndRedirectPresenter } from "../../../presenters/detailHistory-presenter";
import MySwal from "sweetalert2"
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
        <div>
          <Navbar />
          <div className="pt-24 px-6 min-h-screen flex justify-center items-start">
            <div className="bg-[#002B5B] p-6 rounded-2xl text-white w-full max-w-md shadow-lg">
              <button
                onClick={() => navigate(-1)}
                className="text-sm mb-4 text-white"
              >
                ← Kembali
              </button>
              <div className="bg-white text-black rounded-xl p-6">
                <p className="font-bold text-center mb-2">
                  Lokasi: {data.city}
                </p>
                <p className="text-center mb-1">
                  <b>Agency:</b> {data.agency}
                </p>
                <div className="text-center mb-4">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-white text-sm ${
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

                <div className="bg-[#022D5A] text-white rounded-lg p-4 mb-4">
                  <p className="font-bold mb-2"> Informasi Gempa Bumi</p>
                  <p> Magnitudo: {data.magnitude}</p>
                  <p> Kedalaman: {data.depth} km</p>
                  <p> Potensi Tsunami: {data.potensi_tsunami}</p>
                </div>

                <div className="bg-[#022D5A] text-white rounded-lg p-4">
                  <p className="font-bold mb-2"> Informasi Cuaca</p>
                  <p> Suhu Min: {data.temperature_2m_min} °C</p>
                  <p> Suhu Max: {data.temperature_2m_max} °C</p>
                  <p> Kecepatan Angin: {data.windspeed_10m_max} km/h</p>
                  <p> Curah Hujan: {data.precipitation_sum} mm</p>
                </div>

                <div className="text-center mt-6">
                  <button
                    onClick={() => confirmDelete(id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      );
}

export default DetailHistory