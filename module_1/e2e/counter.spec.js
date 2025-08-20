describe('Counter E2E Test', () => {
  it('increments and decrements counter', async () => {
      await browser.url('/');

      const counterValue = await $('[data-testid="counter-value"]');
      const incrementBtn = await $('[data-testid="increment-btn"]');
      const decrementBtn = await $('[data-testid="decrement-btn"]');

      await expect(counterValue).toHaveText('5');

      await incrementBtn.click();
      await expect(counterValue).toHaveText('6');

      await decrementBtn.click();
      await expect(counterValue).toHaveText('5');
  });
});