import React from 'react';
import ReactDOM from 'react-dom/client';
import { unstable_HistoryRouter as HistoryRouter, Routes, Route } from 'react-router-dom';
import { createBrowserHistory, BrowserHistory } from 'history';
import HomeTemplate from './templates/HomeTemplate/HomeTemplate';
import HomePage from './pages/HomePage/HomePage';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import DetailCourse from './pages/DetailCourse/DetailCourse';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import CourseContent from './pages/CourseContent/CourseContent';
import UserManagement from './pages/UserManagement/UserManagement';
import UserProfile from './pages/Profile/UserProfile';
import BackToTopButton from './components/BackToTopButton/BackToTopButton';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const history: BrowserHistory | any = createBrowserHistory();


root.render(
  <Provider store={store}>
    <HistoryRouter history={history}>
      <BackToTopButton />
      <Routes>
        <Route path="" element={<HomeTemplate />}>
          <Route index element={<HomePage />} />
          <Route path="courses">
            <Route path=":course" element={<DetailCourse />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="detail">
            <Route path=":courseID" element={<CourseContent />} />
          </Route>
          <Route path="admin" element={<UserManagement />} />
        </Route>
      </Routes>
    </HistoryRouter>
  </Provider>
);

