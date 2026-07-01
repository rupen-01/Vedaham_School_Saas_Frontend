import React from "react";
import Card from "../../../../components/common/Card";


const EventSidebar = ({ events, onEventClick }) => {
  return (
    <Card className="h-[100%]" >
      <h4 className="text-md font-semibold border-b pb-2 mb-2">Upcoming Events</h4>
      <div className="flex flex-col gap-3">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => onEventClick(event)}
            className="p-2 border rounded-md cursor-pointer hover:bg-gray-100"
          >
            <p className="text-xs text-gray-400">
              {new Date(event.date).toDateString()}
            </p>
            <p className="font-semibold text-sm">{event.name}</p>
            <p className="text-xs text-gray-500">{event.description}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default EventSidebar;
