describe('Search Params E2E Tests', () => {
  it('should display search form and movie list on "/"', async () => {
    await browser.url('/');

    const searchInput = await $('[data-testid="search-input"]');
    await browser.waitUntil(async () => (await $$('[data-testid="movie-tile"]')).length > 0);
    const movieTiles = await $$('[data-testid="movie-tile"]');

    await expect(searchInput).toBeDisplayed();
    await expect(movieTiles.length).toBeGreaterThan(0);
  });

  it('should update URL with query and display filtered movie list', async () => {
    await browser.url('/');
    const searchInput = await $('[data-testid="search-input"]');
    const searchButton = await $('[data-testid="search-button"]');

    await searchInput.setValue('Inception');
    await searchButton.click();

    const url = await browser.getUrl();
    expect(url).toContain('query=Inception');

    await browser.waitUntil(async () => (await $$('[data-testid="movie-tile"]')).length > 0);
    const movieTiles = await $$('[data-testid="movie-tile"]');
    await expect(movieTiles.length).toBeGreaterThan(0);
  });

  it('should update URL with genre and display filtered movies', async () => {
    await browser.url('/');
    const comedyBtn = await $('[data-testid="genre-COMEDY"]');
    await comedyBtn.click();

    const url = await browser.getUrl();
    expect(url).toContain('genre=COMEDY');

    await browser.waitUntil(async () => (await $$('[data-testid="movie-tile"]')).length > 0);
    const movieTiles = await $$('[data-testid="movie-tile"]');
    await expect(movieTiles.length).toBeGreaterThan(0);
  });

  it('should update URL with sortBy and display sorted movies', async () => {
    await browser.url('/');
    const sortSelect = await $('[data-testid="sort-select"]');
    await sortSelect.selectByVisibleText('TITLE');

    const url = await browser.getUrl();
    expect(url).toContain('sortBy=TITLE');

    await browser.waitUntil(async () => (await $$('[data-testid="movie-tile"]')).length > 0, {
      timeout: 10000,
      timeoutMsg: 'Movie tiles did not load in time'
    });
    const movieTiles = await $$('[data-testid="movie-tile"]');
    await expect(movieTiles.length).toBeGreaterThan(0);
  });
});