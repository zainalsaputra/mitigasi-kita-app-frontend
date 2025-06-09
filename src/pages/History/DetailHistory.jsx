import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import {
  loadHistoryDetailPresenter,
  deleteHistoryAndRedirectPresenter,
} from "../../../presenters/detailHistory-presenter";
import MySwal from "sweetalert2";
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
    // Pastikan alert gak numpuk
    if (MySwal.isVisible()) MySwal.close();

    MySwal.fire({
      title: "Menghapus data...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
      background: "#0D3553",
      color: "white",
      showConfirmButton: false,
    });

    try {
      await deleteHistoryAndRedirectPresenter(id, navigate);
      MySwal.close();
    } catch (error) {
      MySwal.close();
      MySwal.fire({
        icon: "error",
        title: "Gagal menghapus data",
        text: error.message || "Terjadi kesalahan",
        background: "#0D3553",
        color: "white",
      });
    }
  };

  const confirmDelete = () => {
    if (MySwal.isVisible()) MySwal.close();

    MySwal.fire({
      html: `
        <div class="text-white text-center font-bold font-poppins text-lg mb-2 text-md sm:text-lg md:text-xl ">
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
        </div>
      `,
      background: "#0D3553",
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
            handleDelete();
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

  const handleBackWithLoading = () => {
    if (MySwal.isVisible()) MySwal.close();

    MySwal.fire({
      title: "Loading...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
      background: "#0D3553",
      color: "white",
      showConfirmButton: false,
    });

    setTimeout(() => {
      MySwal.close();
      navigate(-1);
    }, 700);
  };

  if (!data)
    return (
      <p className="text-center mt-24 text-white font-semibold">
        Loading...
      </p>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 pb-8 flex justify-center items-start ">
        <div
          className="bg-[#0D3553] p-4 md:p-8 rounded-lg text-white w-full max-w-lg font-poppins"
          style={{ boxShadow: "2px 2px 8px rgba(0, 0, 0, 1)" }}
        >
          {/* Tombol Kembali */}
          <button
            onClick={handleBackWithLoading}
            className="flex items-center mb-4 text-white font-semibold hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Kembali
          </button>

          {/* Kartu Utama */}
          <div
            className="bg-white text-black rounded-xl p-4 mb-6 space-y-4 text-md "
            style={{ boxShadow: "inset 6px 4px 2px rgba(0, 0, 0, 0.5)" }}
          >
            {/* Info Lokasi & Status */}
            <div className="text-center font-bold  text-lg ">
              <p className="mb-1 flex items-center justify-center gap-2">
                <FaMapMarkerAlt className="text-black " />
                Lokasi: <span className="font-normal mr">{data.city}</span>
              </p>
              <p className="mb-1 flex items-center justify-center gap-2">
                <FaBuilding className="text-md text-black " />
                Agency: <span className="font-normal">{data.agency}</span>
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
                <FaBolt /> Magnitudo: <span className="font-normal">{data.magnitude}</span>
              </p>
              <p className="flex items-center gap-2  ">
                <FaArrowsAltV /> Kedalaman: <span className="font-normal">{data.depth} km</span>
              </p>
              <p className="flex items-center gap-2  ">
                <FaWater /> Potensi Tsunami: <span className="font-normal">{data.potensi_tsunami}</span>
              </p>
            </div>

            {/* Info Cuaca */}
            <div className="bg-[#0D3553] text-white rounded-lg p-4 font-bold">
              <div className="flex items-center gap-2 mb-2 text-lg">
                <FaCloudSun />
                <h3 className="font-bold text-base">Informasi Cuaca</h3>
              </div>
              <p className="flex items-center gap-2">
                <FaThermometerHalf /> Suhu Min: <span className="font-normal">{data.temperature_2m_min} °C </span>
              </p>
              <p className="flex items-center gap-2">
                <FaThermometerHalf /> Suhu Max: <span className="font-normal">{data.temperature_2m_max} °C</span>
              </p>
              <p className="flex items-center gap-2">
                <FaWind /> Kecepatan Angin: <span className="font-normal">{data.windspeed_10m_max} km/h</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCloudRain /> Curah Hujan:<span className="font-normal">{data.precipitation_sum} mm</span>
              </p>
            </div>

            {/* Tombol Delete */}
            <div className="text-center pt-2">
              <button
                onClick={confirmDelete}
                className="flex items-center justify-center gap-2 bg-[#C73134] text-white px-6 py-2 rounded-md font-medium mx-auto"
              >
                Delete
                <FaTrash />
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
