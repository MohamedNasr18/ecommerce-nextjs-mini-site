const StarRating = ({ rating, count }: { rating: number; count: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? "text-amber-500" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)} ({count})</span>
    </div>
  );
};

interface CardProps {
  image: string;
  name: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  badge?: string;
}

const Card = ({
  image,
  name,
  rating,
  reviewCount,
  price,
  originalPrice,

}: CardProps) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col w-[220px] hover:border-gray-200 transition-colors">
      <div className="w-full  h-58 bg-gray-50 flex items-center justify-center overflow-hidden">
        <img src={image} alt={name} className="w-full object-cover" />
      </div>

      <div className="p-3.5 flex flex-col gap-2 flex-1">
        

        <p className="text-sm font-medium text-gray-900 leading-snug m-0">{name}</p>

        <StarRating rating={rating} count={reviewCount} />

        <div className="flex items-center justify-between mt-auto pt-1">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-medium text-gray-900">${price}</span>
            {originalPrice && (
              <span className="text-xs text-gray-400 line-through">${originalPrice}</span>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Card;