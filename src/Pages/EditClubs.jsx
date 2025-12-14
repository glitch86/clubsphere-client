import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import bannerDummy from "../assets/bannerDummy.png";


const EditClubs = () => {
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  //   fetch info
  const { id } = useParams();
  const { data: clubInfo = [] } = useQuery({
    queryKey: ["clubInfo", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/clubs/${id}`);
      return result.data;
    },
  });


const { mutate: updateClubInfo } = useMutation({
    mutationFn: ({ id, data }) =>
      axiosSecure.patch(`/clubs/${id}/update`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["clubs"]);
    },
  });

  const handleUpdateClub = (data) => {

    // console.log(data)
    updateClubInfo({id, data });
  };


  const { register, handleSubmit,control } = useForm();
  const imgURL = useWatch({ control, name: "bannerImage" });

  return (
    <div>
      <div>
        <h1 className="heading text-center">Editng {clubInfo.clubName}</h1>
        <div className="hero  min-h-screen">
          <div className="hero-content  flex-col lg:flex-row md:gap-40">
            <img className="rounded-2xl" src={imgURL || bannerDummy} alt="" />
            <div>
              <form
                onSubmit={handleSubmit(handleUpdateClub)}
                className="card w-full max-w-lg p-6 space-y-4 md:grid grid-cols-2 gap-4"
              >
                {/* clubname */}
                <div>
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={clubInfo.clubName}
                    {...register("name", { required: "Name is required" })}
                    className="input input-bordered w-full"
                    placeholder="Club Name"
                  />
                </div>
                {/* category */}
                <div>
                  <label className="label font-medium">Category</label>
                  <select
                    defaultValue={clubInfo.category}
                    {...register("category", {
                      required: "Category is required",
                    })}
                    className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="Photography">Photography</option>
                    <option value="Tech">Tech</option>
                    <option value="Books">Books</option>
                    <option value="Art">Art</option>
                    <option value="Gaming">Gaming</option>
                  </select>
                </div>
                {/* Location */}
                <div>
                  <label className="label">
                    <span className="label-text">Location</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={clubInfo.location}
                    {...register("location", {
                      required: "Location is required",
                    })}
                    className="input input-bordered w-full"
                    placeholder="Location"
                  />
                </div>

                {/* fee */}
                <div>
                  <label className="label">
                    <span className="label-text">Membership Fee</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={clubInfo.membershipFee}
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
                    defaultValue={clubInfo.bannerImage}
                    {...register("bannerImage")}
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
                    defaultValue={clubInfo.description}
                    {...register("description")}
                    className="textarea textarea-bordered w-full"
                    rows="3"
                    placeholder="A rogue pilot must fight against..."
                  ></textarea>
                </div>

                <div className="pt-4 col-span-2">
                  <button type="submit" className="btn btn-primary w-full">
                    Commit Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EditClubs;
