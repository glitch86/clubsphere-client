import React, { useContext, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../Context/AuthContext";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";

const EventReg = () => {
  const [eventId, setEventId] = useState();
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const result = await axiosSecure.get("/events");
      return result.data;
    },
  });
  const { data: regs = [] } = useQuery({
    queryKey: ["registrations"],
    queryFn: async () => {
      const result = await axiosSecure.get("/registrations");
      return result.data;
    },
  });

  const registrations = regs.filter((reg) => eventId && reg.eventId === eventId);

  const myEvents = events.filter((event) => event.addedBy === user.email);
  // console.log(registrations);

  

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div>
      <div>
        <label className="label font-medium">Select Event</label>
        <select
          defaultValue={""}
          onChange={(e) => setEventId(e.target.value)}
          className="select w-full rounded-full focus:border-0 focus:outline-gray-200"
        >
          <option value="" disabled>
            Select Event
          </option>
          {myEvents.map((event) => (
            <option key={event._id}  value={event._id}>
              {event.title}
            </option>
          ))}
        </select>

        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>User Email</th>
                <th>Status</th>
                <th>Registered At</th>
              </tr>
            </thead>
            <tbody className="bg-base-200">
              {/* row 1 */}
              {registrations.map((reg) => (
                <tr key={reg._id}>
                  <td>{reg.userEmail}</td>
                  <td>{reg.status}</td>
                  <td>{reg.regAt}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventReg;
