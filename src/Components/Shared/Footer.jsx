import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="bg-base-200">
      <footer className="footer sm:footer-horizontal  p-10">
        <aside>
          <Link to={'/'} className="text-2xl goth">ClubSphere</Link>
          <p className="">
            Connecting communities through passion,
            <br></br>
            events, and shared experiences.
          </p>
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <a href="https://github.com/glitch86" target="_blank">
                <FaGithub size={34} />
              </a>
              <a href="https://x.com/JunaitP" target="_blank">
                <FaXTwitter size={34} />
              </a>
              <a href="https://www.linkedin.com/in/polok-ahmed" target="_blank">
                <FaLinkedin size={34} />
              </a>
            </div>
          </nav>
        </aside>
        <aside className="flex justify-center items-center w-full">
          <div className="flex-1">
            <h3 className="my-5 goth">Platform</h3>

            <div className="flex flex-col gap-2 text-zinc-500">
              <Link to={"/clubs"}>Explore Clubs</Link>
              <Link to={"/dashboard/add-clubs"}>Create Event</Link>
              <Link
                to={"https://play.google.com/store/games?hl=en"}
                target="_blank"
              >
                Mobile App
              </Link>
              <Link to={"/pricing"}>Pricing</Link>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="my-5 goth">Company</h3>

            <div className="flex flex-col gap-2 text-zinc-500">
              <Link to={"/about"}>About</Link>
              <Link to={"/"}>Career</Link>
              <Link to={"/"}>Press</Link>
              <Link to={"/"}>Impact</Link>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="my-5 goth">Support</h3>

            <div className="flex flex-col gap-2 text-zinc-500">
              <Link to={"/"}>Help Center</Link>
              <Link to={"/"}>Safety Center</Link>
              <Link to={"/"}>Privacy Policy</Link>
              <Link to={"/"}>Terms of Service</Link>
            </div>
          </div>
        </aside>
      </footer>
      <div className="divider"></div>
      <div className="text-center text-zinc-500">
         <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
      </div>
    </div>
  );
};

export default Footer;
