export interface MovieInfo {
  id: number;
  name: string;
  year: number;
  genres: string[];
  imageUrl: string;
  rating: number;
  duration: string;
  description: string;
}

export interface ApiMovie {
  id: number;
  title: string;
  release_date: string;
  genres: string[];
  poster_path: string;
  vote_average: number;
  runtime: number;
  overview: string;
}