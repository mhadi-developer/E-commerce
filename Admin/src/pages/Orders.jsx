import React from 'react'
import { useFetch } from "../customHooks/useFetch.js"
import moment from "moment";

const Orders = () => {

    const { data, error, loading } = useFetch(
      `${import.meta.env.VITE_API_URL}/orders`,
    );
    
    console.log("all orders from db backend", data);
  

    
data?.orders?.map((order, index) => {
    
    console.log(order?.customer?.name);
    
});


    
  return (
    <div>
      <div class="container-fluid pt-4 px-4">
        <div class="row g-4">
          <div class="col-12">
            <div class="bg-secondary rounded h-100 p-4 ">
              <h6 class="mb-4 text-primary">Orders Record</h6>
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col" className="text-success">
                        #
                      </th>
                      <th scope="col" className="text-success">
                        Customer Name
                      </th>
                      <th scope="col" className="text-success">
                        Email
                      </th>
                      <th Scope="col" className="text-success">
                        Amount Status
                      </th>
                      <th scope="col" className="text-success">
                        Order Status
                      </th>
                      <th scope="col" className="text-success">
                        Order Created at
                      </th>
                      <th scope="col" className="text-success">
                        Total Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.orders &&
                      data?.orders?.map((order, index) => (
                        <tr>
                          <th scope="row" className="text-primary">
                            {index + 1}
                          </th>
                          <td className="text-white">
                            {order?.customer?.name}
                          </td>
                          <td className="text-white">
                            {order?.customer?.email}
                          </td>
                          <td className="text-white">{order?.paymentStatus}</td>
                          <td className="text-white">{order?.orderStatus}</td>
                          <td className="text-white">
                            {moment(order?.createdAt)
                              .local()
                              .format("MMMM Do YYYY, h:mm A")}
                          </td>
                          <td className="text-white">
                            {order?.totalAmount}-/PKR
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Orders;