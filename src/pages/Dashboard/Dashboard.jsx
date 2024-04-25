import React, { useEffect, useState } from "react";
import {
  useGetPatientsQuery,
  useGetEmployeesQuery,
} from "../../services/appApi";
import Chart from "react-apexcharts";
import { isEmpty } from "lodash";

function Dashboard() {
  const { currentData } = useGetPatientsQuery();
  const { currentData: employeeData } = useGetEmployeesQuery();

  const [newData, setNewData] = useState(null);

  // useEffect(() => {
  //   const labels = [
  //     "Total Employees",
  //     "Total Doctors",
  //     "Total Nurse",
  //     "Total Patients",
  //   ];
  //   const filteredNurse =
  //     !isEmpty(employeeData?.data) &&
  //     employeeData?.data?.filter((x) => x.role === "Nurse")?.length;
  //   const filteredDoctors =
  //     !isEmpty(employeeData?.data) &&
  //     employeeData?.data?.filter((x) => x.role === "Doctors")?.length;
  //   setNewData();
  // }, [employeeData, currentData]);

  const series = [
    employeeData?.data?.length,
    employeeData?.data?.filter((x) => x.role === "Doctor")?.length,
    employeeData?.data?.filter((x) => x.role === "Nurse")?.length,
    currentData?.length,
  ];

  console.log('doctors', employeeData?.data?.filter((x) => x.role === "Doctor")?.length)
  const labels = [
    "Total Employees",
    "Total Doctors",
    "Total Nurse",
    "Total Patients",
  ];

  const options = {
    charts: {
      type: "donut",
    },
    labels,
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6 rounded-lg bg-white p-4 shadow-md h-auto">
        <div className="donut">
          <Chart
            options={options}
            series={series}
            type="donut"
            width={"100%"}
            height={500}
          />
        </div>
      </div>
      {/* <div className="col-span-4 rounded-lg bg-white p-4 shadow-md h-auto">Total Doctors</div>
      <div className="col-span-4 rounded-lg bg-white p-4 shadow-md h-auto">Total Patients</div> */}
    </div>
  );
}

export default Dashboard;
