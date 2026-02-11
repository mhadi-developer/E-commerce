import React from 'react'
import DashboardStats from '../components/HomeComponents/DasbordStates'
import ChartSection from '../components/HomeComponents/ChartSection'
import RecentSalesTable from '../components/HomeComponents/RecentSalesTable'
import DashboardWidgets from '../components/HomeComponents/DashboardWidgets'

const Home = () => {
  return (
      <div>
      <DashboardStats />
      <ChartSection />
      <RecentSalesTable />
      <DashboardWidgets />
    </div>
  )
}

export default Home