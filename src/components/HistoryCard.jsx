import React from 'react';
import {
  FaMapMarkerAlt,
  FaWaveSquare,
  FaWater,
  FaTrash,
  FaArrowRight,
} from 'react-icons/fa';
import { FaCircleInfo, FaCloudSun } from 'react-icons/fa6';

function HistoryCard({
  city,
  status,
  magnitude,
  tsunami,
  temperature,
  onDelete,
  onDetail,
}) {
  return (
    <div className="bg-white px-6 py-4 rounded-lg" style={{ boxShadow: 'inset 8px 6px 8px rgba(0, 0, 0, 0.5)' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 text-sm md:text-base text-black font-poppins text-xs sm:text-sm md:text-lg">
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt color='6D0000'/>
          <span className="font-semibold">Lokasi:</span>
          <span>{city}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaCircleInfo color='0D3553' />
          <span className="font-semibold">Status:</span>
          <span>{status}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaWaveSquare color='6D0000' />
          <span className="font-semibold">Gempa:</span>
          <span>{magnitude} M</span>
        </div>
        <div className="flex items-center gap-1">
          <FaWater className="text-blue-500" />
          <span className="font-semibold">Tsunami:</span>
          <span>{tsunami}</span>
        </div>
        <div className="flex items-center gap-1">
          <FaCloudSun className="text-orange-500" />
          <span className="font-semibold">Cuaca:</span>
          <span>{temperature}°C</span>
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-4 font-poppins">
        <button
          onClick={onDetail}
          className="px-6 py-1 text-white text-xs sm:text-sm md:text-base bg-[#0D3553] rounded flex items-center"
        >
          Lihat Detail <FaArrowRight className="ml-2" />
        </button>
        
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-[#C43238] text-white text-xs sm:text-sm md:text-base rounded flex items-center"
        >
          Delete <FaTrash className="ml-2" /> 
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;
