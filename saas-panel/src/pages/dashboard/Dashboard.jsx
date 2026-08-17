import React from 'react';
import WelcomeCard from '../../components/dashboard/WelcomeCard';
import RevenueLineGraph from '../../components/dashboard/RevenueLineGraph';
import UpcomingRenewals from '../../components/dashboard/UpcomingRenewals';
import PlanPieChart from '../../components/dashboard/PlanPieChart';
import NewSchoolsBarGraph from '../../components/dashboard/NewSchoolsBarGraph';
import ActionCenter from '../../components/dashboard/ActionCenter';
import ActiveUsersList from '../../components/dashboard/ActiveUsersList';
import TopInstitutionsTable from '../../components/dashboard/TopInstitutionsTable';
import StatCardsGrid from '../../components/dashboard/StatCard';
import { useGetApi } from '../../utils/useApi';
import ApiConfig from '../../config/ApiConfig';

const Dashboard = () => {
  // Fetch dashboard stats from backend using the project's standard React Query hook
  const { data: dashboardData, isLoading, isError, error, refetch } = useGetApi({
    key: "dashboardStats",
    url: ApiConfig.DASHBOARD_STATS,
    requireAuth: true,
  });

  // Backend response shape: { statusCode: 200, data: { stats, planDistribution, ... }, message, success }
  const apiData = dashboardData?.data || null;

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    const status = error?.response?.status;
    let errorMessage = 'Something went wrong while loading the dashboard.';
    if (status === 401) errorMessage = 'Your session has expired. Please log in again.';
    else if (status === 403) errorMessage = 'You do not have permission to view this dashboard.';
    else if (status === 404) errorMessage = 'Dashboard data endpoint not found.';
    else if (status >= 500) errorMessage = 'Server error. Please try again later.';

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white rounded-2xl shadow-sm p-8 max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Failed to Load Dashboard</h2>
          <p className="text-sm text-gray-500 mb-4">{errorMessage}</p>
          <button
            onClick={() => refetch()}
            className="bg-purple-600 text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-purple-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="w-full py-5">
        <div className="grid grid-cols-1 md:grid-cols-6 xl:grid-cols-12 gap-4 xl:gap-6">
          {/* Row 1: WelcomeCard */}
          <div className="col-span-1 md:col-span-6 xl:col-span-12">
            <WelcomeCard />
          </div>
          {/* Row 2: StatCards */}
          <StatCardsGrid stats={apiData?.stats} />
          {/* Row 3: RevenueLineGraph & PlanPieChart */}
          <div className="col-span-1 md:col-span-6 xl:col-span-8 flex">
            <RevenueLineGraph data={apiData?.revenueTrend} />
          </div>
          <div className="col-span-1 md:col-span-6 xl:col-span-4 flex">
            <PlanPieChart data={apiData?.planDistribution} />
          </div>
          {/* Row 4: NewSchoolsBarGraph & UpcomingRenewals */}
          <div className="col-span-1 md:col-span-3 xl:col-span-6 flex">
            <NewSchoolsBarGraph data={apiData?.newSchoolsTrend} />
          </div>
          <div className="col-span-1 md:col-span-3 xl:col-span-6 flex">
            <UpcomingRenewals data={apiData?.upcomingRenewals} />
          </div>
          {/* Row 5: ActionCenter & ActiveUsersList */}
          <div className="col-span-1 md:col-span-3 xl:col-span-6 flex">
            <ActionCenter />
          </div>
          <div className="col-span-1 md:col-span-3 xl:col-span-6 flex">
            <ActiveUsersList data={apiData?.activeUsers} />
          </div>
          {/* Row 6: TopInstitutionsTable */}
          <div className="col-span-1 md:col-span-6 xl:col-span-12">
            <TopInstitutionsTable data={apiData?.topInstitutions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;