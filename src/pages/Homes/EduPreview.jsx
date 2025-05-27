import { Link } from "react-router-dom";

function EduPreview(){
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="flex flex-col md:flex-row md:space-x-6 items-center md:items-start max-w-4xl w-full font-poppins text-center md:text-left">
        {/* Judul kiri */}
        <div className="w-full md:w-2/3 mb-8 md:mb-0">
          <h2
            className="text-2xl font-bold leading-snug sm:text-5xl md:text-4xl lg:text-5xl"
            style={{
              color: "#000000",
              textShadow: "4px 8px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Edukasi
          </h2>
        </div>

        {/* Deskripsi dan tombol kanan */}
        <div className="w-full md:w-12/3">
          <p
            className="text-lg mb-4 sm:text-lg md:text-xl lg:text-xl"
            style={{ color: "#000000" }}
          >
            Edukasi berisi panduan dan tips untuk mempersiapkan diri sebelum,
            saat, dan setelah terjadi bencana seperti gempa bumi dan tsunami.
          </p>
          <Link to="/education">
            <button className="px-6 py-2 text-white rounded-xl font-semibold" style={{ backgroundColor: "#0D3553" }}>
              Klik Di Sini
            </button>
          </Link>
        </div>
      </div>
    </div>
    );
}


export default EduPreview;