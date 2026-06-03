import { saveRoll } from '../../src/services/roll.service';
import { pool } from '../../src/db/client';

jest.mock('../../src/db/client', () => ({
  pool: {
    query: jest.fn(),
  },
}));

describe('saveRoll', () => {
  it('should save a roll', async () => {
    const result = await saveRoll('d20', 'D20', 15);

    expect(result.type).toBe('d20');
    expect(result.label).toBe('D20');
    expect(result.value).toBe(15);

    expect(pool.query).toHaveBeenCalled();
  });
});