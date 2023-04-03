import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import fetchMock from 'fetch-mock-jest';

import App from './app';
import { BrowserRouter } from 'react-router-dom';

describe('App component', () => {
  beforeEach(async () => {
    await fetchMock.mock('http://localhost:4000/api/hello', 'Hello World!');
  });

  afterEach(() => {
    fetchMock.reset();
  });

  test('displays Load Data button', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
     // After viewing the page you should find a Load Data button
    expect(await screen.findByText('Load Data')).toBeInTheDocument();
  });

  test('fetch data is called by clicking the button', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const button = screen.getByText('Load Data');
    fireEvent.click(button);

         // After clicking the button it should trigger a fetch call
    expect(fetchMock.calls('http://localhost:4000/api/hello')).toHaveLength(1);
  });
  
  test('button should get hidden after clicking it', async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  
    const button = screen.getByText('Load Data');
    fireEvent.click(button);
  
    // After clicking the button, it should get hidden
    expect(screen.queryByText('Load Data')).not.toBeInTheDocument();
  });
  
  
});
