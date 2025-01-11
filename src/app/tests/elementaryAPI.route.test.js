import { GET } from './route';
import axios from 'axios';
import { createMocks } from 'node-mocks-http';

jest.mock('axios');

describe('elementary API Route', () => {
  it('returns correct word data', async () => {
    const mockResponse = {
      data: [
        {
          hwi: { hw: 'test*' },
          shortdef: ['An educational activity.'],
        },
      ],
    };

    axios.get.mockResolvedValue(mockResponse);

    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/elementary',
      query: {
        word: 'test',
      },
    });

    await GET(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      word: 'test',
      definition: 'An educational activity.',
      example: 'No example sentence.',
    });

    expect(axios.get).toHaveBeenCalledWith(
      `https://www.dictionaryapi.com/api/v3/references/sd2/json/test?key=${process.env.ELEMENTARY_API_KEY}`
    );
  });

});
