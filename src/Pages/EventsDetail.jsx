import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router";

const EventsDetail = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  // console.log(id)

  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  // console.log(axiosSecure)
  const { data: eventInfo = [], isLoading } = useQuery({
    queryKey: ["eventInfo", id],
    queryFn: async () => {
      const result = await axiosSecure.get(`/events/${id}`);
      return result.data;
    },
  });
  //   console.log(eventInfo);

  const {
    _id,
    clubId,
    clubName,
    title,
    description,
    eventDate,
    location,
    isPaid,
    eventFee,
    attendees,
    maxAttendees,
  } = eventInfo || {};
// console.log(eventInfo)
  //  payment handling

  const handleFreePayment = () => {
    const updatedAttendees = [...attendees];
    toast.success("payment successful");
    updatedAttendees.push({
      email: user?.email,
    });
    axiosSecure.patch(`/events/${_id}/update`, { attendees: updatedAttendees });
  };

  const handlePayment = async () => {
    const eventInfo = {
      fee: eventFee,
      eventId: _id,
      clubName,
      userEmail: user?.email,
      clubId,
      title: title,
      // trackingId: club.trackingId,
    };
    // console.log(eventInfo)

    const paymentInfo = {
      type: "event",
      eventInfo,
    };
    const res = await axiosPublic.post(
      "/payment-checkout-session",
      paymentInfo
    );

    window.location.assign(res.data.url);
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <span className="text-sm">{clubName}</span>

      <h1 className="text-3xl font-bold">{title}</h1>

      <div className="flex gap-4  text-sm">
        <div className="flex items-center gap-2">
          <Calendar size={16} /> {eventDate}
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} /> {location}
        </div>
        {maxAttendees && (
          <div className="flex items-center gap-2">
            <Users size={16} /> {maxAttendees} seats
          </div>
        )}
      </div>

      <p className=" leading-relaxed">{description}</p>

      {user ? (
        isPaid ? (
          <button
            onClick={handlePayment}
            className="btn btn-primary"
            disabled={attendees.some((member) => member.email === user?.email)}
          >
            Participate ${eventFee}
          </button>
        ) : (
          <button
            onClick={handleFreePayment}
            disabled={attendees.some((member) => member.email === user?.email)}
            className="font-semibold btn btn-primary"
          >
            Join for free
          </button>
        )
      ) : (
        <Link to={"/login"} className="btn btn-primary">
          Login to Perticipate
        </Link>
      )}
    </div>
  );
};

export default EventsDetail;
