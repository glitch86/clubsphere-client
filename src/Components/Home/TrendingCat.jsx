import { Brush, Monitor, Music } from "lucide-react";
import React from "react";
import { FaFootballBall } from "react-icons/fa";

const TrendingCat = () => {
  const categories = [
    {
      icon: Music,
      header: "Music",
      events: "43 Events Today.",
    },
    {
      icon: FaFootballBall,
      header: "Sports",
      events: "18 Events Today.",
    },
    {
      icon: Brush,
      header: "Art",
      events: "12 Events Today.",
    },
    {
      icon: Monitor,
      header: "Tech",
      events: "25 Events Today.",
    },
  ];
  return (
    <div className="my-9">
      {/* heading */}
      <div className="my-4">
        <h2 className="heading">Trending Categories</h2>
        <p>The most active communities right now.</p>
      </div>
      {/* card contaner  */}
      <div className="grid grid-flow-col auto-cols-[300px] overflow-x-auto gap-3 w-fit mx-auto ">
        {/* card  */}

        {categories.map((category, index) => {
          const Icon = category.icon;
          return (
            <div key={index} className="w-[300px] bg-neutral p-9 rounded-2xl text-white">
              {/* icon */}
              <div className="bg-primary p-4 w-fit rounded-2xl">
                <Icon></Icon>
              </div>
              {/* texts */}
              <div>
                <h3 className="text-2xl font-semibold">{category.header}</h3>
                <p>{category.events}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrendingCat;
