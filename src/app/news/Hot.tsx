import React from 'react'
import { INewsProps } from './page';
import Link from 'next/link';

export const HotNews = ({ news }: { news: INewsProps[] }) => {
  return (
    <div className="  shadow-sm max-md:hidden">
      <h1 className="_subtitle bg-primaryGreen px-2 py-2">Hot news</h1>
      <ul className="p-2 max-h-[50vh] overflow-y-auto">
        {news.map((item, i) => (
          <li key={i}>
            <Link
              href={`/news/${item._id}`}
              className="flex w-full py-2 _p _link max-w-full line-clamp-1 "
            >
              {item.headline.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};