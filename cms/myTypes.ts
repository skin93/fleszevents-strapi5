
export interface SharedNextEvent {
  id?: number;
  name: string;
  date: Date | string;
  endDate?: Date | string;
  article?: Article | null;
};

export interface SharedOpenGraph {
  id?: number;
  ogTitle: string;
  ogDescription: string;
  ogImage: Media | null;
  ogUrl: string;
  ogType: string;
};

export interface SharedRelatedArticles {
  id?: number;
  articles?: Article[] | null;
};

export interface SharedSeo {
  id?: number;
  metaTitle: string;
  metaDescription: string;
  metaImage: Media | null;
  openGraph: SharedOpenGraph | null;
  keywords: string;
  metaRobots?: string;
  metaViewport?: string;
  canonicalURL: string;
  structuredData?: Record<string, any>;
  robotsIndex: boolean;
  robotsFollow: boolean;
  googleIndex: boolean;
  googleFollow: boolean;
};

export interface SharedSmallGallery {
  id?: number;
  images: Media[] | null;
};

export interface Article {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  title: string;
  slug: string;
  content: any;
  cover: Media | null;
  seo?: SharedSeo | null;
  authors?: Author[] | null;
  categories?: Category[] | null;
  tags?: Tag[] | null;
  relatedArticles?: SharedRelatedArticles | null;
  excerpt?: string;
  gallery?: SharedSmallGallery | null;
  isFestival?: boolean;
  festival?: Festival | null;
};

export interface Author {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  name: string;
  avatar?: Media | null;
  articles?: Article[] | null;
};

export interface Category {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  name: string;
  slug: string;
  articles?: Article[] | null;
  description: string;
};

export interface Festival {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  name: string;
  slug: string;
  description: string;
  cover: Media | null;
  tickets?: string;
  music_types?: MusicType[] | null;
  place?: Place | null;
  next_event?: SharedNextEvent | null;
};

export interface Gallery {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  name: string;
  description: string;
  slug: string;
  photos: Media[] | null;
  cover: Media | null;
  seo: SharedSeo | null;
  tags?: Tag[] | null;
};

export interface MusicType {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  name: string;
  festivals?: Festival[] | null;
};

export interface Place {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  lat?: number;
  lng?: number;
  city: string;
  location: string;
  festivals?: Festival[] | null;
  geolocation?: any;
  geohash?: string;
};

export interface Tag {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  publishedAt?: Date | string;
  locale?: string | null;
  name: string;
  slug: string;
  articles?: Article[] | null;
  galleries?: Gallery[] | null;
};

export interface Media {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: { thumbnail: MediaFormat; small: MediaFormat; medium: MediaFormat; large: MediaFormat; };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: string;
  url: string;
}

export interface User {
  id?: number;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  role: Role | null | number;
};

export interface Role {
  id?: number;
  documentId?: string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  name: string;
  description: string;
  type: string;
};

export interface FindOne<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  };
};

export interface FindMany<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    }
  };
};
