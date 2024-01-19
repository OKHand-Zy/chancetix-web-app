import ScrollAcImage from '../components/scrollAcShow/ScrollAcImage'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'

export default function Home() {
  return (
    <>
      <Navbar/>
        <main className="flex flex-col items-center justify-between p-24">
          <div>
            <ScrollAcImage />
          </div>
        </main>
      <Footer/>
    </>
  )
}
