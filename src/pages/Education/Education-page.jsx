import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

function Education() {
  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-32 font-poppins">
        {/* Judul Halaman */}
        <div className="text-center mb-12 py-8 rounded-[12px]" style={{ backgroundColor: "#ECECEC", color: "#000000" }}>
          <h2 className="text-4xl font-bold text-gray-900">
            Edukasi <span> Gempa dan Tsunami</span>
          </h2>
          <p className="mt-2 ">
            Materi edukatif untuk pemahaman dan kesiapsiagaan menghadapi gempa bumi dan tsunami.
          </p>
        </div>

        {/* Edukasi Gempa */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-start">
          <div className="md:w-1/3">
            <img
              src="/Edukasi Setelah Log/gempaEdu1.svg"
              alt="Gempa"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-2/3" style={{ color: "#000000" }}>
            <h2 className="text-lg font-bold mb-2">Apa sih Gempa Bumi?</h2>
            <p className=" mb-2">
              Gempa bumi adalah peristiwa alam berupa getaran atau guncangan di permukaan bumi
              yang disebabkan oleh pelepasan energi secara tiba-tiba di dalam litosfer, yang menghasilkan
              gelombang seismik. Getaran ini bisa berasal dari pergeseran lempeng tektonik,
              aktivitas vulkanik, atau aktivitas manusia seperti peledakan.
            </p>
            <a href="https://www.youtube.com/watch?v=1nXkJq5OZl0" className="text-black font-semibold underline hover:text-red-600">
              Lihat Video →
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12 items-start">
          <div className="md:w-1/3">
            <img
              src="/Edukasi Setelah Log/gempaEdu2.svg"
              alt="Mitigasi Gempa"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-2/3" style={{ color: "#000000" }}>
            <h2 className="text-lg font-bold mb-2">Mitigasi Saat Menghadapi Gempa</h2>
            <p className="text-gray-700 mb-2">
              Panduan singkat mengenai langkah-langkah mitigasi yang dapat dilakukan sebelum, saat,
              dan setelah terjadi gempa bumi, dengan tujuan meningkatkan kesiapsiagaan dan keselamatan
              masyarakat dalam menghadapi bencana ini.
            </p>
            <a href="https://www.youtube.com/watch?v=mEL6vm1bujc" className="text-black font-semibold underline hover:text-blue-600">
              Lihat Video →
            </a>
          </div>
        </div>

        {/* Edukasi Tsunami */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 items-start">
          <div className="md:w-1/3">
            <img
              src="/Edukasi Setelah Log/tsunamiEdu1.svg"
              alt="Tsunami"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-2/3" style={{ color: "#000000" }}>
            <h2 className="text-lg font-bold mb-2">Apa sih Itu Tsunami?</h2>
            <p className="text-gray-700 mb-2">
              Tsunami adalah serangkaian gelombang air laut raksasa yang disebabkan oleh gangguan
              di dasar laut seperti gempa bumi, longsor bawah laut, atau letusan gunung berapi.
              Gelombang ini dapat bergerak dengan kecepatan sangat tinggi dan mencapai daratan dengan
              ketinggian hingga puluhan meter, menyebabkan kerusakan parah.
            </p>
            <a href="https://www.youtube.com/watch?v=6qWWysS53E4" className="text-black font-semibold underline hover:text-blue-600">
              Lihat Video →
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-12 items-start">
          <div className="md:w-1/3">
            <img
              src="/Edukasi Setelah Log/tsunamiEdu2.svg"
              alt="Mitigasi Tsunami"
              className="w-full rounded-lg"
            />
          </div>
          <div className="md:w-2/3" style={{ color: "#000000" }}>
            <h2 className="text-lg font-bold mb-2">Mitigasi Saat Menghadapi Tsunami</h2>
            <p className="text-gray-700 mb-2">
              Panduan singkat mengenai langkah-langkah mitigasi sebelum, saat, dan setelah terjadi tsunami,
              dengan tujuan meningkatkan kesiapsiagaan dan keselamatan masyarakat dalam menghadapi
              bencana ini.
            </p>
            <a href="https://www.youtube.com/watch?v=YXpIW3GoGco" className="text-black font-semibold underline hover:text-blue-600">
              Lihat Video →
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Education;
