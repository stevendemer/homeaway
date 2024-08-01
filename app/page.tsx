import LoadingCards from "@/components/card/LoadingCards";
import CategoriesList from "@/components/home/CategoriesList";
import PropertiesContainer from "@/components/home/PropertiesContainer";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { category?: string; search?: string };
}) {
  return (
    <main>
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
