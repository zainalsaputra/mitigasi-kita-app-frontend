import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

const eduItems = [
  {
    img: "/Edukasi Setelah Log/gempaEdu1.svg",
    alt: "Gempa",
    title: "Apa sih Gempa Bumi?",
    desc: "Gempa bumi adalah peristiwa alam berupa getaran atau guncangan di permukaan bumi yang disebabkan oleh pelepasan energi secara tiba-tiba di dalam litosfer, yang menghasilkan gelombang seismik. Getaran ini bisa berasal dari pergeseran lempeng tektonik, aktivitas vulkanik, atau aktivitas manusia seperti peledakan. ",
    link: "https://www.youtube.com/watch?v=1nXkJq5OZl0",
    hover: "hover:text-[#C43238]",
  },
  {
    img: "/Edukasi Setelah Log/gempaEdu2.svg",
    alt: "Mitigasi Gempa",
    title: "Mitigasi Saat Menghadapi Gempa",
    desc: "Panduan singkat mengenai langkah-langkah mitigasi yang dapat dilakukan sebelum, saat, dan setelah terjadi gempa bumi, dengan tujuan meningkatkan kesiapsiagaan dan keselamatan masyarakat dalam menghadapi bencana ini.",
    link: "https://www.youtube.com/watch?v=mEL6vm1bujc",
    hover: "hover:text-[#C43238]",
  },
  {
    img: "/Edukasi Setelah Log/tsunamiEdu1.svg",
    alt: "Tsunami",
    title: "Apa sih Itu Tsunami?",
    desc: "Tsunami adalah serangkaian gelombang air laut raksasa yang disebabkan oleh gangguan di dasar laut, seperti gempa bumi, longsor bawah laut, atau letusan gunung berapi. Gelombang ini dapat bergerak dengan kecepatan sangat tinggi dan mencapai daratan dengan ketinggian hingga puluhan meter, menyebabkan kerusakan parah. ",
    link: "https://www.youtube.com/watch?v=6qWWysS53E4",
    hover: "hover:text-[#C43238]",
  },
  {
    img: "/Edukasi Setelah Log/tsunamiEdu2.svg",
    alt: "Mitigasi Tsunami",
    title: "Mitigasi Saat Menghadapi Tsunami",
    desc: "Panduan singkat mengenai langkah-langkah mitigasi yang dapat dilakukan sebelum, saat, dan setelah terjadi tsunami, dengan tujuan meningkatkan kesiapsiagaan dan keselamatan masyarakat dalam menghadapi bencana ini.​",
    link: "https://www.youtube.com/watch?v=YXpIW3GoGco",
    hover: "hover:text-[#C43238]",
  },
];

function Education() {
  return (
    <div className="font-poppins text-black">
      <Navbar />

      <div className="pt-24 pb-16">
        {/* Header */}
        <div className="text-center py-16 px-4 bg-[#ECECEC]">
          <h2 className="text-xl md:text-2xl sm:text-xl lg:text-4xl font-bold">
            Edukasi <span>Gempa dan Tsunami</span>
          </h2>
          <p className="mt-2 text-sm md:text-base max-w-xl mx-auto">
            Materi edukatif untuk pemahaman dan kesiapsiagaan menghadapi gempa
            bumi dan tsunami.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mt-10 space-y-16">
          {eduItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left"
            >
              <div className="md:w-1/3 w-full max-w-sm mx-auto">
                <img
                  src={item.img}
                  alt={item.alt}
                  className="w-full h-auto object-contain rounded-lg"
                />
              </div>
              <div className="md:w-2/3 w-full space-y-2">
                <h3 className="text-lg md:text-xl font-bold">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-700">
                  {item.desc}
                </p>
                <a
                  href={item.link}
                  className={`text-sm font-semibold underline transition duration-300 ${item.hover}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Lihat Video →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Education;
