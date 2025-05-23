function HeroSection() {
    return (
      <section className="hero-section-test-bg test-center">
        <h1>
          Sistem Peringatan Dini Gempa
          <br />
          dan Tsunami untuk
        </h1>
        <h1>Keselamatan Masyarakat</h1>
        <div>
          <div>
            <img
              src="/HeroLogo/mapLogo.png"
              alt="Group 4"
            />
            <p>Peta Resiko</p>
            <p>Data Gempa dan Tsunami</p>
          </div>
          <div>
            <img
              src="/HeroLogo/eduLogo.png"
              alt="Group 4"
              style={{ width: "100px", margin: "8px 0" }}
            />
            <p>Edukasi</p>
            <p>Panduan Mitigasi</p>
          </div>
        </div>
      </section>
    );
}

export default HeroSection;