import { Link } from "react-router-dom";

function MapPreview() {
   
    return (
      <div>
        <h1>Peta Resiko</h1>
        <p>
          Menampilkan peta interaktif yang memberikan informasi visual mengenai
          tingkat risiko bencana (gempa dan tsunami) pada wilayah Indonesia atau
          sesuai lokasi pengguna. Ini menjadi fitur utama aplikasi untuk memberi
          pemahaman langsung terhadap zona rawan.
        </p>
        <Link to="/map">
          <button>Klik Disini</button>
        </Link>
      </div>
    );
}

export default MapPreview;