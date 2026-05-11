import Hero from "../Components/Home/Hero";
import FeaturedClubs from "../Components/Home/FeaturedClubs";
import { AuthContext } from "../Context/AuthContext";
import TrendingCat from "../Components/Home/TrendingCat";
import MyContainer from "../Components/Shared/MyContainer";
import CTA from "../Components/Home/CTA";

const Home = () => {
  return (
    <div className="">
      <Hero></Hero>
      <MyContainer>
        <TrendingCat></TrendingCat>
        <FeaturedClubs></FeaturedClubs>
        <CTA></CTA>
      </MyContainer>
    </div>
  );
};

export default Home;
