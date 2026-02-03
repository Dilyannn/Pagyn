import Navbar from '../components/layout/Navbar.jsx'
import HeroSection from '../components/home/HeroSection.jsx'
import FeaturesSection from '../components/home/FeaturesSection.jsx'
import TestimonialsSection from '../components/home/TestimonialsSection.jsx'
import Footer from '../components/home/Footer.jsx'

function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </>
  )
}

export default LandingPage