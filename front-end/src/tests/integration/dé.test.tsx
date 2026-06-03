// App.integration.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import App from "../../App";

vi.spyOn(global, 'fetch').mockResolvedValue({
  ok: true,
  json: () => Promise.resolve([
    { type: 'd6', faces: 6, label: 'D6', custom: false },
  ]),
} as Response);

test('sélectionner D6 et cliquer Lancer affiche un résultat', async () => {
  render(<App />);
  await waitFor(() => screen.getByRole('button', { name: 'D6' }));
  
  fireEvent.click(screen.getByRole('button', { name: 'D6' }));
  fireEvent.click(screen.getByRole('button', { name: 'Lancer' }));

  await waitFor(
    () => expect(screen.getByText(/D6 · 6 faces/i)).toBeInTheDocument(),
    { timeout: 1500 }
  );
});