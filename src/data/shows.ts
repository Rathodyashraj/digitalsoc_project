// src/data/shows.ts
import type { Show } from '../types';

export const showsByCity: Record<string, Show[]> = {
  Jaipur: [
    {
      id: 'jp-1',
      title: 'Royal Courts of Amber: A Kathputli Tale',
      date: '2023-12-15',
      type: 'past',
      videoUrl: 'https://www.youtube.com/embed/MnWIIcVp4Ec',
      description:
        'A traditional Jaipur-style Kathputli performance recreating scenes from the royal courts of Amber.',
    },
  ],

  Udaipur: [
    {
      id: 'ud-1',
      title: 'Lakeside Legends: Tales of Mewar',
      date: '2024-02-05',
      type: 'past',
      videoUrl: 'https://www.youtube.com/embed/K20jWnaEoPc',
      description:
        'Puppeteers narrate heroic stories of the Mewar dynasty in a classic Udaipur lakeside setting.',
    },
  ],

  Jodhpur: [
    {
      id: 'jo-1',
      title: 'Blue City Chronicles',
      date: '2023-11-02',
      type: 'past',
      videoUrl: 'https://www.youtube.com/embed/dRmT7PXUzVs',
      description:
        'A folk storytelling session using Kathputli to depict everyday life in the lanes of Jodhpur.',
    },
  ],

  Ajmer: [
    {
      id: 'aj-1',
      title: 'Sacred Stories of Ajmer',
      date: '2024-01-10',
      type: 'past',
      videoUrl: 'https://www.youtube.com/embed/MbA4ZDBVdf8',
      description:
        'A spiritual-themed Kathputli performance reflecting the devotional folk traditions of Ajmer.',
    },
  ],

  Pushkar: [
    {
      id: 'ps-1',
      title: 'Pushkar Fair Puppet Special',
      date: '2023-11-20',
      type: 'past',
      videoUrl: 'https://www.youtube.com/embed/b44Jp6JpgA4',
      description:
        'A lively puppet performance inspired by the cultural vibrance of the Pushkar Camel Fair.',
    },
  ],

  Bikaner: [
    {
      id: 'bk-1',
      title: 'Desert Tales of Bikaner',
      date: '2023-12-01',
      type: 'past',
      videoUrl: 'https://www.youtube.com/embed/K_20ap8bGp8',
      description:
        'Kathputli artists narrate desert folklore and royal legends from the sands of Bikaner.',
    },
  ],

  Jaisalmer: [
    {
      id: 'js-1',
      title: 'Golden Fort Stories',
      date: '2024-01-25',
      type: 'past',
      videoUrl: 'https://www.youtube.com/embed/wpdiIohyNpw',
      description:
        'Traditional puppet storytelling inspired by the history and mystery of Jaisalmer Fort.',
    },
  ],
};
