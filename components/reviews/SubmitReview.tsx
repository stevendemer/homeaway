"use client";
import { useState } from "react";
import { SubmitButton } from "../form/SubmitButton";
import FormContainer from "../form/FormContainer";
import { Card } from "../ui/card";
import TextAreaInput from "../form/TextAreaInput";
import { createReview } from "@/utils/actions";
import RatingInput from "../form/RatingInput";
import { Button } from "../ui/button";

const SubmitReview = ({ propertyId }: { propertyId: string }) => {
  const [isReviewVisible, setReviewVisible] = useState(false);

  return (
    <div className="mt-8">
      <Button onClick={() => setReviewVisible((prev) => !prev)}>
        Leave a review
      </Button>
      {isReviewVisible && (
        <Card className="p-8 mt-8">
          <FormContainer action={createReview}>
            <input type="hidden" name="propertyId" value={propertyId} />
            <RatingInput name="rating" />
            <TextAreaInput
              name="comment"
              labelText="Your thoughts on this property"
              defaultValue="Amazing place"
            />
            <SubmitButton text="Submit" className="mt-4" />
          </FormContainer>
        </Card>
      )}
    </div>
  );
};

export default SubmitReview;
