import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Card from "./Card";

// 꽃 이미지 import
import flower1 from "../assets/flower1.jpg";
import flower2 from "../assets/flower2.jpg";
import flower3 from "../assets/flower3.jpg";
import flower4 from "../assets/flower4.jpg";
import flower5 from "../assets/flower5.jpg";
import flower6 from "../assets/flower6.jpg";
import flower7 from "../assets/flower7.jpg";
import flower8 from "../assets/flower8.jpg";

// 꽃 정보 인터페이스
interface FlowerInfo {
  imageUrl: string;
  name: string;
  meaning: string;
}

// 꽃 정보 배열
const flowerInfos: FlowerInfo[] = [
  {
    imageUrl: flower1,
    name: "벚꽃",
    meaning: "아름다움, 번영",
  },
  {
    imageUrl: flower2,
    name: "프리지아",
    meaning: "청순함, 당신의 앞날",
  },
  {
    imageUrl: flower3,
    name: "라일락",
    meaning: "첫사랑, 젊은날의 추억",
  },
  {
    imageUrl: flower4,
    name: "카네이션",
    meaning: "사랑, 존경",
  },
  {
    imageUrl: flower5,
    name: "메리골드",
    meaning: "반드시 오고야 말 행복",
  },
  {
    imageUrl: flower6,
    name: "수선화",
    meaning: "자기사랑, 자존심",
  },
  {
    imageUrl: flower7,
    name: "개망초",
    meaning: "화해",
  },
  {
    imageUrl: flower8,
    name: "샤프란",
    meaning: "후회 없는 청춘",
  },
];

// 카드 인터페이스 정의
interface CardType {
  id: number;
  imageUrl: string;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: number; // 짝 식별을 위한 ID 추가
  flowerName: string; // 꽃 이름 추가
  flowerMeaning: string; // 꽃말 추가
}

const CardGame = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [firstSelectedCard, setFirstSelectedCard] = useState<number | null>(
    null
  );
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);

  // 게임 초기화 함수
  const initializeGame = () => {
    // 각 이미지에 고유한 pairId 부여하여 카드 배열 생성
    const cardPairs: CardType[] = [];

    // 각 이미지마다 두 장의 카드 생성
    for (let i = 0; i < flowerInfos.length; i++) {
      const flowerInfo = flowerInfos[i];

      // 첫 번째 카드
      cardPairs.push({
        id: i * 2,
        imageUrl: flowerInfo.imageUrl,
        isFlipped: false,
        isMatched: false,
        pairId: i,
        flowerName: flowerInfo.name,
        flowerMeaning: flowerInfo.meaning,
      });

      // 두 번째 카드 (짝)
      cardPairs.push({
        id: i * 2 + 1,
        imageUrl: flowerInfo.imageUrl,
        isFlipped: false,
        isMatched: false,
        pairId: i,
        flowerName: flowerInfo.name,
        flowerMeaning: flowerInfo.meaning,
      });
    }

    // 카드 배열을 무작위로 섞기
    const shuffledCards = [...cardPairs].sort(() => Math.random() - 0.5);

    // 섞은 후에 id를 인덱스 기반으로 다시 할당
    const indexedCards = shuffledCards.map((card, index) => ({
      ...card,
      id: index,
    }));

    setCards(indexedCards);
    setFirstSelectedCard(null);
    setIsProcessing(false);
  };

  // 컴포넌트 마운트 시 게임 초기화
  useEffect(() => {
    initializeGame();
  }, []);

  // 카드 클릭 핸들러
  const handleCardClick = (id: number) => {
    // 이미 뒤집힌 카드나 매치된 카드, 처리 중인 경우 클릭 무시
    if (
      cards[id].isFlipped ||
      cards[id].isMatched ||
      isProcessing ||
      (firstSelectedCard !== null && firstSelectedCard === id)
    ) {
      return;
    }

    // 카드 뒤집기
    const updatedCards = [...cards];
    updatedCards[id].isFlipped = true;
    setCards(updatedCards);

    // 첫 번째 카드 선택
    if (firstSelectedCard === null) {
      setFirstSelectedCard(id);
      return;
    }

    // 두 번째 카드 선택 - 매치 확인
    setIsProcessing(true);
    const firstCard = cards[firstSelectedCard];
    const secondCard = cards[id];

    if (firstCard.pairId === secondCard.pairId) {
      // 매치 성공
      setTimeout(() => {
        const matchedCards = [...cards];
        matchedCards[firstSelectedCard].isMatched = true;
        matchedCards[id].isMatched = true;
        setCards(matchedCards);
        setFirstSelectedCard(null);
        setIsProcessing(false);
      }, 500);
    } else {
      // 매치 실패
      setTimeout(() => {
        const resetCards = [...cards];
        resetCards[firstSelectedCard].isFlipped = false;
        resetCards[id].isFlipped = false;
        setCards(resetCards);
        setFirstSelectedCard(null);
        setIsProcessing(false);
      }, 1000);
    }
  };

  // 미리보기 시작 함수
  const handlePreview = () => {
    setIsPreviewing(true);
    // 카드를 순차적으로 뒤집기
    const previewCards = [...cards];
    previewCards.forEach((_, index) => {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c))
        );
      }, index * 100); // 각 카드마다 100ms 간격
    });
  };

  // 미리보기 종료 함수
  const handleClosePreview = () => {
    // 카드를 순차적으로 닫기
    const closeCards = [...cards];
    closeCards.forEach((_, index) => {
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c, i) =>
            i === index ? { ...c, isFlipped: c.isMatched } : c
          )
        );
      }, index * 100); // 각 카드마다 100ms 간격
    });

    // 모든 카드가 닫힌 후에 미리보기 상태 해제
    setTimeout(() => {
      setIsPreviewing(false);
    }, closeCards.length * 100 + 100); // 마지막 카드가 닫힌 후 100ms 후에 상태 변경
  };

  return (
    <div className="w-full h-[calc(100vh-5rem)] flex flex-col items-center justify-center">
      <div className="flex gap-2 mb-4">
        <motion.button
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePreview}
          disabled={isPreviewing || isProcessing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🔍 미리보기
        </motion.button>
        <motion.button
          className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleClosePreview}
          disabled={!isPreviewing}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          ✖️ 닫기
        </motion.button>
      </div>
      <motion.div
        className="grid grid-cols-4 h-full max-h-[90vh] max-w-sm sm:max-w-lg md:max-w-3xl p-2 gap-1.5 sm:gap-2 md:gap-3 bg-white/50 rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            imageUrl={card.imageUrl}
            isFlipped={card.isFlipped}
            isMatched={card.isMatched}
            flowerName={card.flowerName}
            flowerMeaning={card.flowerMeaning}
            onClick={() => !isPreviewing && handleCardClick(card.id)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default CardGame;
