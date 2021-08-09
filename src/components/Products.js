import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter-v2";
import prime from "../../public/prime.png";

export default function Products({
  id,
  title,
  price,
  description,
  category,
  image,
}) {
  const MAX_RATING = 5;
  const MIN_RATING = 1;
  const [rating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING) + MIN_RATING)
  );

  const [hasPrime] = useState(Math.random() < 0.5);
  return (
    <div className="relative flex flex-col m-3 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>

      <Image
        src={image}
        width={200}
        height={200}
        objectFit="contain"
        alt="cloth"
      />

      <h4>{title}</h4>

      <div className="flex text-yellow-500">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="USD" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-6 mb-2">
          <Image
            src={prime}
            width={60}
            height={40}
            objectFit="contain"
            alt="prime pic"
          />
          <p className="text-xs text-gray-500">FREE Next-day delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add to Basket</button>
    </div>
  );
}
