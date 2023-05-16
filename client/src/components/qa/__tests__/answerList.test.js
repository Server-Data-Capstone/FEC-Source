import React from 'react';
import axios from 'axios';
import { render, fireEvent, screen } from '@testing-library/react';
import AnswerList from '../questionList/AnswerList';

jest.mock('axios');

describe('renders answer list', () => {
  axios.get.mockResolvedValue({
    data: {
      results: [{
        answer_id: 5992063,
        body: 'More pics',
        date: '2023-05-13T00:00:00.000Z',
        answerer_name: 'asd',
        helpfulness: 2,
      }],
    },
  });
  test('answer list is rendered properly', () => {
    render(<AnswerList id={40349} />);
    expect(screen.getByTestId('answer-list')).toBeTruthy();
    jest.clearAllMocks();
  });
});

describe('answer list error', () => { // come back to this later. I'm on the right track
  axios.get.mockRejectedValueOnce();
  test('answer list should throw an error', () => {
    render(<AnswerList id={40349} />);
    expect(screen).toThrow(Error);
    jest.clearAllMocks();
  });
});
