 
function AboutUs() {
  return (
    <div
      className="min-h-screen px-6 py-16 flex items-center justify-center font-poppins"
    >
      {/* Lapisan putih transparan */}
      <div className="absolute inset-0 z-0"></div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-10 w-full text-center md:text-left">
        {/* Judul */}
        <div className="md:w-1/3 w-full text-center md:text-left">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-black text-center"
            style={{ textShadow: '4px 4px 4px rgba(0, 0, 0, 0.5)' }}
          >
            Tentang <br className="hidden md:block" /> Kami
          </h2>
        </div>

        {/* Deskripsi */}
        <div className="md:w-2/1 w-full text-gray-800 text-center md:text-left text-sm sm:text-base md:text-lg leading-relaxed">
          <p className="mb-4">
            MitigasiKita adalah aplikasi web yang dikembangkan oleh tim <strong>CC25-CF278</strong> sebagai bagian dari Capstone Project program Studi Independen Dicoding. Aplikasi ini bertujuan untuk membantu masyarakat dalam memahami, mempersiapkan, dan merespons risiko bencana alam seperti gempa bumi dan tsunami.
          </p>
          <p>
            Fitur utama yang disediakan meliputi peta risiko berbasis lokasi, edukasi mitigasi bencana, serta analisis zona bahaya dengan dukungan teknologi Machine Learning. Seluruh pengembangan dilakukan secara mandiri dengan teknologi modern dan mengikuti prinsip pengembangan web yang baik.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
