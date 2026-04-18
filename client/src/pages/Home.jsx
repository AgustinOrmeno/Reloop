import HeroSection from '../components/home/HeroSection'
import HowItWorks from '../components/home/HowItWorks'
import Categories from '../components/home/Categories'
import FeaturedProducts from '../components/home/FeaturedProducts'
import WhyReloop from '../components/home/WhyReloop'
import FinalCTA from '../components/home/FinalCTA'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <Categories />
      <FeaturedProducts />
      <WhyReloop />
      <FinalCTA />
    </main>
  )
}