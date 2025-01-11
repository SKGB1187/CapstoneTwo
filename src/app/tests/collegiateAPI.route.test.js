import { GET } from './route';
import axios from 'axios';
import { createMocks } from 'node-mocks-http';

jest.mock('axios');

describe('collegiate API Route', () => {
  it('returns correct word data', async () => {
    const mockResponse = {
      data: [
        {
          hwi: { hw: 'test*' },
          shortdef: ['A procedure for critical evaluation.'],
          def: [
            {
              sseq: [
                [
                  [
                    {
                      1: {
                        dt: [
                          ['vis', [{ t: 'No example sentence.' }]],
                        ],
                      },
                    },
                  ],
                ],
              ],
            },
          ],
        },
      ],
    };

    axios.get.mockResolvedValue(mockResponse);

    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/collegiate',
      query: {
        word: 'test',
      },
    });

    await GET(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      word: 'test',
      definition: 'A procedure for critical evaluation.',
      example: 'No example sentence.',
    });

    expect(axios.get).toHaveBeenCalledWith(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/test?key=${process.env.COLLEGIATE_API_KEY}`
    );
  });

  it('handles missing word parameter', async () => {
    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/collegiate',
      query: {},
    });

    await GET(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Word parameter is required.',
    });
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const { req, res } = createMocks({
      method: 'GET',
      url: '/api/collegiate',
      query: {
        word: 'test',
      },
    });

    await GET(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      error: 'Failed to fetch word data.',
    });

    expect(axios.get).toHaveBeenCalledWith(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/test?key=${process.env.COLLEGIATE_API_KEY}`
    );
  });
});
