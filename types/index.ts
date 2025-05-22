export interface Novel {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  synopsis: string;
  status: string;
  rating?: string;
}

export interface Chapter {
  id: string;
  title: string;
  releaseDate: string;
  content?: string[];
}

export interface HistoryItem {
  novelId: string;
  chapterId: string;
  novelTitle: string;
  chapterTitle: string;
  coverImage: string;
  timestamp: string;
}