// import {
//   Box,
//   // Breadcrumb,
//   // BreadcrumbItem,
//   // BreadcrumbLink,
//   Heading,
// } from "@chakra-ui/react";
// import TableComponent from "../../components/Table/TableComponent";

// import { useEffect, useState } from "react";

import EmployeesTable from "../../components/EmployeesTable/EmployeesTable";
import { useGetEmployeesQuery } from "../../services/appApi";

function Employees() {
  const { currentData, isLoading } = useGetEmployeesQuery();

  // const [dataEmployee, setDataEmployee] = useState(null);

  // useEffect(() => {
  //   if (!isFetching) {
  //     setDataEmployee(employeeLists?.data);
  //   }
  // }, [employeeLists, isFetching]);

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <EmployeesTable data={currentData} isLoading={isLoading} />
    </div>
  );
}

export default Employees;
