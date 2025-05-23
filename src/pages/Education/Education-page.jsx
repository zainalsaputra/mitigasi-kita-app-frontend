import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
function Education() {
    return (
      <div>
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-10">
            Edukasi Gempa dan Tsunami
          </h1>
          materi edukatif untuk pemahaman dan kesiapsiagaan menghadapi gempa dan
          tsunami
          {/* Edukasi Gempa */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
            <img
              src="/Edukasi Setelah Log/gempaEdu1.svg"
              alt="Gempa"
              className="w-full rounded-lg"
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Apa sih Gempa Bumi?
              </h2>
              <p className="mb-2 text-gray-700">
                Gempa bumi adalah peristiwa alam berupa getaran atau guncangan
                di permukaan bumi yang disebabkan oleh pelepasan energi secara
                tiba-tiba di dalam litosfer,yang menghasilkan gelombang seismik.
                getaran ini bisa berasal dari pergeseran lempeng
                tektonik,aktivitas vulkanik, atau aktivitas manusia seperti
                peledakan.
              </p>
              <a href="#" className="text-blue-600 font-semibold">
                Lihat Video →
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
            <img
              src="/Edukasi Setelah Log/gempaEdu2.svg"
              className="w-full rounded-lg"
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Mitigasi Saat Menghadapi Gempa
              </h2>
              <p className="mb-2 text-gray-700">
                Panduan singkat mengenai langkah-langkah mitigasi yang dapat
                dilakukan sebelum, saat, dan setelah terjadi gempa bumi, dengan
                tujuan meningkatkan kesiapsiagaan dan keselamatan masyarakat
                dalam menghadapi bencana ini.
              </p>
              <a href="#" className="text-blue-600 font-semibold">
                Lihat Video →
              </a>
            </div>
          </div>
          {/* Edukasi Tsunami */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
            <img
              src="/Edukasi Setelah Log/tsunamiEdu1.svg"
              alt="Tsunami"
              className="w-full rounded-lg"
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Apa sih Itu Tsunami?
              </h2>
              <p className="mb-2 text-gray-700">
                Tsunami adalah serangkaian gelombang air laut raksasa yang
                disebabkan oleh gangguan di dasar laut seperti gempa bumi atau
                letusan gunung berapi. gelombang ini dapat bergerak dengan
                kecepatan sangat tinggi dan mencapai daratan dengan ketinggian
                hingga puluhan meter, menyebabkan kerusakan parah.
              </p>
              <a href="#" className="text-blue-600 font-semibold">
                Lihat Video →
              </a>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
            <img
              src="/Edukasi Setelah Log/tsunamiEdu2.svg"
              alt="Mitigasi Tsunami"
              className="w-full rounded-lg"
            />
            <div>
              <h2 className="text-xl font-semibold mb-2">
                Mitigasi Saat Menghadapi Tsunami
              </h2>
              <p className="mb-2 text-gray-700">
                Panduan singkat mengenai langkah-langkah mitigasi sebelum, saat,
                dan setelah terjadi tsunami, dengan tujuan meningkatkan
                kesiapsiagaan dan keselamatan masyarakat dalam menghadapi
                bencana ini.
              </p>
              <a href="#" className="text-blue-600 font-semibold">
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