import Image from 'next/image'
import Link from 'next/link'
import scroll_demo from './components/scroll_demo'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>test</div>
      <scroll_demo>1</scroll_demo>
    </main>
  )
}
