import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import LoadingSpinner from "../Shared/LoadingSpinner";
import toast from "react-hot-toast";


const EventModTable = () => {
  const { user } = useContext(AuthContext);
  // fetch data
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  // console.log(axiosSecure)
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const result = await axiosSecure.get("/events");
      return result.data;
    },
  });

  // console.log(events);

  // delete queries
  const deleteEvent = useMutation({
    mutationFn: (id) => {
      axiosSecure.delete(`/events/${id}`);
      
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });

  const handleDeleteEvent = (id) => {
    deleteEvent.mutate(id);
    toast.success("Event Deleted")
  };

  const myEvents = events.filter((event) => event.addedBy === user.email);


  if(isLoading) {
    return <LoadingSpinner></LoadingSpinner>
  }
  return (
    <div className="overflow-x-auto">

      {
        myEvents.length === 0 && <>
          <h1 className="text-center text-2xl">
            add events
          </h1>
        </>
      }
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Name</th>
            <th>Event date</th>
            <th>Entry Fee</th>
            <th>Attendees</th>
            <th>View Details</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {/* row 1 */}
          {myEvents.map((event) => (
            <tr key={event._id}>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{event.title}</div>
                    <div className="text-sm opacity-50">{event.location}</div>
                  </div>
                </div>
              </td>
              <td>{event.eventDate}</td>
              <td>{event.isPaid ? event.eventFee : 0}</td>
              <td>{event.attendees?.length}</td>
              <th>
                <Link
                  to={`/events/${event._id}`}
                  className="btn btn-ghost btn-xs"
                >
                  Details
                </Link>
              </th>
              <th>
                <Link
                  to={`/dashboard/edit-events/${event._id}`}
                  className="btn btn-secondary"
                >
                  Edit
                </Link>
              </th>
              <th>
                <button
                    onClick={() => handleDeleteEvent(event._id)}
                  className="btn btn-primary"
                >
                  Delete
                </button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventModTable;
