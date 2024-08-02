import Title from "../properties/Title";
import { fetchPropertyReviews } from "@/utils/actions";
import ReviewCard from "./ReviewCard";

const PropertyReviews = async ({ propertyId }: { propertyId: string }) => {
  const reviews = await fetchPropertyReviews(propertyId);

  if (reviews.length < 1) return null;

  console.log("all the reviews are ", reviews);

  return (
    <div className="mt-8">
      <Title text="Reviews" />
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { firstName, profileImage } = review.profile as {
            firstName: string;
            profileImage: string;
          };
          const reviewInfo = {
            comment,
            rating,
            name: firstName,
            image: profileImage,
          };

          return <ReviewCard key={review.id} reviewInfo={reviewInfo} />;
        })}
      </div>
    </div>
  );
};

export default PropertyReviews;
