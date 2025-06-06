import { useState, useEffect} from "react";
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



function HistoryPage() {
  const [historyList, setHistoryList] = useState([]);
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    const Navigate = useNavigate();

    useEffect(() => {
      const fetchHistory = async () => {
        const token = localStorage.getItem("accessToken");
        try {
          const response = await fetch(
            "https://mitigasi-kita-app-backend-production.up.railway.app/api/history",
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
              },
            }
          );

          // if (!response.ok) throw new Error("Gagal mengambil history");

          const result = await response.json(); // result = { status: "success", data: [...] }

          if (!response.ok || !Array.isArray(result.data)) {
            throw new Error("Data history tidak valid");
          }

          setHistoryList(result.data);
        } catch (error) {
          console.error("Error:", error);
        }
      };

      fetchHistory();
    }, []);

    const handleDelete = async (id) => {
      const token = localStorage.getItem("accessToken");
    
      try {
        const response = await fetch(
          `https://mitigasi-kita-app-backend-production.up.railway.app/api/history/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );
    
        if (!response.ok) throw new Error("Gagal menghapus history");
    
        // Update state setelah sukses hapus
        setHistoryList((prevList) => prevList.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Error menghapus history:", error);
      }
    };


    const handleDetail = (id) => {
        Navigate(`/history/${id}`)
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
          {Array.isArray(historyList) &&
            historyList
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
        
    };
export default HistoryPage;
