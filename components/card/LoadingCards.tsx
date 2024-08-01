import { Skeleton } from "../ui/skeleton";

const LoadingCards = () => {
  return (
    <section className="mt-4 gap-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx}>
          <Skeleton className="h-[300px] rounded-md" />
          <Skeleton className="h-4 mt-2 w-3/4" />
          <Skeleton className="h-4 mt-2 w-1/2" />
        </div>
      ))}
    </section>
  );
};

export default LoadingCards;
