import Hero from "../Components/Home/Hero";
import FeaturedClubs from "../Components/Home/FeaturedClubs";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  return (
    <div className="">

      
      <Hero></Hero>
      <FeaturedClubs></FeaturedClubs>
    </div>
  );
};

export default Home;
