import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { formatDate } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/AdminHeader";
import { tokens } from "../../theme";
import Auth from "../../helpers/Auth";
import Api from "../../helpers/Api";

const Calendar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // to prevent other userfront non admin logged in in admin
  if (!Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn("/login");
  }

  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

  const [eventListings, setEventListings] = useState([]);

  // get allanimallisting from java restful backend
  useEffect(() => {
    Api.getAllEventListingsAdmin()
      .then((data) => data.json())
      .then((data) => setEventListings(data));
  }, []);

  // map members data to compatible data format for datagrid below
  // var tempActualEventListings = [];
  // eventListings &&
  // eventListings.map((data) => {
  //     const eventListing = {
  //       id: data.eventListingId,
  //       name: data.eventName,
  //       date: data.dateAndTime,
  //       location: data.location,
  //       capacity: data.capacity,
  //       description: data.description,
  //       eventType: data.eventType,
  //     };
  //     tempActualEventListings.push(eventListing);
  //   });


  
  var tempActualEventListings = [];
  eventListings &&
    eventListings.map((data) => {
      const eventListing = {
        id: data.eventListingId,
        title: data.eventName.toString(),
        date: data.dateAndTime.toString().substring(0,10),
      };
      tempActualEventListings.push(eventListing);
    });


  const [currentEvents, setCurrentEvents] = useState([]);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    if (title) {
      calendarApi.addEvent({
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      });
    }
  };

  const handlleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      selected.event.remove();
    }
  };
  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />
      {/* <p>
        {tempActualEventListings.length > 0
          ? tempActualEventListings[tempActualEventListings.length - 1].date
          : "No events"}
      </p> */}

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents.map((event) => (
              <ListItem
                key={event.id}
                sx={{
                  backgroundColor: colors.greenAccent[500],
                  margin: "10px 0",
                  borderRadius: "2px",
                }}
              >
                <ListItemText
                  primary={event.title}
                  secondary={
                    <Typography>
                      {formatDate(event.start, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {/* CALENDAR */}

        <Box flex="1 1 100%" ml="15px">
          {/* <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editiable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvent={true}
            select={handleDateClick}
            eventClick={handlleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={
              tempActualEventListings
            }
          /> */}
          {tempActualEventListings.length > 0 ? (
            <FullCalendar
              height="75vh"
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
              ]}
              headerToolbar={{
                left: "prev,next,today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvent={true}
              select={handleDateClick}
              eventClick={handlleEventClick}
              eventsSet={(events) => setCurrentEvents(events)}
              initialEvents={tempActualEventListings}
            />
          ) : (
            <>
            {/* <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next,today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="dayGridMonth"
            editiable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvent={true}
            select={handleDateClick}
            eventClick={handlleEventClick}
            eventsSet={(events) => setCurrentEvents(events)}
            initialEvents={
              tempActualEventListings
            }
          /> */}
            </> // Or any other empty element, e.g. <div />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
