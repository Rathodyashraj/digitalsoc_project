// src/pages/Shows.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Video, Info } from 'lucide-react';
import type { Show } from '../types';
import { showsByCity } from '../data/shows';
import { generateShowsIntro } from '../services/gemini';
import ContentRenderer from '../components/ContentRenderer';

export default function Shows() {
  const { cityName } = useParams<{ cityName: string }>();
  const navigate = useNavigate();

  const capitalizedCity =
    cityName
      ? cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase()
      : '';

  const [introContent, setIntroContent] = useState<string>('');
  const [loadingIntro, setLoadingIntro] = useState<boolean>(true);

  const shows: Show[] =
    capitalizedCity && showsByCity[capitalizedCity]
      ? showsByCity[capitalizedCity]
      : [];

  const liveShows = shows.filter((show) => show.type === 'live');
  const pastShows = shows.filter((show) => show.type === 'past');

  useEffect(() => {
    const fetchIntro = async () => {
      if (!capitalizedCity) return;
      setLoadingIntro(true);
      const intro = await generateShowsIntro(capitalizedCity);
      setIntroContent(intro);
      setLoadingIntro(false);
    };

    fetchIntro();
  }, [capitalizedCity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(`/city/${cityName}`)}
          className="flex items-center gap-2 text-amber-900 hover:text-red-700 mb-8 font-medium transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Article
        </motion.button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-amber-600 rounded-3xl shadow-2xl p-8 mb-8 text-white text-center"
        >
          <Video className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Kathputli Performances</h1>
          <p className="text-amber-50 text-lg">
            Watch live shows and recorded performances from {capitalizedCity}
          </p>
        </motion.div>

        {/* Gemini intro about shows in this city */}
        {!loadingIntro && introContent && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-xl p-6 md:p-8 mb-10"
          >
            <ContentRenderer content={introContent} />
          </motion.div>
        )}

        {/* LIVE SHOWS SECTION */}
        {liveShows.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
              <Clock className="w-8 h-8 text-red-600" />
              Live & Upcoming Shows
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {liveShows.map((show, index) => (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-green-200"
                >
                  {/* Live ribbon */}
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex items-center justify-between">
                    <span className="inline-block bg-white text-green-700 font-bold px-4 py-1 rounded-full text-sm">
                      LIVE
                    </span>
                    <span className="text-white text-sm font-medium">
                      {new Date(show.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Video or placeholder */}
                  <div className="aspect-video bg-black">
                    {show.videoUrl ? (
                      <iframe
                        src={show.videoUrl}
                        title={show.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="w-16 h-16 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-amber-900 mb-3">
                      {show.title}
                    </h3>
                    <p className="text-gray-700 mb-2">{show.description}</p>
                    <p className="text-sm text-green-700 font-semibold">
                      If this is a real live stream, it will play directly above at the
                      scheduled time.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* PAST SHOWS SECTION */}
        {pastShows.length > 0 ? (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-amber-900 mb-6 flex items-center gap-2">
              <Video className="w-8 h-8 text-amber-600" />
              Past Performances
            </h2>

            <div className="space-y-6">
              {pastShows.map((show, index) => (
                <motion.div
                  key={show.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="aspect-video bg-gray-200">
                      {show.videoUrl ? (
                        <iframe
                          src={show.videoUrl}
                          title={show.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Video className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-amber-900 mb-3">
                        {show.title}
                      </h3>

                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <Calendar className="w-5 h-5" />
                        <span>
                          {new Date(show.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>

                      <p className="text-gray-700">{show.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <Info className="w-16 h-16 text-amber-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              No Shows Available
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              There are currently no live or recorded performances available for{' '}
              {capitalizedCity}. Check back soon for upcoming shows and recorded
              performances!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={() => navigate(`/city/${cityName}/tutorial`)}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Learn to Create Puppets
              </button>
              <button
                onClick={() => navigate(`/city/${cityName}/quiz`)}
                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Take a Quiz
              </button>
            </div>
          </motion.div>
        )}

        {/* CTA to continue journey */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 border-2 border-amber-300"
        >
          <h3 className="text-2xl font-bold text-amber-900 mb-4">
            Continue Your Journey
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => navigate(`/city/${cityName}/tutorial`)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Make a Kathputli
            </button>
            <button
              onClick={() => navigate(`/city/${cityName}/quiz`)}
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
            >
              Test Your Knowledge
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
