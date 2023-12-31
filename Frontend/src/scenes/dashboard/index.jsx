import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import Header from "../../components/AdminHeader";
import { tokens } from "../../theme";
import { mockTransactions } from "../../assets/data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PetsIcon from '@mui/icons-material/Pets';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { fontWeight } from "@mui/system";
import { Email } from "@mui/icons-material";
import Auth from "../../helpers/Auth";
import React, { useState, useEffect } from "react";
import Api from "../../helpers/Api";
import moment from "moment-timezone";
import MemberPie from "../../components/MemberVerifiedPie";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // to prevent other userfront non admin logged in in admin
  if (!Auth.isAdmin(Auth.getUser())) {
    Auth.redirectIfLoggedIn("/login");
  }
  // redirect admin to login page if he/she is not logged in
  Auth.redirectIfLoggedOut("/login");

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
        name: data.name,
        phone: data.phoneNumber,
        email: data.email,
        date: data.createDate,
        access: "user",
      };
      tempActualMembers.push(member);
    });

  const [donations, setDonations] = useState([]);

  useEffect(() => {
    Api.getAllTestimonialdmin()
      .then((data) => data.json())
      .then((data) => setDonations(data));
  }, []);

  // map members data to compatible data format for datagrid below
  var tempActualDonations = [];
  donations &&
    donations.map((data) => {
      const donation = {
        id: data.donationId,
        name: data.name,
        email: data.email,
        date: moment(data.date, "YYYY-MM-DDTHH:mm:ss.SSSZ")
          .tz("Asia/Shanghai")
          .format("MMMM Do YYYY"),
        paymentMode: data.paymentMode,
        donationType: data.donationType,
      };
      tempActualDonations.push(donation);
    });

  const [animalListings, setAnimalListings] = useState([]);

  // get allanimallisting from java restful backend
  useEffect(() => {
    Api.getAllAnimalListings()
      .then((data) => data.json())
      .then((data) => setAnimalListings(data));
  }, []);

  // map members data to compatible data format for datagrid below
  var tempActualAnimalListings = [];
  animalListings &&
    animalListings.map((data) => {
      const animalListing = {
        id: data.animalListingId,
        date: data.createDate,
        flatFee: data.flatFee,
        description: data.description,
        age: data.age,
        name: data.name,
        gender: data.gender,
        breed: data.breed,
        weight: data.weight,
        animalType: data.animalType,
        isActive: data.isActive,
        isNeutered: data.isNeutered,
        isAdoption: data.isAdoption,
        isFostering: data.isFostering,
        fosterStartDate: moment(
          data.fosterStartDate,
          "YYYY-MM-DDTHH:mm:ss.SSSZ"
        )
          .tz("Asia/Shanghai")
          .format("MMMM Do YYYY HH:MM"),
        fosterEndDate: moment(data.fosterEndDate, "YYYY-MM-DDTHH:mm:ss.SSSZ")
          .tz("Asia/Shanghai")
          .format("MMMM Do YYYY HH:MM"),
      };
      tempActualAnimalListings.push(animalListing);
    });

  const [eventListings, setEventListings] = useState([]);

  useEffect(() => {
    Api.getAllEventListingsAdmin()
      .then((data) => data.json())
      .then((data) => setEventListings(data));
  }, []);

  //map members data to compatible data format for datagrid below
  var tempActualEventListings = [];
  eventListings &&
    eventListings.map((data) => {
      const eventListing = {
        id: data.eventListingId,
        name: data.eventName,
        date: moment(data.dateAndTime, "YYYY-MM-DDTHH:mm:ss.SSSZ")
          .tz("Asia/Shanghai")
          .format("MMMM Do YYYY"),
        location: data.location,
        capacity: data.capacity,
        description: data.description,
        eventType: data.eventType,
        dateCreate:  moment(data.createDate, "YYYY-MM-DDTHH:mm:ss.SSSZ")
        .tz("Asia/Shanghai")
        .format("MMMM Do YYYY"),
      };
      tempActualEventListings.push(eventListing);
    });

  // event 

  const countEventString = tempActualEventListings.length;

  const today = moment().tz("Asia/Shanghai").format("MMMM Do YYYY");

  const todayEvent = tempActualEventListings.filter((event) => {
    const eventDate = event.dateCreate;
    const updatedToday = moment(event.updatedAt, "YYYY-MM-DDTHH:mm:ss.SSSZ")
      .tz("Asia/Shanghai")
      .isSame(moment(), "day");
    return eventDate === today || updatedToday;
  });

  const countEventToday = todayEvent.length;



  //member
  const countMemberString = tempActualMembers.length;


  const todayMembers = tempActualMembers.filter((member) => {
    const memberDate = moment(member.date, "YYYY-MM-DDTHH:mm:ss.SSSZ")
      .tz("Asia/Shanghai")
      .format("MMMM Do YYYY");
    const updatedToday = moment(member.updatedAt, "YYYY-MM-DDTHH:mm:ss.SSSZ")
      .tz("Asia/Shanghai")
      .isSame(moment(), "day");
    return memberDate === today || updatedToday;
  });

  const countTodayMembers = todayMembers.length;

  // donation
  const countDonationString = tempActualDonations.length;

  const todaysDonations = tempActualDonations.filter((donation) => {
    const donationDate = donation.date;
    const updatedToday = moment(donation.updatedAt, "YYYY-MM-DDTHH:mm:ss.SSSZ")
      .tz("Asia/Shanghai")
      .isSame(moment(), "day");
    return donationDate === today || updatedToday;
  });

  const countTodayDonations = todaysDonations.length;

  //animalListing
  const countAnimalString = tempActualAnimalListings.length;

  const todaysAnimals = tempActualAnimalListings.filter((animalListing) => {
    const animalDate = moment(animalListing.date, "YYYY-MM-DDTHH:mm:ss.SSSZ").tz("Asia/Shanghai")
    .format("MMMM Do YYYY");
    const updatedToday = moment(animalListing.updatedAt, "YYYY-MM-DDTHH:mm:ss.SSSZ")
      .tz("Asia/Shanghai")
      .isSame(moment(), "day");
    return animalDate === today || updatedToday;
  });

  const countTodayAnimal = todaysAnimals.length;


  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to Dashboard" />

        <Box>
          {/* <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: " bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button> */}
        </Box>
      </Box>

      {/* Grids and CHarts */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12,1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* Row 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countTodayMembers}
            subtitle="New Members"
            progress={countTodayMembers / countMemberString}
            increase={`+${Math.round(
              (countTodayMembers / countMemberString) * 100
            )}%`}
            icon={
              <PersonAddAltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={countTodayDonations}
            subtitle="New Donations"
            progress={countTodayDonations / countDonationString}
            increase={`+${Math.round(
              (countTodayDonations / countDonationString) * 100
            )}%`}
            icon={
              <VolunteerActivismIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title= {countTodayAnimal}
            subtitle="New Animal Listings"
            progress={countTodayAnimal / countAnimalString}
            increase={`+${Math.round(
              (countTodayAnimal / countAnimalString) * 100
            )}%`}
            icon={
              <PetsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title= {countEventToday}
            subtitle="New Event Listings"
            progress={countEventToday/countEventString}
            increase={`+${Math.round(
              (countEventToday / countEventString) * 100
            )}%`}
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* Row 2 */}
        <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                User Sign Up Rate
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {countMemberString}
              </Typography>
            </Box>
            <Box>
              {/* <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton> */}
            </Box>
          </Box>

          <Box height="250px" mt="-20px">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        {/* Transactions */}
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
              Recent Donations
            </Typography>
          </Box>
          {tempActualDonations.map((transaction, i) => (
            <Box
              key={`${transaction.donationId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.greenAccent[500]}
                >
                  {transaction.donationId}
                </Typography>
                <Typography
                  style={{ fontSize: "16px" }}
                  color={colors.grey[100]}
                >
                  {transaction.name}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[400]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.donationType}
              </Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                {transaction.paymentMode}
              </Box>
            </Box>
          ))}
        </Box>
        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Event Type
          </Typography>
          <Box height="250px" mt="-20px">
            <PieChart isDashboard={true} />
          </Box>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ p: "30px 30px 0 30px" }}
          >
            Animal Listings
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>

        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600" sx={{ mb:"15px"}}
          >
            Geography Based Traffic
          </Typography>
          <Box
            height = "200px"
          >
           <GeographyChart isDashboard={true}/>
          </Box>
        </Box> */}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Member Type
          </Typography>
          <Box height="250px" mt="-20px">
            <MemberPie isDashboard={true} />
          </Box>
        </Box>

        {/* done */}
      </Box>
    </Box>
  );
};

export default Dashboard;
