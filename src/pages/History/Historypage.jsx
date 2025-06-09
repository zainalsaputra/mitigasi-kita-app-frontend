import { useState, useEffect } from "react";
import HistoryCard from "../../components/HistoryCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import {
  loadHistoryListPresenter,
  deleteHistoryPresenter,
} from "../../../presenters/history-presenter";
import MySwal from "sweetalert2";

const monthNames = [
  "JANUARI", "FEBRUARI", "MARET", "APRIL", "MEI", "JUNI",
  "JULI", "AGUSTUS", "SEPTEMBER", "OKTOBER", "NOVEMBER", "DESEMBER",
];

function HistoryPage() {
  const [historyList, setHistoryList] = useState([]);
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const navigate = useNavigate();

  useEffect(() => {
    loadHistoryListPresenter(setHistoryList);
  }, []);

  const handleDelete = (id) => {
    deleteHistoryPresenter(id, setHistoryList);
  };

  const handleDetail = async (id) => {
    MySwal.fire({
      title: "Loading detail...",
      didOpen: () => {
        MySwal.showLoading();
      },
      allowOutsideClick: false,
      background: "#0D3553",
      color: "white",
      showConfirmButton: false,
    });

    // Simulasi proses loading (bisa diganti request async kalau perlu)
    setTimeout(() => {
      MySwal.close();
      navigate(`/history/${id}`);
    }, 700); // 700ms delay, sesuaikan jika perlu
  };

  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev - 1 + 12) % 12);
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev + 1) % 12);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24 px-4 md:px-6 pb-8">
        <div
          className="max-w-7xl mx-auto p-6 md:p-8 rounded-lg bg-[#0D3553] text-white"
          style={{ boxShadow: "6px 6px 2px rgba(0, 0, 0, 0.5)" }}
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-white">
            HISTORY BULAN {monthNames[monthIndex]}
          </h2>

          <div className="space-y-4">
            {historyList
              .filter((item) => new Date(item.createdAt).getMonth() === monthIndex)
              .map((item) => (
                <HistoryCard
                  key={item.id}
                  city={item.city}
                  status={item.status}
                  magnitude={item.magnitude}
                  tsunami={item.potensi_tsunami}
                  temperature={item.temperature_2m_max}
                  onDelete={() => handleDelete(item.id)}
                  onDetail={() => handleDetail(item.id)}
                />
              ))}
          </div>

          <div className="flex justify-between mt-8">
            <button onClick={handlePrevMonth} className="text-white">
              <FaArrowLeft size={20} />
            </button>
            <button onClick={handleNextMonth} className="text-white">
              <FaArrowRight size={20} />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HistoryPage;
