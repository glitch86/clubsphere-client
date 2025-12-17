import { Calendar, MapPin, Users, Ticket } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";



const EventCard = ({ event }) => {
  const {
    _id,
    clubName,
    title,
    description,
    eventDate,
    location,
    isPaid,
    eventFee,
    maxAttendees,
  } = event;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="rounded-2xl bg-base-200 shadow-md hover:shadow-xl p-5 flex flex-col gap-4"
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium ">{clubName}</span>
        {isPaid ? (
          <span className="flex items-center gap-1 text-sm font-semibold text-emerald-600">
            <Ticket size={16} /> ${eventFee}
          </span>
        ) : (
          <span className="text-sm font-semibold text-blue-600">Free</span>
        )}
      </div>

      {/* tittle */}
      <h3 className="text-xl font-semibold leading-snug">
        {title}
      </h3>

      {/* description */}
      <p className="text-sm line-clamp-3">
        {description}
      </p>

      {/* info */}
      <div className="flex flex-col gap-2 text-sm ">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{eventDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={16} />
          <span>{location}</span>
        </div>
        {maxAttendees && (
          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>Max {maxAttendees} attendees</span>
          </div>
        )}
      </div>

      <Link to={`/events/${_id}`} className="mt-auto w-full text-center rounded-xl bg-primary text-white  py-2 text-sm font-medium cursor-pointer ">
        View Details
      </Link>
    </motion.div>
  );
};

export default EventCard;
