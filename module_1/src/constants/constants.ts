import pulpFictionImg from './../assets/pulp-fiction.png';

export const GENRES = ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'] as const;


export const COUNTER_INITIAL_VALUE = 5;

export const SAMPLE_MOVIE_PULP_FICTION = {
  name: 'Pulp Fiction',
  year: 1994,
  genres: ['Action', 'Adventure', 'Crime'],
  imageUrl: pulpFictionImg,
  rating: 8.9,
  duration: '2h 34min',
  description: 'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
};