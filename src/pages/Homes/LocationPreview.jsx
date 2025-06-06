import { Link } from "react-router-dom";

function LocationPreview() {
  return (
    <div className="min-h-screen px-6 py-16 flex items-center justify-center font-poppins">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 w-full text-center md:text-left">
        {/* Judul kiri */}
        <div className="md:w-2/3 w-full text-center md:text-left">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold"
            style={{
              color: "#000000",
              textShadow: "4px 4px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Cek Lokasi <br className="hidden md:block" /> Anda
          </h2>
        </div>

        {/* Deskripsi kanan */}
        <div className="md:w-12/3 w-full text-sm sm:text-base md:text-lg text-black leading-relaxed">
          <p className="mb-6">
            Ketahui posisi Anda untuk melihat potensi resiko dan panduan 
            keselamatan di sekitar--sebagai langkah awal perlindungan dari bencana
            seperti gempa dan tsunami.
          </p>
          <Link to="/city-select" className="relative z-20">
            <button
              className="px-6 py-3 text-white font-semibold rounded-xl transition duration-300"
              style={{ backgroundColor: "#C43238" }}
            >
              Klik Di Sini
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LocationPreview;
