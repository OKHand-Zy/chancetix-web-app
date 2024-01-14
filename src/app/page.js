import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <div>test</div>
      <Image
                src='/images/activity_img/cat.jpg'
                width={500}
                height={500}
                alt='I am B'
      />
    </main>
  )
}
