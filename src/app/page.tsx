import Marquee from "@/components/Marquee";
import MainNews from "@/components/MainNews";

import PriceDown from "@/components/PriceDown";
import AllProducts from "@/components/AllProducts";
import Footer from "@/components/Footer";

interface IOtherSection {
  curationId: string;
  title: string;
  articles: {
    id: string;
    title: string;
    description: string;
    category: string;
    imageUrl: string;
    imageAlt: string;
  }[];
}

export default async function Home() {
  let sections: IOtherSection[] = [];
  try {
    const res = await fetch("https://news-api-v2.vercel.app/api/news/sections");
    if (res.ok) {
      const data: { data?: IOtherSection[] } = await res.json();
      sections = Array.isArray(data.data) ? data.data : [];
    }
  } catch {
    sections = [];
  }

  const otherSections: IOtherSection[] = sections.slice(1);

  return (
    <div>
      

      <div className="max-w-7xl mx-auto">
        <MainNews />
        <PriceDown />
        <AllProducts />

   
        </div>
   
      </div>
   
  );
}