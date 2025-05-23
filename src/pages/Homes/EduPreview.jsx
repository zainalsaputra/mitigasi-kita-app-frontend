import { Link } from "react-router-dom";

function EduPreview(){
    return (
      <div>
        <h1>Edukasi</h1>
        <p>
          Edukasi berisi panduan dan tips untuk mempersiapkan diri sebelum,
          saat, dan setelah terjadi bencana seperti gempa bumi dan tsunami.
        </p>
        <Link to="/education">
            <button>Klik Disini</button>
        </Link>
      </div>
    );
}
export default EduPreview;