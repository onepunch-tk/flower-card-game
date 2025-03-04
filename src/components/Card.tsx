import { motion } from "framer-motion";

interface CardProps {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
  flowerName?: string;
  flowerMeaning?: string;
  onClick: () => void;
}

const Card = ({
  id,
  imageUrl,
  isFlipped,
  isMatched,
  flowerName = "",
  flowerMeaning = "",
  onClick,
}: CardProps) => {
  return (
    <div
      className={`relative w-[80px] h-[112px] sm:w-28 sm:h-40 md:w-32 md:h-44 cursor-pointer ${
        isMatched ? "opacity-100" : ""
      }`}
      onClick={onClick}
      data-card-id={id}
    >
      <div className="w-full h-full relative">
        {/* 카드 뒷면 (숫자) */}
        <motion.div
          className="absolute inset-0 rounded-lg shadow-md"
          animate={{
            opacity: isFlipped ? 0 : 1,
            scale: isFlipped ? 0.8 : 1,
          }}
          transition={{ duration: 0.3 }}
          style={{
            pointerEvents: isFlipped ? "none" : "auto",
            zIndex: isFlipped ? 0 : 1,
          }}
        >
          <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white text-2xl sm:text-3xl md:text-4xl font-bold border-2 border-white shadow-md">
            {id + 1}
          </div>
        </motion.div>

        {/* 카드 앞면 (꽃 이미지) */}
        <motion.div
          className="absolute inset-0 rounded-lg shadow-md overflow-hidden"
          animate={{
            opacity: isFlipped ? 1 : 0,
            scale: isFlipped ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          style={{
            pointerEvents: isFlipped ? "auto" : "none",
            zIndex: isFlipped ? 1 : 0,
          }}
        >
          <img
            src={imageUrl}
            alt={`Card ${id}`}
            className="w-full h-full object-cover rounded-lg border-2 border-white"
          />

          {isMatched && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center text-center p-1 sm:p-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                background: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backdropFilter: "blur(2px)",
              }}
            >
              <h3 className="text-[10px] sm:text-xs md:text-sm font-bold text-blue-800 mb-0.5 sm:mb-1">
                {flowerName}
              </h3>
              <p className="text-[8px] sm:text-[10px] md:text-xs text-blue-600 leading-tight">
                {flowerMeaning}
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Card;
