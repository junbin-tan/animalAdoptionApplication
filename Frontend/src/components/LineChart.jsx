import { ResponsiveLine } from "@nivo/line";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockLineData as data } from "../assets/data/mockData";
// importing data should change later
import Auth from "../helpers/Auth";
import Api from "../helpers/Api";
import React, { useState, useEffect } from "react";

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [members, setMembers] = useState([]);

  // get members from java restful backend
  useEffect(() => {
    Api.getAllMembers()
      .then((data) => data.json())
      .then((data) => setMembers(data));
  }, []);

  // map members data to compatible data format for datagrid below
  var tempActualMembers = [];
  members &&
    members.map((data) => {
      const member = {
        id: data.memberId,
        data: [
          {
            x: data.createDate,
            y: data.memberId,
          },
        ],
      };
      tempActualMembers.push(member);
    });

  // var tempDateMember = [];
  // var id = 1;
  // tempActualMembers.forEach((member) => {
  //   const createDate = member.data[0].x;
  //   const matchingMember = tempDateMember.find(
  //     (m) => m.data[0].x === createDate
  //   );
  //   if (matchingMember) {
  //     matchingMember.data[0].y++;
  //   } else {
  //     tempDateMember.push({
  //       id: id++,
  //       data: [
  //         {
  //           x: createDate,
  //           y: 1,
  //         },
  //       ],
  //     });
  //   }
  // });

  var tempDateMember = {
    id: "Singapore",
    data: [],
  };
  
  tempActualMembers.forEach((member) => {
    const createDate = member.data[0].x;
    const matchingMember = tempDateMember.data.find((m) => m.x === createDate);
    if (matchingMember) {
      matchingMember.y += 1;
    } else {
      tempDateMember.data.push({
        x: createDate,
        y: 1,
      });
    }
  });
  
  tempDateMember.data = tempDateMember.data.map((d) => ({
    x: d.x,
    y: d.y,
  }));

  var ff = [];
  ff.push(tempDateMember);

  return (
    <ResponsiveLine
      data={ff}
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
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      // can just remove  thee colors line if needed cause might not want to manually add colors for all our data
      // colors={isDashboard ? { datum: "color" } : { scheme: "color" }}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="linear"
      axisTop={null}
      axisRight={null}
      axisBottom={isDashboard ? null : {
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "SignUp Date",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickValues: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Count",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
