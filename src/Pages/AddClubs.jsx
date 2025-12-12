import React, { use } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const AddClubs = () => {
  const { user } = use(AuthContext);
  // console.log(user.email);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleAddClub = async (data) => {
    const newClub = {
      clubName: data?.name,
      category: data?.catergory,
      location: data?.location,
      membershipFee: data?.fee,
      bannerImage: data?.url,
      managerEmail: data?.addedBy,
      description: data?.description
    };

    // console.log(newClub);

    const {data:clubData} = await axiosSecure.post("/clubs/add", newClub)
    console.log(clubData)

    // navigate("/clubs");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-2">Add a club</h2>
      <form
        onSubmit={handleSubmit(handleAddClub)}
        className="card w-full max-w-lg p-6 space-y-4 md:grid grid-cols-2 gap-4"
      >
        {/* clubname */}
        <div>
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="input input-bordered w-full"
            placeholder="Club Name"
          />
        </div>
        {/* category */}
        <div>
          <label className="label font-medium">Catergory</label>
          <select
            defaultValue={""}
            {...register("catergory", { required: "Category is required" })}
            className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
          >
            <option value="" disabled>
              Select Catergory
            </option>
            <option value="Photography">Photography</option>
            <option value="Tech">Tech</option>
            <option value="Books">Books</option>
            <option value="Art">Art</option>
          </select>
        </div>
        {/* Location */}
        <div>
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            {...register("location", { required: "Location is required" })}
            className="input input-bordered w-full"
            placeholder="Location"
          />
        </div>

        {/* fee */}
        <div>
          <label className="label">
            <span className="label-text">Membership Fee (in minutes)</span>
          </label>
          <input
            type="number"
            {...register("fee", { required: "Fee is required" })}
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
            {...register("url")}
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
            {...register("addedBy")}
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
            {...register("description")}
            className="textarea textarea-bordered w-full"
            rows="3"
            placeholder="A rogue pilot must fight against..."
          ></textarea>
        </div>

        <div className="pt-4 col-span-2">
          <button type="submit" className="btn btn-primary w-full">
            Apply for approval
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddClubs;
