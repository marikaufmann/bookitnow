import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";
import HotelDetails from "./pages/HotelDetails";
import AddHotel from "./pages/AddHotel";
import EditHotel from "./pages/EditHotel";
import MyHotels from "./pages/MyHotels";
import HotelBooking from "./pages/HotelBooking";
import MyBookings from "./pages/MyBookings";
import { useAppContext } from "./hooks/use-app-context";
import Article from "./pages/Article";
import ScrollToTop from "./components/ScrollToTop";
import PageNotFound from "./pages/PageNotFound";

function App() {
  const { isLoggedIn } = useAppContext();

  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/search" element={<Search />} />
          <Route path="/details/:hotelId" element={<HotelDetails />} />
          <Route path="/article/:articleId" element={<Article />} />
          {isLoggedIn && (
            <>
              <Route path="/add-hotel" element={<AddHotel />} />
              <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
              <Route path="/my-hotels" element={<MyHotels />} />
              <Route
                path="/hotel/:hotelId/booking"
                element={<HotelBooking />}
              />
              <Route path="/my-bookings" element={<MyBookings />} />
            </>
          )}
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
}

export default App;
