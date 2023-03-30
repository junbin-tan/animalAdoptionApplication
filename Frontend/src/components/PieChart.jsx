import { ResponsivePie } from "@nivo/pie";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPieData as data } from "../assets/data/mockData";
import Api from "../helpers/Api";
import React, { useState, useEffect } from "react";

const PieChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [eventListings, setEventListings] = useState([]);
  // get allanimallisting from java restful backend
  useEffect(() => {
    Api.getAllEventListingsAdmin()
      .then((data) => data.json())
      .then((data) => setEventListings(data));
  }, []);

  //   map members data to compatible data format for datagrid below
  var tempActualEventListings = [];
  eventListings &&
    eventListings.map((data) => {
      const eventListing = {
        id: data.eventListingId,
        name: data.eventName,
        date: data.dateAndTime,
        location: data.location,
        capacity: data.capacity,
        description: data.description,
        eventType: data.eventType,
      };
      tempActualEventListings.push(eventListing);
    });

  const finalEventList = tempActualEventListings.reduce((acc, cur) => {
    const eventType = cur.eventType;
    const eventIndex = acc.findIndex((event) => event.id === eventType);
    if (eventIndex !== -1) {
      acc[eventIndex].value++;
    } else {
      acc.push({ id: eventType, value: 1 });
    }
    return acc;
  }, []);

  return (
    <ResponsivePie
      data={finalEventList}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
      }}
      margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: "color",
        modifiers: [["darker", 0.2]],
      }}
      enableArcLinkLabels={isDashboard ? false : true}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor={colors.greenAccent[100]}
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color" }}
      arcLabelsSkipAngle={10}
      enableArcLabels={ isDashboard ? false : true }
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "rgba(255, 255, 255, 0.3)",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      // fill={[
      //     {
      //         match: {
      //             id: 'ruby'
      //         },
      //         id: 'dots'
      //     },
      //     {
      //         match: {
      //             id: 'c'
      //         },
      //         id: 'dots'
      //     },
      //     {
      //         match: {
      //             id: 'go'
      //         },
      //         id: 'dots'
      //     },
      //     {
      //         match: {
      //             id: 'python'
      //         },
      //         id: 'dots'
      //     },
      //     {
      //         match: {
      //             id: 'scala'
      //         },
      //         id: 'lines'
      //     },
      //     {
      //         match: {
      //             id: 'lisp'
      //         },
      //         id: 'lines'
      //     },
      //     {
      //         match: {
      //             id: 'elixir'
      //         },
      //         id: 'lines'
      //     },
      //     {
      //         match: {
      //             id: 'javascript'
      //         },
      //         id: 'lines'
      //     }
      // ]}
      legends={[
        {
          anchor: "bottom",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: 56,
          itemsSpacing: 0,
          itemWidth: 100,
          itemHeight: 18,
          itemTextColor: "#999",
          itemDirection: "left-to-right",
          itemOpacity: 1,
          symbolSize: 18,
          symbolShape: "circle",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
              },
            },
          ],
        },
      ]}
    />
  );
};

export default PieChart;
