import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import Home from "./pages/HomePage";
import useTheme from "./hooks/useTheme";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ResetPassword from "./pages/ResetPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TweetPage from "./pages/TweetPage";
import Profile from "./pages/ProfilePage";
import NotificationPage from "./pages/NotificationsPage";
import ExplorePage from "./pages/ExplorePage";
import MessagesPage from "./pages/MessagesPage";
import ListPage from "./pages/ListPage";
import BookmarksPage from "./pages/BookmarksPage";
import VerifiedPage from "./pages/VerifiedPage";

function App() {
	useTheme();
	return (
		<Routes>
			<Route element={<ProtectedRoute />}>
				<Route path="/" element={<Home />} />
				<Route path="/:username" element={<Profile />} />
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
