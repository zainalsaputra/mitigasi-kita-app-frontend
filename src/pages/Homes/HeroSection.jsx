import { BiStreetView } from 'react-icons/bi';
import { FaMapMarkerAlt, FaBookOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function HeroSection() {
  return (
    <>
      {/* Hero Putih */}
      <section className="py-64 flex flex-col font-poppins justify-end items-center text-center px-4 pb-0 max-w-4xl mx-auto">
        <p
          className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold text-center"
          style={{
            color: "#000000",
           
            lineHeight: "1.5",
          }}
        >
          Sistem Peringatan Dini Gempa Bumi<br />dan Tsunami untuk
        </p>
      </section>

      {/* Section Biru */}
      <section
        className="text-white pb-20 pt-0 font-poppins"  
        style={{ backgroundColor: "#0D3553" }}
      >
        <div className="text-center mb-12">
          <p 
            className="text-2xl sm:text-4xl md:text-2xl lg:text-4xl font-bold text-center" 
          >
            Keselamatan Masyarakat
          </p>
        </div>

        <div
          className="grid-center grid-cols-3 gap-8 h-full py-10"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 text-center px-7">
            {/* Item 1 */}
            <Link to="/map" className="flex flex-col items-center space-y-2 w-48 sm:w-56 md:w-64 hover:scale-105 transition-transform duration-300 relative z-20">
              <FaMapMarkerAlt className="text-3xl sm:text-4xl md:text-5xl text-white" />
              <p className="text-base sm:text-lg md:text-xl font-semibold">Peta Resiko</p>
              <p className="text-xs sm:text-sm md:text-base">Data Gempa dan Tsunami</p>
            </Link>

            {/* Item 2 */}
            <Link to="/education" className="flex flex-col items-center space-y-2 w-48 sm:w-56 md:w-64 hover:scale-105 transition-transform duration-300 relative z-20">
              <FaBookOpen className="text-3xl sm:text-4xl md:text-5xl text-white" />
              <p className="text-base sm:text-lg md:text-xl font-semibold">Edukasi</p>
              <p className="text-xs sm:text-sm md:text-base">Panduan Mitigasi</p>
            </Link>

            {/* Item 3 */}
            <Link to="/city-select" className="flex flex-col items-center space-y-2 w-48 sm:w-56 md:w-64 hover:scale-105 transition-transform duration-300 relative z-20">
              <BiStreetView className="text-3xl sm:text-4xl md:text-5xl text-white" />
              <p className="text-base sm:text-lg md:text-xl font-semibold">Cek Lokasi Anda!</p>
              <p className="text-xs sm:text-sm md:text-base">Prediksi Gempa Bumi dan Tsunami di sekitar anda</p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
