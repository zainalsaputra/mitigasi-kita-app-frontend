import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

function Education() {
  return (
    <div className="font-poppins text-black">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="text-center py-16 px-4 bg-[#ECECEC]">
          <h2 className="text-2xl md:text-4xl font-bold">Edukasi <span>Gempa dan Tsunami</span></h2>
          <p className="mt-2 text-sm md:text-base max-w-xl mx-auto">
            Materi edukatif untuk pemahaman dan kesiapsiagaan menghadapi gempa bumi dan tsunami.
          </p>
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-10 space-y-16">

          {/* Section 1 - Apa Itu Gempa */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3">
              <img
                src="/Edukasi Setelah Log/gempaEdu1.svg"
                alt="Gempa"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-2/3 space-y-2">
              <h3 className="text-lg md:text-xl font-bold">Apa sih Gempa Bumi?</h3>
              <p className="text-sm md:text-base">
                Gempa bumi adalah peristiwa alam berupa getaran atau guncangan di permukaan bumi
                yang disebabkan oleh pelepasan energi secara tiba-tiba di dalam litosfer...
              </p>
              <a
                href="https://www.youtube.com/watch?v=1nXkJq5OZl0"
                className="text-sm font-semibold underline hover:text-red-600"
              >
                Lihat Video →
              </a>
            </div>
          </div>

          {/* Section 2 - Mitigasi Gempa */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3">
              <img
                src="/Edukasi Setelah Log/gempaEdu2.svg"
                alt="Mitigasi Gempa"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-2/3 space-y-2">
              <h3 className="text-lg md:text-xl font-bold">Mitigasi Saat Menghadapi Gempa</h3>
              <p className="text-sm md:text-base text-gray-700">
                Panduan singkat mengenai langkah-langkah mitigasi sebelum, saat, dan setelah terjadi gempa bumi...
              </p>
              <a
                href="https://www.youtube.com/watch?v=mEL6vm1bujc"
                className="text-sm font-semibold underline hover:text-blue-600"
              >
                Lihat Video →
              </a>
            </div>
          </div>

          {/* Section 3 - Apa Itu Tsunami */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3">
              <img
                src="/Edukasi Setelah Log/tsunamiEdu1.svg"
                alt="Tsunami"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-2/3 space-y-2">
              <h3 className="text-lg md:text-xl font-bold">Apa sih Itu Tsunami?</h3>
              <p className="text-sm md:text-base text-gray-700">
                Tsunami adalah serangkaian gelombang air laut raksasa yang disebabkan oleh gangguan...
              </p>
              <a
                href="https://www.youtube.com/watch?v=6qWWysS53E4"
                className="text-sm font-semibold underline hover:text-blue-600"
              >
                Lihat Video →
              </a>
            </div>
          </div>

          {/* Section 4 - Mitigasi Tsunami */}
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="md:w-1/3">
              <img
                src="/Edukasi Setelah Log/tsunamiEdu2.svg"
                alt="Mitigasi Tsunami"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="md:w-2/3 space-y-2">
              <h3 className="text-lg md:text-xl font-bold">Mitigasi Saat Menghadapi Tsunami</h3>
              <p className="text-sm md:text-base text-gray-700">
                Panduan singkat mengenai langkah-langkah mitigasi sebelum, saat, dan setelah terjadi tsunami...
              </p>
              <a
                href="https://www.youtube.com/watch?v=YXpIW3GoGco"
                className="text-sm font-semibold underline hover:text-blue-600"
              >
                Lihat Video →
              </a>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Education;
