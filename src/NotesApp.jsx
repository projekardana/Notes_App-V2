import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddPage from './pages/AddPage.jsx';
import DetailPageWrapper from './pages/DetailPage.jsx';
import NoteFoundPage from './pages/NoteFoundPage.jsx';
import HomePageWrapper from './pages/HomePage.jsx';
import ArchivedPageWrapper from './pages/ArchivedPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import Navigation from './components/Navigation.jsx';
import { Link } from 'react-router-dom';
import { getAccessToken, getUserLogged, putAccessToken } from './utils/api.js';
import { ThemeProvider } from './context/ThemeContext.jsx';
import ToggleTheme from './components/ToggleTheme.jsx';
import { LocaleProvider } from './context/LocaleContext.jsx';
import ToggleLocale from './components/ToggleLocale.jsx';

class NotesApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authedUser: null,
      initializing: true,
      localeContext: {
        locale: 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: prevState.localeContext.locale === 'id' ? 'en' : 'id',
              },
            };
          });
        },
      },

      theme: localStorage.getItem('theme') || 'light',
      toggleTheme: () => {
        this.setState((prevState) => {
          const newTheme = prevState.theme === 'light' ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          return {
            theme: newTheme,
          };
        });
      },
    };

    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLogoutHandler = this.onLogoutHandler.bind(this);
  }

  async onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
      };
    });
  }

  onLogoutHandler() {
    this.setState(() => {
      return {
        authedUser: null,
      };
    });

    putAccessToken('');
  }

  async componentDidMount() {
    const { data } = await getUserLogged();

    this.setState(() => {
      return {
        authedUser: data,
        initializing: false,
      };
    });
    document.documentElement.setAttribute('data-theme', this.state.theme);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.theme !== this.state.theme) {
      document.documentElement.setAttribute('data-theme', this.state.theme);
    }
  }

  render() {
    if (this.state.initializing) {
      return (
        <div className="app-container">
          <p>Memuat ... </p>
        </div>
      );
    }
    if (this.state.authedUser === null) {
      return (
        <ThemeProvider value={this.state}>
          <LocaleProvider value={this.state.localeContext}>
            <div className="app-container">
              <header className="notes-app__header">
                <h1>
                  {this.state.localeContext.locale === 'id'
                    ? 'Aplikasi Catatan'
                    : 'Notes App'}
                </h1>
                <ToggleLocale />
                <ToggleTheme />
              </header>
              <main>
                <Routes>
                  <Route
                    path="/*"
                    element={<LoginPage loginSuccess={this.onLoginSuccess} />}
                  />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </main>
            </div>
          </LocaleProvider>
        </ThemeProvider>
      );
    }

    return (
      <ThemeProvider value={this.state}>
        <LocaleProvider value={this.state.localeContext}>
          <div className="app-container">
            <header className="notes-app__header">
              <h1>
                <Link to="/">
                  {this.state.localeContext.locale === 'id'
                    ? 'Aplikasi Catatan'
                    : 'Notes App'}
                </Link>
              </h1>
              <ToggleLocale />
              <ToggleTheme />
              <Navigation
                logout={this.onLogoutHandler}
                name={this.state.authedUser.name}
              />
            </header>
            <main>
              <Routes>
                <Route path="/" element={<HomePageWrapper />} />
                <Route path="/add" element={<AddPage />} />
                <Route path="/arsives" element={<ArchivedPageWrapper />} />
                <Route path="/detail/:id" element={<DetailPageWrapper />} />
                <Route path="*" element={<NoteFoundPage />} />
              </Routes>
            </main>
          </div>
        </LocaleProvider>
      </ThemeProvider>
    );
  }
}

export default NotesApp;
