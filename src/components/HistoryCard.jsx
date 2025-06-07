// HistoryCard.js
import React from 'react';
import { FaMapMarkerAlt, FaShieldAlt, FaWaveSquare, FaWater, FaTemperatureHigh, FaTrash, FaHeartbeat } from 'react-icons/fa';

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
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-3">
      {/* Lokasi (Location) at the top */}
      <div className="flex items-center text-gray-800">
        <FaMapMarkerAlt className="mr-2 text-blue-500" /> {/* Blue icon for location */}
        <span className="font-semibold">Lokasi:</span> {city}
      </div>

      {/* Details in a grid-like layout */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-700 text-sm">
        {/* Status */}
        <div className="flex items-center">
          {/* Choose an icon for status, FaShieldAlt or FaHeartbeat could work */}
          <FaHeartbeat className="mr-1 text-green-500" /> {/* Green icon for status */}
          <span className="font-semibold">Status:</span> {status}
        </div>
        {/* Gempa Bumi (Earthquake Magnitude) */}
        <div className="flex items-center">
          <FaWaveSquare className="mr-1 text-red-500" /> {/* Red icon for earthquake */}
          <span className="font-semibold">Gempa Bumi:</span> {magnitude} M
        </div>
        {/* Potensi Tsunami (Tsunami Potential) */}
        <div className="flex items-center">
          <FaWater className="mr-1 text-blue-500" /> {/* Blue icon for tsunami */}
          <span className="font-semibold">Potensi Tsunami:</span> {tsunami}
        </div>
        {/* Cuaca (Weather/Temperature) */}
        <div className="flex items-center">
          <FaTemperatureHigh className="mr-1 text-orange-500" /> {/* Orange icon for temperature */}
          <span className="font-semibold">Cuaca:</span> {temperature} C
        </div>
      </div>

      {/* Buttons at the bottom right */}
      <div className="flex justify-end space-x-3 mt-4">
        <button
          onClick={onDetail}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Lihat Detail
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Delete <FaTrash className="inline ml-1" />
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;