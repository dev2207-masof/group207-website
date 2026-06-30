import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import About from '@/components/About'
import Vision from '@/components/Vision'
import Gallery from '@/components/Gallery'
import Subsidiaries from '@/components/Subsidiaries'
import News from '@/components/News'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <Vision />
        <Gallery />
        <Subsidiaries />
        <News />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
