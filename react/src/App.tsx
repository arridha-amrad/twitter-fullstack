import { Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import Home from './pages/HomePage';
import useTheme from './hooks/useTheme';
import ForgotPassword from './pages/ForgotPasswordPage';
import ResetPassword from './pages/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import TweetPage from './pages/TweetPage';
import NotificationPage from './pages/NotificationsPage';
import ExplorePage from './pages/ExplorePage';
import MessagesPage from './pages/MessagesPage';
import ListPage from './pages/ListPage';
import BookmarksPage from './pages/BookmarksPage';
import VerifiedPage from './pages/VerifiedPage';
import UserTweetsLayout from './pages/UserPage/UserTweetLayout';
import GetAllMyTweetsFeature from './features/GetAllMyTweetsFeature';
import GetAllMyRepliesFeature from './features/GetAllMyRepliesFeature';

function App() {
  useTheme();
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/:username" element={<UserTweetsLayout />}>
          <Route path="" element={<GetAllMyTweetsFeature />} />
          <Route path="replies" element={<GetAllMyRepliesFeature />} />
          <Route path="likes" element={<p>like page</p>} />
          <Route path="media" element={<p>media page</p>} />
        </Route>
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/lists" element={<ListPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/verified" element={<VerifiedPage />} />
        <Route path="/tweet/:tweetId" element={<TweetPage />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
