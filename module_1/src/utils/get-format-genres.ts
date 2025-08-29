export const getFormatGenres = (genres: string[]) => {
  if (genres.length === 0)
    return 'No genre';
  if (genres.length === 1)
    return genres[0];

  if (genres.length === 2) 
    return genres.join(' & ');

  return genres.join(', ');
}
