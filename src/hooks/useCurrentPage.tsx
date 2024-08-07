import { useLocation } from "react-router-dom";

const useCurrentPage = () => {
  const { pathname } = useLocation();
  return {
    isInHomePage: pathname === "/main" || pathname === "/main/home",
    isInSearchPage: pathname === "/main/search",
    isInCheckoutPage: pathname === "/main/checkout",
  };
};

export default useCurrentPage;
