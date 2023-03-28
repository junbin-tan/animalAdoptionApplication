import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../assets/data/mockData";
import Auth from "../helpers/Auth";
import Api from "../helpers/Api";
import React, { useState, useEffect } from "react";


const BarChart = ({ isDashboard = false }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [animalListings, setAnimalListings] = useState([]);

  // get allanimallisting from java restful backend
    useEffect(() => {
    Api.getAllAnimalListings()
      .then((data) => data.json())
      .then((data) => setAnimalListings(data));
    }, []);

  // map members data to compatible data format for datagrid below
  var tempActualAnimalListings= [];
  animalListings &&
    animalListings.map((data) => {
      const animalListing = {
        id: data.animalListingId,
        animalType: data.animalType,
        isActive: data.isActive,
        isNeutered: data.isNeutered,
        isAdoption: data.isAdoption,
        isFostering: data.isFostering,
      };
      tempActualAnimalListings.push(animalListing);
    });

    const tempFinalAnimalList = [
        {
          Type: "isFostering",
          Dog: tempActualAnimalListings.filter(item => item.animalType === "DOG" && item.isFostering === true).length,
          Cat: tempActualAnimalListings.filter(item => item.animalType === "CAT" && item.isFostering === true).length,
          Hamster: tempActualAnimalListings.filter(item => item.animalType === "HAMSTER" && item.isFostering === true).length,
          Rabbit: tempActualAnimalListings.filter(item => item.animalType === "RABBIT" && item.isFostering === true).length,
          Others: tempActualAnimalListings.filter(item => item.animalType === "OTHERS" && item.isFostering === true).length,
        },
        {
          Type: "isAdoption",
          Dog: tempActualAnimalListings.filter(item => item.animalType === "DOG" && item.isAdoption === true).length,
          Cat: tempActualAnimalListings.filter(item => item.animalType === "CAT" && item.isAdoption === true).length,
          Hamster: tempActualAnimalListings.filter(item => item.animalType === "HAMSTER" && item.isAdoption === true).length,
          Rabbit: tempActualAnimalListings.filter(item => item.animalType === "RABBIT" && item.isAdoption === true).length,
          Others: tempActualAnimalListings.filter(item => item.animalType === "OTHERS" && item.isAdoption === true).length,
        },
      ];


    return ( <ResponsiveBar
        data={tempFinalAnimalList}
        theme= {{
            axis: {
                domain: {
                    line: {
                        stroke: colors.grey[100]
                    }
                },
                legend: {
                    text: {
                        fill: colors.grey[100]
                    }
                },
                ticks: {
                    line:{
                        stroke: colors.grey[100],
                        strokeWidth: 1
                    },
                    text: {
                        fill: colors.grey[100]
                    }
                }
            },
            legends: {
                text:{
                    fill:colors.grey[100]
                }
            }
        }}
        keys={[
            'Dog',
            'Cat',
            'Hamster',
            'Rabbit',
            'Others',
        ]}
        indexBy="Type"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        // fill={[
        //     {
        //         match: {
        //             id: 'fries'
        //         },
        //         id: 'dots'
        //     },
        //     {
        //         match: {
        //             id: 'sandwich'
        //         },
        //         id: 'lines'
        //     }
        // ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            // remove if else to check if it is in dashboard
            legend: isDashboard ? undefined :'Types',
            legendPosition: 'middle',
            legendOffset: 32
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend:  isDashboard ? undefined : 'Number of Listings',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in type: "+e.indexValue}}
    />)
}

export default BarChart;