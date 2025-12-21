import React from "react";
import LoadingSpinner from "../Shared/LoadingSpinner";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import EventCard from "./EventCard";

const EventCardContainer = ({searchText}) => {
  const axiosSecure = useAxiosSecure();
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["clubs", searchText],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/events?searchText=${searchText || ""}`
      );
      return result.data;
    },
  });
  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {events.map((event) => (
        <EventCard key={event._id} event={event}></EventCard>
      ))}
    </div>
  );
};

export default EventCardContainer;
