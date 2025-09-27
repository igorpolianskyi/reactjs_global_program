describe('Movie Details E2E Tests', () => {
  const TEST_QUERY = 'Inception';
  const TEST_GENRE = 'ALL';
  const TEST_SORT = 'TITLE';

  it('should navigate to movie details and preserve search params', async () => {
    await browser.url(`/?query=${TEST_QUERY}&genre=${TEST_GENRE}&sortBy=${TEST_SORT}`);

    await browser.waitUntil(async () => (await $$('[data-testid="movie-tile"]')).length > 0, {
      timeout: 10000,
      timeoutMsg: 'Expected at least one movie tile to be displayed'
    });

    const movieTiles = await $$('[data-testid="movie-tile"]');
    const firstMovie = movieTiles[0];
    const movieId = await firstMovie.getAttribute('data-movie-id');

    await firstMovie.click();

    const url = await browser.getUrl();
    expect(url).toContain(`/${movieId}`);
    expect(url).toContain(`query=${TEST_QUERY}`);
    expect(url).toContain(`genre=${TEST_GENRE}`);
    expect(url).toContain(`sortBy=${TEST_SORT}`);

    const movieDetails = await $('[data-testid="movie-details"]');
    await expect(movieDetails).toBeDisplayed();

    const bottomMovieList = await $$('[data-testid="movie-tile"]');
    await expect(bottomMovieList.length).toBeGreaterThan(0);
  });

  it('should return to search form and preserve params when clicking search button', async () => {
    await browser.url(`/?query=${TEST_QUERY}&genre=${TEST_GENRE}&sortBy=${TEST_SORT}`);

    await browser.waitUntil(async () => (await $$('[data-testid="movie-tile"]')).length > 0, {
      timeout: 10000,
      timeoutMsg: 'Expected at least one movie tile to be displayed'
    });

    const movieTiles = await $$('[data-testid="movie-tile"]');
    await movieTiles[0].click();

    const searchButton = await $('[data-testid="search-button"]');
    await searchButton.waitForDisplayed({ timeout: 5000 });
    await searchButton.click();

    const url = await browser.getUrl();
    expect(url).toContain(`query=${TEST_QUERY}`);
    expect(url).toContain(`genre=${TEST_GENRE}`);
    expect(url).toContain(`sortBy=${TEST_SORT}`);

    const searchInput = await $('[data-testid="search-input"]');
    await expect(searchInput).toBeDisplayed();
    await expect(searchInput).toHaveValue(TEST_QUERY);
  });
});