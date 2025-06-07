import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CityData from '../../data/CityData';

function CitySelect({ onCityChange }) {
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
              if (!res.ok) return;
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
              console.error(`Error fetching regencies for ${province.id}`, err);
            }
          })
        );

        setCities(allCities);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };

    fetchCities();
  }, []);

  // Custom styles react-select untuk warna teks hitam
  const customStyles = {
    option: (provided) => ({
      ...provided,
      color: 'black',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  return (
    <div className="shadow-md rounded-md">
      <Select
        options={cities}
        onChange={onCityChange}
        placeholder="Masukkan Nama Kota..."
        isClearable
        styles={customStyles}
      />
    </div>
  );
}

export default CitySelect;
