export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Minimal real-world chat example types (shared by frontend and worker)
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// Sanctuary Connect specific types
export interface Certification {
  institution: string;
  title: string;
  year: number;
}
export interface Practitioner {
  id: string;
  name: string;
  imageUrl: string;
  tagline: string;
  philosophy: string;
  modalities: string[];
  certifications: Certification[];
  rating: number;
  reviewCount: number;
  location: string;
  specialty: {
    focus: string;
    approach: string;
  };
}
export interface Article {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
  authorName: string;
  authorImageUrl: string;
  publishedDate: string; // ISO string
  excerpt: string;
  content: string; // Could be markdown or HTML
}
export interface Review {
  id: string;
  practitionerId: string;
  reviewerName: string;
  reviewerImageUrl: string;
  rating: number;
  reviewDate: string; // ISO string
  presence: string;
  insight: string;
  recommendation: string;
}
export interface SessionNote {
  id: string;
  sessionId: string;
  practitionerId: string;
  seekerId: string;
  title: string;
  content: string;
  createdAt: string; // ISO string
}