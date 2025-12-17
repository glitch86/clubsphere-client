import React, { use } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useForm, useWatch } from "react-hook-form";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import toast from "react-hot-toast";

const EditEvents = () => {
  const { user } = use(AuthContext);
  const queryClient = useQueryClient();

  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  //   fetch info
  const { id } = useParams();
  const { data: eventInfo = [], isLoading } = useQuery({
    queryKey: ["eventInfo", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/events/${id}`);
      return result.data;
    },
  });

  //   fething clubs
  const { data: clubs = [] } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
    select: (clubs) => clubs.filter((club) => club.managerEmail === user.email),
  });

  const myClubs = clubs.filter((club) => club.managerEmail === user.email);

  const { mutate: updateEventInfo } = useMutation({
    mutationFn: ({ id, data }) =>
      axiosSecure.patch(`/events/${id}/update`, data),
    onSuccess: () => {
      queryClient.invalidateQueries(["eventInfo", id]);
    },
  });

  const handleUpdateEvent = (data) => {
    // console.log(data)
    updateEventInfo({ id, data });
    toast.success("Event Updated")
    navigate(-1);
  };

  const isPaid = useWatch({ control, name: "isPaid" });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(handleUpdateEvent)}>
          <div className="flex items-center gap-4">
            {/*  event name  */}
            <div className="">
              <label className="label">Event Name</label>
              <input
                {...register("title", {
                  required: "Event name is required",
                })}
                defaultValue={eventInfo.title}
                className="input input-bordered w-full"
              />
              {errors.eventName && (
                <p className="text-sm text-red-500">
                  {errors.clubName.message}
                </p>
              )}
            </div>

            {/* select club  */}
            <div>
              <label className="label font-medium">Select Club</label>
              <select
                defaultValue={eventInfo.clubId}
                {...register("clubId", { required: "club is required" })}
                className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
              >
                <option value="" disabled>
                  Select Club
                </option>
                {myClubs.map((club) => (
                  <option key={club._id} value={club._id}>
                    {club.clubName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* description */}
          <div>
            <label className="label">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              className="textarea textarea-bordered w-full"
              rows={4}
              placeholder="Describe the event..."
              defaultValue={eventInfo.description}
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Event Date */}

            <div>
              <label className="label">Event Date</label>
              <input
                type="date"
                {...register("eventDate", {
                  required: "Event date is required",
                })}
                className="input input-bordered w-full"
                defaultValue={eventInfo.eventDate}
              />
            </div>
            {/* Paid Event */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                {...register("isPaid")}
                className="checkbox"
                defaultChecked={eventInfo.isPaid}
              />
              <label className="label-text">Paid Event</label>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Location */}
            <div>
              <label className="label">Location</label>
              <input
                {...register("location", { required: "Location is required" })}
                className="input input-bordered w-full"
                placeholder="Auditorium A"
                defaultValue={eventInfo.location}
              />
            </div>

            {/* Event Fee */}
            {isPaid && (
              <div>
                <label className="label">Event Fee</label>
                <input
                  type="number"
                  {...register("eventFee", {
                    required: "Event fee is required",
                    min: { value: 0, message: "Fee cannot be negative" },
                  })}
                  className="input input-bordered w-full"
                  placeholder="500"
                  defaultValue={eventInfo.eventFee}
                />
                {errors.eventFee && (
                  <p className="text-sm text-red-500">
                    {errors.eventFee.message}
                  </p>
                )}
              </div>
            )}
          </div>
          {/* Max Attendees */}
          <div>
            <label className="label ">Max Attendees (optional)</label>
            <input
              type="number"
              {...register("maxAttendees")}
              className="input input-bordered w-full"
              placeholder="100"
              defaultValue={eventInfo.maxAttendees}
            />
          </div>
          <div className="pt-4 col-span-2">
            <button type="submit" className="btn btn-primary w-full">
              Post Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvents;
