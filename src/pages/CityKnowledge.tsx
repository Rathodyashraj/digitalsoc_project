import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Trophy, Video } from 'lucide-react';
import { generateCityArticle } from '../services/gemini';
import ContentRenderer from '../components/ContentRenderer';
import LoadingSpinner from '../components/LoadingSpinner';

export default function CityKnowledge() {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchContent = async () => {
      if (cityName) {
        setLoading(true);
        const capitalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        const article = await generateCityArticle(capitalizedCity);
        setContent(article);
        setLoading(false);
      }
    };

    fetchContent();
  }, [cityName]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;

      if (scrollPercentage > 0.85 && !showOptions) {
        setShowOptions(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showOptions]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const capitalizedCity = cityName ? cityName.charAt(0).toUpperCase() + cityName.slice(1) : '';

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-amber-900 hover:text-red-700 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Map
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12"
        >
          <ContentRenderer content={content} />
        </motion.div>

        {showOptions && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="bg-gradient-to-r from-red-700 to-amber-600 rounded-3xl shadow-2xl p-8 text-white mb-12"
          >
            <h2 className="text-3xl font-bold mb-4 text-center">
              Want to dive deeper into Kathputli?
            </h2>
            <p className="text-center mb-8 text-amber-50">
              Choose your path to explore more
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/city/${cityName}/tutorial`)}
                className="bg-white text-amber-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-red-600" />
                <h3 className="text-xl font-bold mb-2">Learn to Create</h3>
                <p className="text-gray-700 text-sm">
                  Step-by-step guide to making your own Kathputli
                </p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/city/${cityName}/quiz`)}
                className="bg-white text-amber-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <Trophy className="w-12 h-12 mx-auto mb-4 text-amber-600" />
                <h3 className="text-xl font-bold mb-2">Take a Quiz</h3>
                <p className="text-gray-700 text-sm">
                  Test your knowledge about {capitalizedCity}'s heritage
                </p>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(`/city/${cityName}/shows`)}
                className="bg-white text-amber-900 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all"
              >
                <Video className="w-12 h-12 mx-auto mb-4 text-orange-600" />
                <h3 className="text-xl font-bold mb-2">Watch Shows</h3>
                <p className="text-gray-700 text-sm">
                  View live and recorded puppet performances
                </p>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
