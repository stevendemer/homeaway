import LoadingCards from "@/components/card/LoadingCards";
import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";
import Banner from "@/components/home/Banner";

export default function Home({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  const slides = [
    "/assets/villa.png",
    "/assets/pool.png",
    "/assets/complex.png",
    "/assets/marble.png",
    "/assets/yacht.png",
  ];

  return (
    <main>
      <Banner slides={slides} />
      <CategoriesList
        category={searchParams.category}
        search={searchParams.search}
      />
      <Suspense fallback={<LoadingCards />}>
        {/* fetch inside the container for the suspense to work */}
        <PropertiesContainer
          category={searchParams.category}
          search={searchParams.search}
        />
      </Suspense>
    </main>
  );
}
