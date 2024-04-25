import { Navigate, Outlet, useLocation } from "react-router-dom";
import SideBar from "../Sidebar/Sidebar";
import { useState } from "react";
import MenuBarMobile from "../MenuBarMobile/MenuBarMobile";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Breadcrumb } from "antd";
import logoImg from '../../assets/logo.png'

export const ProtectedLayout = ({ children }) => {
  const token = localStorage.getItem("token");
  const router = useLocation();

  // Mobile sidebar visibility state
  const [showSidebar, setShowSidebar] = useState(false);

  if (!token) {
    // user is not authenticated
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen w-full flex-row justify-between border-e bg-white">
      <MenuBarMobile setter={setShowSidebar} />
      <SideBar show={showSidebar} setter={setShowSidebar} />
      <div className="px-4 py-6 w-full bg-gray-200">
        {/* <Tabs>
<TabList>
  <Tab>One</Tab>
  <Tab>Two</Tab>
  <Tab>Three</Tab>
</TabList>

<TabPanels>
  <TabPanel>
    <p>one!</p>
  </TabPanel>
  <TabPanel>
    <p>two!</p>
  </TabPanel>
  <TabPanel>
    <p>three!</p>
  </TabPanel>
</TabPanels>
</Tabs> */}

        <Breadcrumb
          style={{ fontSize: "8px" }}
          items={[
            {
              title: "Home",
            },
            {
              title:
                router.pathname == "/evaluation"
                  ? "Evaluation"
                  : router.pathname == "/implementation"
                  ? "Implementation"
                  : router.pathname == "/planning"
                  ? "Planning"
                  : router.pathname == "/diagnosis"
                  ? "Diagnosis"
                  : router.pathname == "/assessments"
                  ? "Assessment"
                  : router.pathname == "/patient-profile"
                  ? "Patient Profile"
                  : router.pathname == "/"
                  ? "Dashboard"
                  : router.pathname == "/employees"
                  ? "Employees"
                  : router.pathname == "/patients"
                  ? "Patients"
                  : "",
            },
          ]}
        />

        <div className="text-6xl font-black flex gap-4 items-center" style={{ color: '#345673' }}>
        <img src={logoImg} width={50} height={'auto'} />
        APEX MEDICAL CENTER
          </div>

        <div className="mt-5">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-2xl pb-2">
            {router.pathname == "/evaluation"
              ? "Evaluation"
              : router.pathname == "/implementation"
              ? "Implementation"
              : router.pathname == "/planning"
              ? "Planning"
              : router.pathname == "/diagnosis"
              ? "Diagnosis"
              : router.pathname == "/assessments"
              ? "Assessment"
              : router.pathname == "/patient-profile"
              ? "Patient Profile"
              : router.pathname == "/"
              ? "Dashboard"
              : router.pathname == "/employees"
              ? "Employee"
              : router.pathname == "/patients"
              ? "Patients"
              : ""}
          </h1>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <Outlet />
        </div>
      </div>
      {/* <SideBar />
<div className="px-4 py-6 w-5/6 bg-gray-400">
  <Outlet />
</div> */}
    </div>
  );
};
