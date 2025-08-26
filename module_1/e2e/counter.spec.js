describe('Counter E2E Test', () => {
  it('increments and decrements counter', async () => {
    await browser.url('/');

    const counterValue = await $('[data-testid="counter-value"]');
    const incrementBtn = await $('[data-testid="increment-btn"]');
    const decrementBtn = await $('[data-testid="decrement-btn"]');

    const initialValueText = await counterValue.getText();
    const initialValue = Number(initialValueText);

    await incrementBtn.click();
    await expect(counterValue).toHaveText(String(initialValue + 1));

    await decrementBtn.click();
    await expect(counterValue).toHaveText(String(initialValue));
  });
});