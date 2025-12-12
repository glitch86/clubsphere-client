import React, { use } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";

const AddClubs = () => {
  const { user } = use(AuthContext);
  // console.log(user.email);
  const navigate = useNavigate();

  const handleAddClub = (e) => {
    e.preventDefault();
    const form = e.target;

    const newClub = {
      title: form.title.value,
      genre: form.genre.value,
      releaseYear: form.releaseYear.value,
      director: form.director.value,
      cast: form.cast.value,
      rating: form.rating.value,
      duration: form.duration.value,
      plotSummary: form.plotSummary.value,
      posterUrl: form.posterUrl.value,
      language: form.language.value,
      country: form.country.value,
      addedBy: form.addedBy.value,
    };

    fetch("https://movie-master-server-six.vercel.app/movies/add", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${user.accessToken}`,
      },
      body: JSON.stringify(newClub),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Successfully added!");
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // console.log(newMovie);
    form.reset();
    navigate("/movies");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-2">Add a club</h2>
      <form
        onSubmit={handleAddClub}
        className="card w-full max-w-lg p-6 space-y-4 md:grid grid-cols-2 gap-4"
      >
        {/* clubname */}
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            placeholder="Club Name"
            required
          />
        </div>
        {/* category */}
        <div>
          <label className="label font-medium">Catergory</label>
          <select
            defaultValue={""}
            name=""
            required
            className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
          >
            <option value="" disabled>
              Select Catergory
            </option>
            <option value="Action">Action</option>
            <option value="Sci-fi">Sci-fi</option>
            <option value="Horror">Horror</option>
            <option value="Thriller">Thriller</option>
            <option value="Comedy">Comedy</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Drama">Drama</option>
          </select>
        </div>
        {/* Location */}
        <div>
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="title"
            className="input input-bordered w-full"
            placeholder="Location"
            required
          />
        </div>

        {/* fee */}
        <div>
          <label className="label">
            <span className="label-text">Membership Fee (in minutes)</span>
          </label>
          <input
            type="number"
            name="fee"
            className="input input-bordered w-full"
            placeholder="starts from $0"
          />
        </div>

        {/* banner image */}
        <div>
          <label className="label">
            <span className="label-text">Banner URL</span>
          </label>
          <input
            type="url"
            name="posterUrl"
            className="input input-bordered w-full"
            placeholder="https://example.com/poster.jpg"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Created By</span>
          </label>
          <input
            type="email"
            name="addedBy"
            defaultValue={user.email}
            readOnly
            className="input input-bordered w-full"
          />
        </div>

        {/* description */}
        <div className="col-span-2">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="plotSummary"
            className="textarea textarea-bordered w-full"
            rows="3"
            placeholder="A rogue pilot must fight against..."
          ></textarea>
        </div>

        <div className="pt-4 col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Add Movie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClubs;
