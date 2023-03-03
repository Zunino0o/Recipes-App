import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../components/Header';

const PAGE_TITLE = 'page-title';
const PROFILE_TOP_BTN = 'profile-top-btn';
const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';

describe('Header', () => {
  it('renders logo and page title', () => {
    render(<Header pageTitle="Home" />);
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByTestId(PAGE_TITLE)).toHaveTextContent('Home');
  });

  it('renders profile icon always and search icon when pathname is "/search"', () => {
    render(
      <MemoryRouter initialEntries={ ['/search'] }>
        <Header pageTitle="Search" />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();
    expect(screen.getByTestId(SEARCH_TOP_BTN)).toBeInTheDocument();

    render(
      <MemoryRouter>
        <Header pageTitle="Home" />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(PROFILE_TOP_BTN)).toBeInTheDocument();
    expect(screen.queryByTestId(SEARCH_TOP_BTN)).not.toBeInTheDocument();
  });

  it('clicks on profile icon and navigates to "/profile" with title "Profile"', () => {
    const historyMock = { push: jest.fn(), location: {} };
    const { rerender } = render(
      <MemoryRouter>
        <Header pageTitle="Home" history={ historyMock } />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId(PROFILE_TOP_BTN));
    expect(historyMock.push).toHaveBeenCalledWith('/profile');
    expect(screen.getByTestId(PAGE_TITLE)).toHaveTextContent('Profile');

    rerender(
      <MemoryRouter>
        <Header pageTitle="Search" history={ historyMock } />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId(PROFILE_TOP_BTN));
    expect(historyMock.push).toHaveBeenCalledWith('/profile');
    expect(screen.getByTestId(PAGE_TITLE)).toHaveTextContent('Profile');
  });

  it('clicks on search icon and shows/hides search input', () => {
    render(
      <MemoryRouter>
        <Header pageTitle="Home" />
      </MemoryRouter>,
    );

    expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    expect(screen.getByTestId(SEARCH_INPUT)).toBeInTheDocument();

    fireEvent.click(screen.getByTestId(SEARCH_TOP_BTN));
    expect(screen.queryByTestId(SEARCH_INPUT)).not.toBeInTheDocument();
  });
});
