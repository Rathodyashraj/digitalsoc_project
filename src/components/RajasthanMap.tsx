// src/components/RajasthanMap.tsx
import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet'; // ✅ helps TS understand center[]
import { useNavigate } from 'react-router-dom';
import { rajasthanCities } from '../data/cities';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function RajasthanMap() {
  const navigate = useNavigate();

  const handleCityClick = (cityName: string) => {
    navigate(`/city/${cityName.toLowerCase()}`);
  };

  // Center roughly over Rajasthan
  const rajasthanCenter: LatLngExpression = [26.9, 74.3];

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4">
      <div className="relative rounded-3xl shadow-2xl overflow-hidden border-4 border-amber-200">
        <MapContainer
          center={rajasthanCenter}
          zoom={6}
          scrollWheelZoom={true}
          className="w-full h-[420px]"
          style={{ background: '#fef3c7' }}
        >
          {/* Base map tiles (OpenStreetMap) */}
          <TileLayer
            // ✅ plain string is fine, TS was just being picky because of the &copy;
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* City markers */}
          {rajasthanCities.map((city) => (
            <CircleMarker
              key={city.name}
              center={[city.lat, city.lng] as LatLngExpression} // ✅ explicit type
              radius={10} // ✅ number is fine
              pathOptions={{
                color: '#b91c1c',
                fillColor: '#ef4444',
                fillOpacity: 0.9,
                weight: 2,
              }}
              eventHandlers={{
                click: () => handleCityClick(city.name),
              }}
            >
              {/* Hover tooltip */}
              <Tooltip
                // some older typings complain about these props – if they still do,
                // you can remove direction/offset/opacity and it will still work
                direction="top"
                offset={[0, -10]}
                opacity={0.95}
              >
                <div className="text-xs">
                  <div className="font-semibold text-black-100">{city.name}</div>
                  <div className="text-[10px] text-black-100">
                    {city.description}
                  </div>
                  <div className="mt-1 text-[10px] text-black-50 italic">
                    Click to explore Kathputli heritage
                  </div>
                  </div>
              </Tooltip>
            </CircleMarker>
          ))}
        </MapContainer>

        {/* Helper strip at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg"
        >
          <div className="flex items-center gap-2 text-amber-900">
            <MapPin className="w-5 h-5" />
            <p className="text-sm font-medium">
              Pan, zoom, and click on any highlighted city to explore its Kathputli
              heritage
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
