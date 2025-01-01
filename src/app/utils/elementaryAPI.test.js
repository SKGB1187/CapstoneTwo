import axios from 'axios';
import { fetchWordData } from './elementaryAPI';

jest.mock('axios');

describe('fetchWordData', () => {
  it('fetches and returns the correct word data', async () => {
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

    const result = await fetchWordData('test');

    expect(result).toEqual({
      word: 'test',
      definition: 'A procedure for critical evaluation.',
      example: 'No example sentence.',
    });

    expect(axios.get).toHaveBeenCalledWith(
      'https://www.dictionaryapi.com/api/v3/references/sd2/json//test?key=73adfb26-6b8c-4230-b09f-dd0817e820b9'
    );
  });

  it('handles missing word data gracefully', async () => {
    const mockResponse = { data: [] };
    axios.get.mockResolvedValue(mockResponse);

    const result = await fetchWordData('test');

    expect(result).toBeNull();
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.dictionaryapi.com/api/v3/references/sd2/json//test?key=73adfb26-6b8c-4230-b09f-dd0817e820b9'
    );
  });

  it('handles API errors gracefully', async () => {
    axios.get.mockRejectedValue(new Error('API error'));

    const result = await fetchWordData('test');

    expect(result).toBeNull();
    expect(axios.get).toHaveBeenCalledWith(
      'https://www.dictionaryapi.com/api/v3/references/sd2/json//test?key=73adfb26-6b8c-4230-b09f-dd0817e820b9'
    );
  });
});

