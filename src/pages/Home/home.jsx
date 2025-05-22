import AboutUs from "./aboutUs";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import EduPreview from "./eduPreview";
import HeroSection from "./heroSection";
import MapPreview from "./mapPreview";
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