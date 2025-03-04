import { motion } from "framer-motion";
import CardGame from "./components/CardGame";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-blue-100 flex flex-col items-center justify-start p-2">
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-center mb-2 text-pink-800 bg-white/70 px-3 py-1 rounded-xl shadow-md"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
      >
        🌸 봄날의 행복 찾기 🌸
      </motion.h1>
      <CardGame />
    </div>
  );
}

export default App;
