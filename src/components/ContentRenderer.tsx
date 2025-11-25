import { motion } from 'framer-motion';

interface ContentRendererProps {
  content: string;
}

// Helper to clean up inline markdown / AI artifacts
const sanitizeLine = (text: string): string => {
  let t = text;

  // Remove fenced code block markers like ``` or ```json
  if (/^```/.test(t)) return '';

  // Drop very generic AI meta lines if they ever appear
  if (/as an ai language model/i.test(t)) return '';

  // Strip bold markers **text** or __text__
  t = t.replace(/\*\*(.*?)\*\*/g, '$1');
  t = t.replace(/__(.*?)__/g, '$1');

  // Strip italic markers *text* or _text_
  // (this is a bit greedy, but fine for simple content)
  t = t.replace(/\*(.*?)\*/g, '$1');
  t = t.replace(/_(.*?)_/g, '$1');

  // Trim again after cleanup
  return t.trim();
};

export default function ContentRenderer({ content }: ContentRendererProps) {
  const formatContent = (text: string) => {
    const lines = text.split('\n');
    const formatted: JSX.Element[] = [];
    let key = 0;

    lines.forEach((line) => {
      const rawTrimmed = line.trim();

      // run sanitizer on each line
      const trimmed = sanitizeLine(rawTrimmed);

      // if line became empty after sanitizing, add small spacer
      if (trimmed.length === 0) {
        formatted.push(<div key={key++} className="h-2" />);
        return;
      }

      if (trimmed.startsWith('# ')) {
        formatted.push(
          <h1
            key={key++}
            className="text-4xl md:text-5xl font-bold text-amber-900 mb-6 mt-8"
          >
            {trimmed.substring(2)}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        formatted.push(
          <h2
            key={key++}
            className="text-2xl md:text-3xl font-bold text-red-800 mb-4 mt-6"
          >
            {trimmed.substring(3)}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        formatted.push(
          <h3
            key={key++}
            className="text-xl md:text-2xl font-semibold text-amber-800 mb-3 mt-4"
          >
            {trimmed.substring(4)}
          </h3>
        );
      } else if (trimmed.startsWith('- ')) {
        formatted.push(
          <li
            key={key++}
            className="text-gray-700 leading-relaxed ml-6 mb-2 list-disc"
          >
            {trimmed.substring(2)}
          </li>
        );
      } else if (trimmed.startsWith('* ')) {
        formatted.push(
          <li
            key={key++}
            className="text-gray-700 leading-relaxed ml-6 mb-2 list-disc"
          >
            {trimmed.substring(2)}
          </li>
        );
      } else {
        formatted.push(
          <p
            key={key++}
            className="text-gray-700 leading-relaxed mb-4 text-lg"
          >
            {trimmed}
          </p>
        );
      }
    });

    return formatted;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="prose prose-lg max-w-none"
    >
      {formatContent(content)}
    </motion.div>
  );
}
