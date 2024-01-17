import Image from "next/image"
import Link from "next/link"

export default function ShowImg({image_L,image_C,image_R}) {
    return (
        <div>
            <Image
                src={image_L}
                alt="activity_image"
                width={150}
                height={100}
                priority={true}
            />
            <Image
                src={image_C}
                alt="activity_image"
                width={150}
                height={100}
                priority={true}
            />
            <Image
                src={image_R}
                alt="activity_image"
                width={150}
                height={100}
                priority={true}
            />
        </div>
    )
}