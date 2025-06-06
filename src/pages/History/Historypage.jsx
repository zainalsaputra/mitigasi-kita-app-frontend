import { useState, useEffect } from "react";
import HistoryCard from "../../components/HistoryCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";
import { loadHistoryListPresenter, deleteHistoryPresenter } from "../../../presenters/history-presenter";
const monthNames = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
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
    <div>
      <Navbar />
      <div className="pt-24 px-6 min-h-screen">
        <h2 className="text-xl font-bold">History {monthNames[monthIndex]}</h2>
        {historyList
          .filter((item) => {
            const createdAtMonth = new Date(item.createdAt).getMonth();
            return createdAtMonth === monthIndex;
          })
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
        <div className="flex justify-between mt-4">
          <button
            onClick={handlePrevMonth}
            className="text-black hover:text-gray-300"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={handleNextMonth}
            className="text-black hover:text-gray-300"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HistoryPage;
