import { FaMapMarkerAlt, FaBuilding, FaTrash, FaHeartbeat } from 'react-icons/fa';
import { BsCloudSun } from 'react-icons/bs';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { MdWarning } from 'react-icons/md';

const riskIcon ={
    aman: <AiFillCheckCircle className="text-green-500" />,
    waspada: <MdWarning className="text-yellow-500" />,
    bahaya: <AiFillCloseCircle className="text-red-500" />,
};

const HistoryCard = ({ city, agency, risk, onDetail, onDelete }) => {
    return (
      <div className="flex justify-between items-center bg-white rounded-lg shadow-md p-4 my-2">
        <div className="flex items-center space-x-4">
          <FaMapMarkerAlt className="text-black" />
          <span>{city}</span>
          <FaBuilding className="text-black ml-4" />
          <span>Agency: {agency}</span>
          <div className="ml-4">{riskIcon[risk]}</div>
          <FaHeartbeat className="text-red-500" />
          <BsCloudSun className="text-blue-500" />
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