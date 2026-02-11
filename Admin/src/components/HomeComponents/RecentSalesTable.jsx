import React from "react";

const recentSalesData = [
  {
    date: "01 Jan 2045",
    invoice: "INV-0123",
    customer: "Jhon Doe",
    amount: "$123",
    status: "Paid",
  },
  {
    date: "02 Jan 2045",
    invoice: "INV-0124",
    customer: "Jane Smith",
    amount: "$200",
    status: "Pending",
  },
  {
    date: "03 Jan 2045",
    invoice: "INV-0125",
    customer: "Alice Johnson",
    amount: "$150",
    status: "Paid",
  },
  {
    date: "04 Jan 2045",
    invoice: "INV-0126",
    customer: "Bob Brown",
    amount: "$180",
    status: "Paid",
  },
  {
    date: "05 Jan 2045",
    invoice: "INV-0127",
    customer: "Charlie Davis",
    amount: "$220",
    status: "Pending",
  },
];

const RecentSalesTable = () => {
  return (
    <div className="container-fluid pt-4 px-4">
      <div className="bg-secondary text-center rounded p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h6 className="mb-0">Recent Sales</h6>
          <a href="#">Show All</a>
        </div>
        <div className="table-responsive">
          <table className="table text-start align-middle table-bordered table-hover mb-0">
            <thead>
              <tr className="text-white">
                <th scope="col">
                  <input className="form-check-input" type="checkbox" />
                </th>
                <th scope="col">Date</th>
                <th scope="col">Invoice</th>
                <th scope="col">Customer</th>
                <th scope="col">Amount</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentSalesData.map((sale, index) => (
                <tr key={index}>
                  <td>
                    <input className="form-check-input" type="checkbox" />
                  </td>
                  <td>{sale.date}</td>
                  <td>{sale.invoice}</td>
                  <td>{sale.customer}</td>
                  <td>{sale.amount}</td>
                  <td>{sale.status}</td>
                  <td>
                    <a className="btn btn-sm btn-primary" href="#">
                      Detail
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentSalesTable;
