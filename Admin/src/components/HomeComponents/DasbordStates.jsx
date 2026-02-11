import React from "react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Today Sale",
      value: "$1234",
      icon: "fa-chart-line",
    },
    {
      title: "Total Sale",
      value: "$1234",
      icon: "fa-chart-bar",
    },
    {
      title: "Today Revenue",
      value: "$1234",
      icon: "fa-chart-area",
    },
    {
      title: "Total Revenue",
      value: "$1234",
      icon: "fa-chart-pie",
    },
  ];

  return (
    <div className="container-fluid pt-4 px-4">
      <div className="row g-4">
        {stats.map((item, index) => (
          <div key={index} className="col-sm-6 col-xl-3">
            <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
              <i className={`fa ${item.icon} fa-3x text-primary`}></i>
              <div className="ms-3">
                <p className="mb-2">{item.title}</p>
                <h6 className="mb-0">{item.value}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardStats;
