import React from 'react';
import WelcomeCard from '../../components/dashboard/WelcomeCard';
import StatCard from '../../components/dashboard/StatCard';
import RevenueLineGraph from '../../components/dashboard/RevenueLineGraph';
import UpcomingRenewals from '../../components/dashboard/UpcomingRenewals';
import PlanPieChart from '../../components/dashboard/PlanPieChart';
import NewSchoolsBarGraph from '../../components/dashboard/NewSchoolsBarGraph';
import ActionCenter from '../../components/dashboard/ActionCenter';
import ActiveUsersList from '../../components/dashboard/ActiveUsersList';
import TopInstitutionsTable from '../../components/dashboard/TopInstitutionsTable';
import { FaSchool, FaUserGraduate, FaUserCheck, FaUserTie } from "react-icons/fa";
import StatCardsGrid from '../../components/dashboard/StatCard';
import useApiRequest from '../../utils/useApiRequest';
import { useEffect } from 'react';

const Dashboard = () => {
  console.log(import.meta.env.VITE_API_URL);

 const { data, loading, error, status, request } = useApiRequest();

//  useEffect(() => {
//     const sendData = async () => {
//       await request(
//         "POST",
//         "https://jsonplaceholder.typicode.com/posts",
//         {
//           title: "hhh",
//           body: "bar",
//           userId: 1,
//         }
//       );
//     };

//     sendData();
//   }, []);
//     console.log("Loading POST:", loading);
//   console.log("Error POST:", error);
//   console.log("Data POST:", data);
//   console.log("Status POST:", status);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await request("GET", "https://jsonplaceholder.typicode.com/posts");
  //   };

  //   fetchData();
  // }, []);
  //     console.log("Loading GET:", loading);
  // console.log("Error GET:", error);
  // console.log("Data GET:", data);
  // console.log("Status GET:", status);

  // useEffect(() => {
  //   const deleteData = async () => {
  //     await request("DELETE", "https://jsonplaceholder.typicode.com/posts/1");
  //   };

  //   deleteData();
  // }, []);

  // console.log("Loading DELETE:", loading);
  // console.log("Error DELETE:", error);
  // console.log("Data DELETE:", data);
  // console.log("Status DELETE:", status);

  //  useEffect(() => {
  //   const updateData = async () => {
  //     await request(
  //       "PATCH",
  //       "https://jsonplaceholder.typicode.com/posts/1",
  //       {
  //         title: "Updated Title Only", // partial update
  //       }
  //     );
  //   };

  //   updateData();
  // }, []);

  // console.log("Loading PATCH:", loading);
  // console.log("Error PATCH:", error);
  // console.log("Data PATCH:", data);
  // console.log("Status PATCH:", status);

  return(
     <div className="min-h-screen">
    <div className="w-full py-5">
      <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-4 xl:gap-6">
        {/* Row 1: WelcomeCard */}
        <div className="col-span-1 md:col-span-6 xl:col-span-12">
          <WelcomeCard />
        </div>
        {/* Row 2: StatCards */}
        <StatCardsGrid />
        {/* Row 3: RevenueLineGraph & PlanPieChart */}
        <div className="col-span-1 md:col-span-6 xl:col-span-8 flex">
          <RevenueLineGraph />
        </div>
        <div className="col-span-1 md:col-span-6 xl:col-span-4 flex">
          <PlanPieChart />
        </div>
        {/* Row 4: NewSchoolsBarGraph & UpcomingRenewals */}
        <div className="col-span-1 md:col-span-3 xl:col-span-6 flex">
          <NewSchoolsBarGraph />
        </div>
        <div className="col-span-1 md:col-span-3 xl:col-span-6 flex">
          <UpcomingRenewals />
        </div>
        {/* Row 5: ActionCenter & ActiveUsersList */}
        <div className="col-span-1 md:col-span-3 xl:col-span-6 flex">
          <ActionCenter />
        </div>
        <div className="col-span-1 md:col-span-3 xl:col-span-6 flex">
          <ActiveUsersList />
        </div>
        {/* Row 6: TopInstitutionsTable */}
        <div className="col-span-1 md:col-span-6 xl:col-span-12">
          <TopInstitutionsTable />
        </div>
      </div>
    </div>
  </div>
  )
};

export default Dashboard; 