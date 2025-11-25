import { motion } from 'framer-motion';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="w-16 h-16 border-4 border-amber-200 border-t-red-600 rounded-full mx-auto mb-4"
        />
        <p className="text-amber-900 font-medium">Loading cultural treasures...</p>
      </div>
    </div>
  );
}
