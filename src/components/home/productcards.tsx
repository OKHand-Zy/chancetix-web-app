import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui//Shadcn/card';
import { Button } from '@/components/ui/Shadcn/button';
import Link from 'next/link';

export default function ProductCard() {
  return (
    <div className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Product Card 1 */}
      <Card className="bg-white max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
        <CardHeader className="relative">
          <Image
            className="w-full h-48 bg-contain bg-center"
            src="/images/activity_img/boat.jpg"
            alt="Product Image"
            width={1024}
            height={576}
            priority={true}
          />
          <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white">
            New Arrival
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold mb-2">
            Product Title
          </CardTitle>
          <CardDescription className="text-gray-600 mb-4">
            Product Description goes here. Provide a brief overview of the
            product.
          </CardDescription>
          <p className="text-gray-700 mb-2">$99.99</p>
        </CardContent>
        <CardFooter className="p-4 bg-gray-100">
          <Button
            asChild
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-full"
          >
            <Link href="/Activity/info/Activity_1">Go Join</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Product Card 2 */}
      <Card className="bg-white max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
        <CardHeader className="relative">
          <Image
            className="w-full h-48 bg-contain bg-center"
            src="/images/activity_img/rocks.jpg"
            alt="Product Image"
            width={1024}
            height={576}
            priority={true}
          />
          <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white">
            New Arrival
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold mb-2">
            Product Title
          </CardTitle>
          <CardDescription className="text-gray-600 mb-4">
            Product Description goes here. Provide a brief overview of the
            product.
          </CardDescription>
          <p className="text-gray-700 mb-2">$99.99</p>
        </CardContent>
        <CardFooter className="p-4 bg-gray-100">
          <Button
            asChild
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-full"
          >
            <Link href="/Activity/info/Activity_2">Go Join</Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Product Card 3 */}
      <Card className="bg-white max-w-sm rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300">
        <CardHeader className="relative">
          <Image
            className="w-full h-48 bg-contain bg-center"
            src="/images/activity_img/cat.jpg"
            alt="Product Image"
            width={1024}
            height={576}
            priority={true}
          />
          <div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white">
            New Arrival
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl font-semibold mb-2">
            Product Title
          </CardTitle>
          <CardDescription className="text-gray-600 mb-4">
            Product Description goes here. Provide a brief overview of the
            product.
          </CardDescription>
          <p className="text-gray-700 mb-2">$99.99</p>
        </CardContent>
        <CardFooter className="p-4 bg-gray-100">
          <Button
            asChild
            className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-full"
          >
            <Link href="/Activity/info/Activity_3">Go Join</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/*
放在 CardHeader 里面的 div
左上角 New Arrival 標籤，背景色渐变藍紫色
<div className="absolute top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 p-2 text-white">
    New Arrival
</div>

右上角 Sale 標籤，背景色紅
<div className="absolute top-0 right-0 bg-red-600 text-white p-2 rounded-bl-lg">
    Sale
</div>

Product Cards
ref : https://frontendshape.com/post/nextjs-with-shadcn-ui-product-cards-example
*/
