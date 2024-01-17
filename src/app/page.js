import Image from 'next/image'
import Link from 'next/link'
import ScrollAcImage from './components/ScrollAcImage'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <ScrollAcImage count={0} full_count={5}/>
      </div>
    </main>
  )
}
