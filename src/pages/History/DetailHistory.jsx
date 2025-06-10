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
    async function fetchDetail() {
      try {
        await loadHistoryDetailPresenter(id, setHistory);
      } catch (error) {
        MySwal.fire({
          icon: "error",
          title: "Gagal memuat data",
          text: error.message || "Terjadi kesalahan saat memuat detail.",
          background: "#fff",
          customClass: {
            popup: "font-poppins",
          },
        });
      }
    }
    fetchDetail();
  }, [id]);

  const handleDelete = async () => {
    MySwal.fire({
      title: "Menghapus data...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
      background: "#fff",
      customClass: {
        popup: "font-poppins",
      },
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
        customClass: {
          popup: "font-poppins",
        },
      });
    }
  };

  const confirmDelete = () => {
    MySwal.fire({
      title: "Yakin ingin menghapus data ini?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      background: "#fff",
      confirmButtonColor: "#0D3553",
      cancelButtonColor: "#C73134",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
      customClass: {
        popup: "font-poppins",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete();
      }
    });
  };

  const handleBackWithLoading = () => {
    if (MySwal.isVisible()) MySwal.close();

    MySwal.fire({
      title: "Mengarahkan kembali...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
      background: "#fff",
      showConfirmButton: false,
      customClass: {
        popup: "font-poppins",
      },
    });

    setTimeout(() => {
      MySwal.close();
      navigate(-1);
    }, 700);
  };

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"></div>
          <p className="font-semibold">Memuat data...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 pb-8 flex justify-center items-start ">
        <div
          className="bg-[#0D3553] p-4 md:p-8 rounded-lg text-white w-full max-w-lg font-poppins"
          style={{ boxShadow: "2px 2px 8px rgba(0, 0, 0, 1)" }}
        >
          <button
            onClick={handleBackWithLoading}
            className="flex items-center mb-4 text-white font-semibold hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Kembali
          </button>

          <div
            className="bg-white text-black rounded-xl p-4 mb-6 space-y-4 text-md "
            style={{ boxShadow: "inset 6px 4px 2px rgba(0, 0, 0, 0.5)" }}
          >
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

            <div className="bg-[#0D3553] text-white rounded-lg p-4 font-bold">
              <div className="flex items-center gap-2 mb-2 text-lg">
                <FaWaveSquare />
                <h3>Informasi Gempa Bumi</h3>
              </div>
              <p className="flex items-center gap-2">
                <FaBolt /> Magnitudo:{" "}
                <span className="font-normal">
                  {parseFloat(data.magnitude).toFixed(4)} M
                </span>
              </p>
              <p className="flex items-center gap-2  ">
                <FaArrowsAltV /> Kedalaman:{" "}
                <span className="font-normal">
                  {parseFloat(data.depth).toFixed(4)} km
                </span>
              </p>
              <p className="flex items-center gap-2  ">
                <FaWater /> Potensi Tsunami:{" "}
                <span className="font-normal">{data.potensi_tsunami}</span>
              </p>
            </div>

            <div className="bg-[#0D3553] text-white rounded-lg p-4 font-bold">
              <div className="flex items-center gap-2 mb-2 text-lg">
                <FaCloudSun />
                <h3 className="font-bold text-base">Informasi Cuaca</h3>
              </div>
              <p className="flex items-center gap-2">
                <FaThermometerHalf /> Suhu Min:{" "}
                <span className="font-normal">
                  {data.temperature_2m_min} °C{" "}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaThermometerHalf /> Suhu Max:{" "}
                <span className="font-normal">
                  {data.temperature_2m_max} °C
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaWind /> Kecepatan Angin:{" "}
                <span className="font-normal">
                  {data.windspeed_10m_max} km/h
                </span>
              </p>
              <p className="flex items-center gap-2">
                <FaCloudRain /> Curah Hujan:
                <span className="font-normal">{data.precipitation_sum} mm</span>
              </p>
            </div>

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
