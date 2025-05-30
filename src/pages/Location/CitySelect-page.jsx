import React, { useState, useEffect} from 'react';
import { Select } from 'react-select';
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
function CitySelect () {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);

    useEffect(() => {
      const fetchCities = async () => {
        try {
          const provinceRes = await fetch(
            "https://zainalsaputra.github.io/api-wilayah-indonesia/api/provinces.json"
          );
          const provinces = await provinceRes.json();

          const allCities = [];

          await Promise.all(
            provinces.map(async (province) => {
              try {
                const res = await fetch(
                  `https://zainalsaputra.github.io/api-wilayah-indonesia/api/regencies/${province.id}.json`
                );
                if (!res.ok) {
                  console.warn(
                    `Gagal fetch regencies untuk province ID ${province.id}`
                  );
                  return;
                }
                const regencies = await res.json();
                regencies.forEach((city) => {
                  allCities.push({
                    value: city.id,
                    label:city.name
                  })
                });
              } catch (err) {
                console.error(
                  `Error fetching regencies for province ID ${province.id}`,
                  err
                );
              }
            })
          );

          console.log("All cities loaded:", allCities);
          setCities(allCities);
        } catch (error) {
          console.error("Error fetching provinces or regencies:", error);
        }
      };

      fetchCities();
    }, []);

    return (
      <div>
        <Navbar />
        <div>
          <h1>Pilih Lokasi Anda</h1>
          <h4>Cari kota: </h4>
          <Select
            options={cities}
            value={selectedCity}
            onChange={setSelectedCity}
            placeholder="Pilih kota..."
            isClearable
          />
        </div>
        <Footer />
      </div>
    );
}

export default CitySelect;