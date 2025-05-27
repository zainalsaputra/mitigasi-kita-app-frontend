import { Link } from "react-router-dom";

function EduPreview() {
  return (
    <div className="min-h-screen px-6 py-16 flex items-center justify-center font-poppins">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 w-full text-center md:text-left">
        {/* Judul kiri */}
        <div className="w-full md:w-1/3">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            style={{
              color: "#000000",
              textShadow: "4px 8px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Edukasi
          </h2>
        </div>

        {/* Deskripsi dan tombol kanan */}
        <div className="w-full md:w-2/1 text-sm sm:text-base md:text-lg text-black leading-relaxed">
          <p className="mb-6">
            Edukasi berisi panduan dan tips untuk mempersiapkan diri sebelum, saat, dan setelah terjadi bencana seperti gempa bumi dan tsunami.
          </p>
          <Link to="/education" className="relative z-20">
            <button
              className="px-6 py-3 text-white rounded-xl font-semibold transition duration-300"
              style={{ backgroundColor: "#0D3553" }}
            >
              Klik Di Sini
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EduPreview;
