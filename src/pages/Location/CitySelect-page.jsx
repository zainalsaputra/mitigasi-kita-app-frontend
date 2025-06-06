import React, { useState, useEffect} from 'react';
import Select from 'react-select';
// import Navbar from "../../components/navbar";
// import Footer from "../../components/footer";
import CityData from '../../data/CityData';
function CitySelect ({onCityChange}) {
    const [cities, setCities] = useState([]);


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
                  const found = CityData.find(
                    (d) => d.name.toUpperCase() === city.name.toUpperCase()
                  );
                  allCities.push({
                    value: city.id,
                    label: city.name,
                    lat: found?.lat || null,
                    long: found?.long || null,
                  });
                });
              } catch (err) {
                console.error(
                  `Error fetching regencies for province ID ${province.id}`,
                  err
                );
              }
            })
          );
          setCities(allCities);
        } catch (error) {
          console.error("Error fetching provinces or regencies:", error);
        }
      };

      fetchCities();
    }, []);

    return (
      <div>
        <div className="pt-24 px-4">
          <Select
            options={cities}
            // value={selectedCity}
            onChange={onCityChange}
            placeholder="Masukkan Nama Kota..."
            isClearable
          />
        </div>
      </div>
    );
}

export default CitySelect;