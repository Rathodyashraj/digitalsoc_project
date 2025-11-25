import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { generateTutorial } from '../services/gemini';
import ContentRenderer from '../components/ContentRenderer';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Tutorial() {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (cityName) {
        setLoading(true);
        const capitalizedCity = cityName.charAt(0).toUpperCase() + cityName.slice(1);
        const tutorial = await generateTutorial(capitalizedCity);
        setContent(tutorial);
        setLoading(false);
      }
    };

    fetchContent();
  }, [cityName]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/city/${cityName}`)}
          className="flex items-center gap-2 text-amber-900 hover:text-red-700 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Article
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-amber-600 rounded-3xl shadow-2xl p-8 mb-8 text-white text-center"
        >
          <CheckCircle2 className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Make Your Own Kathputli</h1>
          <p className="text-amber-50 text-lg">
            A hands-on guide to creating an authentic Rajasthani puppet
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-12"
        >
          <ContentRenderer content={content} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 border-2 border-amber-300"
        >
          <h3 className="text-2xl font-bold text-amber-900 mb-4">Ready for More?</h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate(`/city/${cityName}/quiz`)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Test Your Knowledge
            </button>
            <button
              onClick={() => navigate(`/city/${cityName}/shows`)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Watch Performances
            </button>
            <button
              onClick={() => navigate('/')}
              className="bg-gray-700 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Explore Another City
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
