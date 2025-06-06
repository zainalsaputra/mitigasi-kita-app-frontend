import { useState } from "react";
import HistoryCard from "../../components/HistoryCard";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import { useNavigate } from "react-router-dom";

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

const dummyData = [
  {
    id: 1,
    city: "Jakarta",
    status: "Waspada",
    magnitude: 5.2,
    potensi_tsunami: "Tidak",
    temperature_2m_max: 34,
    createdAt: "2025-06-01T10:00:00Z",
  },
  {
    id: 2,
    city: "Bandung",
    status: "Aman",
    magnitude: 3.1,
    potensi_tsunami: "Tidak",
    temperature_2m_max: 28,
    createdAt: "2025-05-20T09:00:00Z",
  },
  {
    id: 3,
    city: "Surabaya",
    status: "Bahaya",
    magnitude: 6.5,
    potensi_tsunami: "Ya",
    temperature_2m_max: 36,
    createdAt: "2025-06-05T14:30:00Z",
  },
];

function HistoryPage() {
  const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
  const [historyList, setHistoryList] = useState(dummyData);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    setHistoryList((prevList) => prevList.filter((item) => item.id !== id));
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
          <h2 className="text-xl font-bold">
            History {monthNames[monthIndex]}
          </h2>
          {historyList
            .filter(
              (item) => new Date(item.createdAt).getMonth() === monthIndex
            )
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
        
    };
export default HistoryPage;
