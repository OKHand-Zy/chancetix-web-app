import Image from "next/image"
import Link from "next/link"

export default function ShowImg({text}) {
    return (
        <Link href={text}>
            <Image
                src={text}
                alt="activity_image"
                width={150}
                height={100}
                priority={true}
            />
        </Link>
    )
}