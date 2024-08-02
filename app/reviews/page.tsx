import EmptyList from "@/components/home/EmptyList";
import { deleteReview, fetchReviewByUser } from "@/utils/actions";
import ReviewCard from "@/components/reviews/ReviewCard";
import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/SubmitButton";
import Title from "@/components/properties/Title";
import { IconType } from "react-icons";

const ReviewsPage = async () => {
  const reviews = await fetchReviewByUser();

  if (reviews.length === 0) return <EmptyList />;

  return (
    <>
      <Title text="Your reviews" />
      <section className="grid md:grid-cols-2 gap-8 mt-4">
        {reviews.map((review) => {
          const { comment, rating } = review;
          const { name, image } = review.property as {
            name: string;
            image: string;
          };

          return (
            <ReviewCard
              key={review.id}
              reviewInfo={{
                comment,
                rating,
                name,
                image,
              }}
            >
              <DeleteReview reviewId={review.id} />
            </ReviewCard>
          );
        })}
      </section>
    </>
  );
};

const DeleteReview = ({ reviewId }: { reviewId: string }) => {
  const deleteReviewAction = deleteReview.bind(null, { reviewId });

  return (
    <FormContainer action={deleteReviewAction}>
      <IconButton actionType="delete" />
    </FormContainer>
  );
};

export default ReviewsPage;
