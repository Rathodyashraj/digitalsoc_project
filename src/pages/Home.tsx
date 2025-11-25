import { motion } from 'framer-motion';
import RajasthanMap from '../components/RajasthanMap';
import { Sparkles, MapPin, Book, Award } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-amber-600/10" />

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-16 h-16 text-amber-600 mx-auto" />
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-700 via-amber-600 to-orange-600 mb-6">
                Kathputli Heritage
              </h1>

              <p className="text-xl md:text-2xl text-amber-900 font-medium mb-4">
                Discover Rajasthan's Puppet Tradition
              </p>

              <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Journey through the vibrant cities of Rajasthan and explore the ancient art of Kathputli puppetry.
                Each city tells a unique story of craftsmanship, culture, and timeless traditions.
              </p>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-20"
            >
              <h2 className="text-3xl font-bold text-center text-amber-900 mb-8">
                Explore the Map of Heritage
              </h2>
              <RajasthanMap />
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid md:grid-cols-3 gap-8 mb-20"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-all">
                <MapPin className="w-12 h-12 text-red-600 mb-4" />
                <h3 className="text-2xl font-bold text-amber-900 mb-3">City Stories</h3>
                <p className="text-gray-700 leading-relaxed">
                  Discover the unique Kathputli heritage of each Rajasthani city through rich, detailed articles.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-all">
                <Book className="w-12 h-12 text-amber-600 mb-4" />
                <h3 className="text-2xl font-bold text-amber-900 mb-3">Learn to Create</h3>
                <p className="text-gray-700 leading-relaxed">
                  Follow step-by-step tutorials to craft your own authentic Kathputli puppet.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border-2 border-amber-200 hover:shadow-2xl transition-all">
                <Award className="w-12 h-12 text-orange-600 mb-4" />
                <h3 className="text-2xl font-bold text-amber-900 mb-3">Test Your Knowledge</h3>
                <p className="text-gray-700 leading-relaxed">
                  Take interactive quizzes and deepen your understanding of this ancient art form.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <footer className="bg-gradient-to-r from-red-900 to-amber-900 text-white py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-lg font-medium mb-2">Kathputli Heritage</p>
            <p className="text-amber-200">
              Preserving the timeless art of Rajasthani puppetry for future generations
            </p>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
