import Image from 'next/image'
import Link from 'next/link'
import InspirationGenerator from './components/InspirationGenerator'
import FancyText from './components/FancyText'
import Copyright from './components/Copyright'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>
        <FancyText title text="Get Inspired App" />
        <InspirationGenerator count={0} full_count={3}/>
        <Copyright year={2004} />
      </div>
    </main>
  )
}
