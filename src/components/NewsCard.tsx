import Image from 'next/image';

interface News {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  imageAlt: string;
}

const NewsCard = ({ news }: { news: News }) => {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-44 w-full">
        <Image
          src={news.imageUrl}
          alt={news.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 p-4">
        <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          {news.category}
        </span>

        <h2 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900">
          {news.title}
        </h2>

        <p className="line-clamp-3 text-sm leading-relaxed text-gray-600">
          {news.description}
        </p>
      </div>
    </article>
  );
};

export default NewsCard;