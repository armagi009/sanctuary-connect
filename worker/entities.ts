import { IndexedEntity } from "./core-utils";
import type { Practitioner, Article } from "@shared/types";
import { MOCK_PRACTITIONERS, MOCK_ARTICLES } from "@shared/mock-data";
// PRACTITIONER ENTITY
export class PractitionerEntity extends IndexedEntity<Practitioner> {
  static readonly entityName = "practitioner";
  static readonly indexName = "practitioners";
  static readonly initialState: Practitioner = {
    id: "",
    name: "",
    imageUrl: "",
    tagline: "",
    philosophy: "",
    modalities: [],
    certifications: [],
    rating: 0,
    reviewCount: 0,
    location: "",
    specialty: {
      focus: "",
      approach: "",
    },
  };
  static seedData = MOCK_PRACTITIONERS;
}
// ARTICLE ENTITY
export class ArticleEntity extends IndexedEntity<Article> {
  static readonly entityName = "article";
  static readonly indexName = "articles";
  static readonly initialState: Article = {
    id: "",
    category: "",
    title: "",
    imageUrl: "",
    authorName: "",
    authorImageUrl: "",
    publishedDate: "",
    excerpt: "",
    content: "",
  };
  static seedData = MOCK_ARTICLES;
}