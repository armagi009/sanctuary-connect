import type { Practitioner, Article } from '@shared/types';
import { SessionOffering } from '@/stores/bookingStore';
export const MOCK_PRACTITIONERS: Practitioner[] = [
  {
    id: '1',
    name: 'Dr. Althea Sol',
    imageUrl: `https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop`,
    tagline: 'Guiding you to inner peace through mindfulness.',
    philosophy: 'I believe in a holistic approach to healing, integrating mind, body, and spirit to foster deep, lasting transformation. My work is grounded in compassion, presence, and the belief that everyone holds the innate capacity to heal.',
    modalities: ['Mindfulness', 'Somatic Healing', 'Reiki', 'Meditation'],
    certifications: [
      { institution: 'Mindful Institute', title: 'Certified Mindfulness Teacher', year: 2018 },
      { institution: 'Somatic Experiencing Trauma Institute', title: 'Somatic Healing Practitioner', year: 2020 }
    ],
    rating: 4.9,
    reviewCount: 124,
    location: 'San Francisco, CA'
  },
  {
    id: '2',
    name: 'Marcus Thorne',
    imageUrl: `https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop`,
    tagline: 'Unlock your potential with shamanic wisdom.',
    philosophy: 'My practice is rooted in ancient shamanic traditions, helping you connect with your spirit guides and heal ancestral patterns. I serve as a bridge between worlds to bring back wisdom and healing for your soul\'s journey.',
    modalities: ['Shamanic Journeying', 'Ancestral Healing', 'Tarot', 'Soul Retrieval'],
    certifications: [
      { institution: 'The Shamanic Path', title: 'Master Shamanic Practitioner', year: 2015 }
    ],
    rating: 5.0,
    reviewCount: 98,
    location: 'Asheville, NC'
  },
  {
    id: '3',
    name: 'Lena Petrova',
    imageUrl: `https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop`,
    tagline: 'Somatic healing for embodied wellness.',
    philosophy: 'Through gentle, body-based practices, we can release trauma and cultivate a profound sense of safety and presence. Healing happens when we learn to listen to the wisdom of the body.',
    modalities: ['Somatic Healing', 'Yoga Therapy', 'Breathwork'],
    certifications: [
      { institution: 'Embodied Wellness Institute', title: 'Certified Somatic Therapist', year: 2020 }
    ],
    rating: 4.8,
    reviewCount: 76,
    location: 'Online'
  },
  { id: '4', name: 'Kenji Tanaka', imageUrl: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop`, tagline: 'Mastering the art of Reiki energy.', philosophy: 'Reiki is universal life force energy. My role is to be a clear channel for this energy, facilitating your body\'s own natural healing abilities and restoring balance on all levels.', modalities: ['Reiki', 'Meditation'], certifications: [{ institution: 'International Center for Reiki Training', title: 'Reiki Master Teacher', year: 2012 }], rating: 4.9, reviewCount: 150, location: 'Kyoto, Japan' },
  { id: '5', name: 'Sofia Rossi', imageUrl: `https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop`, tagline: 'Clarity and insight through Tarot.', philosophy: 'The Tarot is a mirror to the soul. I use the cards to illuminate your path, uncover hidden truths, and empower you to make conscious, aligned choices.', modalities: ['Tarot', 'Astrology'], certifications: [{ institution: 'The Tarot School', title: 'Certified Tarot Reader', year: 2016 }], rating: 4.7, reviewCount: 210, location: 'New York, NY' },
  { id: '6', name: 'David Chen', imageUrl: `https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=800&auto=format&fit=crop`, tagline: 'Mindfulness for the modern world.', philosophy: 'In our fast-paced world, mindfulness is not a luxury but a necessity. I provide practical tools to integrate presence and awareness into your daily life for greater calm and focus.', modalities: ['Mindfulness', 'Coaching'], certifications: [{ institution: 'Unified Mindfulness', title: 'Certified Mindfulness Coach', year: 2019 }], rating: 4.8, reviewCount: 88, location: 'Online' },
];
export const MOCK_ARTICLES: Article[] = [
  {
    id: '1',
    category: 'Mindfulness',
    title: 'The Art of Presence: A Guide to Mindful Living',
    imageUrl: 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?q=80&w=1200&auto=format&fit=crop',
    authorName: 'Dr. Althea Sol',
    authorImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    publishedDate: '2024-06-15T10:00:00Z',
    excerpt: 'Discover practical techniques to cultivate mindfulness in your daily life, reducing stress and enhancing your overall well-being. This guide offers simple steps to anchor yourself in the present moment.',
    content: 'The full content of the article about mindful living goes here. It would be a longer text, possibly formatted with Markdown or HTML, detailing various mindfulness practices and their benefits.'
  },
  {
    id: '2',
    category: 'Shamanism',
    title: 'Connecting with Spirit Guides in Shamanic Journeying',
    imageUrl: 'https://images.unsplash.com/photo-1505524252386-591054539e45?q=80&w=1200&auto=format&fit=crop',
    authorName: 'Marcus Thorne',
    authorImageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop',
    publishedDate: '2024-06-12T14:30:00Z',
    excerpt: 'Learn the fundamentals of shamanic journeying and how to establish a profound connection with your spirit guides for wisdom, healing, and guidance on your life path.',
    content: 'This article would delve into the practice of shamanic journeying, explaining the cosmology, the role of spirit animals and guides, and providing a step-by-step guide for beginners.'
  },
  {
    id: '3',
    category: 'Somatic Healing',
    title: 'Listening to Your Body: An Introduction to Somatic Healing',
    imageUrl: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop',
    authorName: 'Lena Petrova',
    authorImageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    publishedDate: '2024-06-10T09:00:00Z',
    excerpt: 'Somatic healing is a powerful approach that helps release trauma and stress stored in the body. This article explores the core principles and offers a simple exercise to begin your practice.',
    content: 'The full article would explain the theory behind somatic experiencing, discuss the nervous system\'s role in trauma, and provide several gentle, body-based exercises for readers to try.'
  },
];
export const MOCK_SESSIONS: SessionOffering[] = [
    { title: 'Introductory Consultation', duration: 30, price: 75 },
    { title: 'Standard Healing Session', duration: 60, price: 150 },
    { title: 'Extended Deep Dive Session', duration: 90, price: 220 },
];