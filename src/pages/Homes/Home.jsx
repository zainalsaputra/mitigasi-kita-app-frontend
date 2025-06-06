import AboutUs from "./AboutUs";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import EduPreview from "./EduPreview";
import HeroSection from "./HeroSection";
import MapPreview from "./MapPreview";
import LocationPreview from "./LocationPreview";
function Home() {
    return (
        <div>
            <Navbar />
            <HeroSection />
            <MapPreview />
            <EduPreview />
            <AboutUs />
            <Footer />
        </div>
    )
}

export default Home;