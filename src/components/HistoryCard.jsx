import { FaMapMarkerAlt, FaBuilding, FaTrash, FaHeartbeat } from 'react-icons/fa';


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
    <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 my-2">
      <div className="flex items-center space-x-4">
        <FaMapMarkerAlt className="text-black" />
        <p>
          <strong>Lokasi:</strong> {city}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          <strong>Gempa Bumi:</strong> {magnitude} M
        </p>
        <p>
          <strong>Potensi Tsunami:</strong> {tsunami}
        </p>
        <p>
          <strong>Cuaca:</strong> {temperature} C
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <button onClick={onDetail} className="text-blue-600 hover:underline">
          Lihat Detail
        </button>
        <button onClick={onDelete} className="text-red-600">
          Delete <FaTrash className="inline ml-1" />
        </button>
      </div>
    </div>
  );
}

export default HistoryCard;