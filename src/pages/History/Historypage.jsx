import { useState } from "react";
import HistoryCard from "../../components/HistoryCard";
import {FaArrowLeft, FaArrowRight} from "react-icons/fa";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const SampleData = [
  { city: "Jakarta", agency: "BMKG", risk: "aman" },
  { city: "Bandung", agency: "BMKG", risk: "waspada" },
  { city: "Surabaya", agency: "BMKG", risk: "bahaya" },
  { city: "Medan", agency: "BMKG", risk: "aman" },
];

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
    const [data, setData] = useState(SampleData);
    const [monthIndex, setMonthIndex] = useState(new Date().getMonth());
    
    const handleDelete = (city) => {
        setData(data.filter(item => item.city !== city));
    }


    const handleDetail = (city) => {
        alert(`Detail for ${city}`);
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
          {data.map((item) => (
            <HistoryCard
              key={item.city}
              city={item.city}
              agency={item.agency}
              risk={item.risk}
              onDetail={() => handleDetail(item.city)}
              onDelete={() => handleDelete(item.city)}
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
