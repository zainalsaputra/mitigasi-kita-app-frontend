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
  "Januari", "Februari", "Maret", "April", "Mei", "Juni",
  "Juli", "Agustus", "September", "Oktober", "November", "Desember",
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
  

  const handleDetail = (id) => {
    navigate(`/history/${id}`);
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

      {/* Content Wrapper */}
      <main className="flex-1 pt-24 px-4 md:px-6 pb-8">
        <div className="max-w-7xl mx-auto p-6 md:p-8 rounded-lg bg-[#0D3553] text-white" style={{ boxShadow: "6px 6px 2px rgba(0, 0, 0, 0.5)" }}>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-white">
            History {monthNames[monthIndex]}
          </h2>

          {/* List of Cards */}
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
                  onDelete={() => confirmDelete(item.id)}
                  onDetail={() => handleDetail(item.id)}
                />
              ))}
          </div>

          {/* Month Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrevMonth}
              className="text-white"
            >
              <FaArrowLeft size={20} />
            </button>
            <button
              onClick={handleNextMonth}
              className="text-white"
            >
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
