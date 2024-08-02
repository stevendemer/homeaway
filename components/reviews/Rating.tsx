import { FaStar, FaRegStar, FaCentercode } from "react-icons/fa";

const Rating = ({ rating }: { rating: number }) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1 <= rating);

  return (
    <div className="flex items-center gap-x-1">
      {stars.map((isFilled, idx) => {
        const className = `w-3 h-3 ${
          isFilled ? "text-primary" : "text-gray-400"
        }`;

        return isFilled ? (
          <FaStar className={className} key={idx} />
        ) : (
          <FaRegStar className={className} key={idx} />
        );
      })}
    </div>
  );
};

export default Rating;
