import {
    Button,
    Col,
    DatePicker,
    Divider,
    Flex,
    Row,
    Space,
    Table,
    message,
  } from "antd";
  import { isEmpty } from "lodash";
  import React, { useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  import { HistoryOutlined } from "@ant-design/icons";
  
  function Diagnosis() {
    const location = useLocation();
    const data = location.state?.data;
    const [isClickable, setIsClickable] = useState(false);
    const [newAssessDetailData, setNewAssessDetailData] = useState(null);
    console.log("get diagnosis", data);
  
    const [messageApi, contextHolder] = message.useMessage();
  
    const [newAssessmentData, setNewAssessmentData] = useState(null);
  
    const handleAddRow = () => {
      const newRow = {
        key: (newAssessmentData.length + 1).toString(),
        date: "",
        foodBeverage: "",
      };
      setNewAssessmentData([...newAssessmentData, newRow]);
    };
  
    const columns = [
      {
        title: "Date",
        key: "date",
        width: '20%',
        render: (record) => {
          return (
            <>
              <DatePicker
                required
                showTime
                // onChange={onChangeDatePicker}
                className="rounded-md border border-neutral-400 text-md text-gray-700 shadow-sm p-1 w-full"
              />
            </>
          );
        },
      },
      {
        title: "Food and Beverage intake",
        key: "foodBeverage",
        render: (record) => {
          return (
            <>
              <textarea
                      type="text"
                      // onChange={(e) => setFirstName(e.target.value)}
                      id="FirstName"
                      name="first_name"
                      className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1 h-32"
                      disabled={!isClickable}
                      style={{ background: !isClickable ? "#dadada" : "" }}
                      required
                      onChange={(e) => {
                        setNewPatientData((pre) => {
                          return { ...pre, medHistory: e.target.value };
                        });
                      }}
                    />
            </>
          );
        },
      },
    ];
  
    const success = () => {
      messageApi.open({
        type: "success",
        content: "Diagnosis saved successfully!",
      });
    };
  
    const warning = (props) => {
      messageApi.open({
        type: "warning",
        content: `${!isEmpty(props) ? props : "Please input data"}`,
      });
    };
  
    const getSideData = () => {
      return (
        <div>
          <div>
            <img src="https://fakeimg.pl/240x150?text=Image" />
          </div>
          <div className="font-bold text-xl my-3">{`${data?.firstName} ${data?.lastName}`}</div>
          <div className="grid grid-cols-2 mb-4">
            <div className="text-sm text-gray-700">Gender</div>
            <div className="font-bold">{data?.gender}</div>
          </div>
          <div className="grid grid-cols-2 mb-4">
            <div className="text-sm text-gray-700">Age</div>
            <div className="font-bold">{data?.age}</div>
          </div>
          <div className="grid grid-cols-2 mb-4">
            <div className="text-sm text-gray-700">Height</div>
            <div className="font-bold">{data?.height} /cm</div>
          </div>
          <div className="grid grid-cols-2 mb-4">
            <div className="text-sm text-gray-700">Weight</div>
            <div className="font-bold">{data?.weight} /kg</div>
          </div>
        </div>
      );
    };
  
    const getMainData = () => {
      return (
        <>
          {contextHolder}
          <div className="grid grid-cols-4 mb-10">
            <div>
              <div className="text-gray-700 text-sm">Last Name</div>
              <div className="font-bold">{data?.lastName}</div>
            </div>
            <div>
              <div className="text-gray-700 text-sm">First Name</div>
              <div className="font-bold">{data?.firstName}</div>
            </div>
            <div>
              <div className="text-gray-700 text-sm">Birth Date</div>
              <div className="font-bold">{data?.birthday}</div>
            </div>
          </div>
          <div className="grid grid-cols-4 mb-10">
            <div>
              <div className="text-gray-700 text-sm">Address</div>
              <div className="font-bold">{data?.homeAddress}</div>
            </div>
            <div>
              <div className="text-gray-700 text-sm">Phone</div>
              <div className="font-bold">{data?.phoneNumber}</div>
            </div>
            <div>
              <div className="text-gray-700 text-sm">Email</div>
              <div className="font-bold">{data?.email}</div>
            </div>
          </div>
          <div className="grid grid-cols-4">
            <div>
              <div className="text-gray-700 text-sm">Nationality</div>
              <div className="font-bold">{data?.nationality}</div>
            </div>
            <div>
              <div className="text-gray-700 text-sm">Marital Status</div>
              <div className="font-bold">{data?.maritalStatus}</div>
            </div>
            <div>
              <div className="text-gray-700 text-sm">Religion</div>
              <div className="font-bold">{data?.religion}</div>
            </div>
          </div>
        </>
      );
    };
  
    const onClickEditDetails = () => {
      setIsClickable(!isClickable);
    };
  
    const onClickSaveDetails = () => {
      console.log("savedata", newAssessDetailData);
      if (!isEmpty(newAssessDetailData)) {
        // save to db
        success();
      }
  
      if (isEmpty(newAssessDetailData)) warning();
  
      setIsClickable(false);
    };
  
    return (
      <div>
        {contextHolder}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-2">
            <div className="rounded-lg bg-white p-4 col-span-2 shadow-md h-fit">
              {getSideData()}
            </div>
            {/* <div className="rounded-lg bg-white p-4 col-span-2 shadow-md h-fit mt-4">
              {getOutPatients()}
            </div> */}
          </div>
          <div className="rounded-lg bg-white p-4 col-span-10 shadow-md h-auto">
            <div className="col-span-12">
                <div className="grid grid-cols-2 text-center bg-gray-600 text-white p-4 text-2xl font-extrabold" >
                  <div>
                    ORDER (PRIORITIZATION)
                  </div>
                  <div>
                  DIAGNOSIS
                  </div>
                </div>
                <Link to='/planning' state={{ data: { ...data, diagnosis: 1 } }} className="grid grid-cols-2 p-4 text-2xl font-extrabold border">
                  <div>
                    (1)
                  </div>
                  <div>
                  Deficient Fluid Volume related to diarrhea as evidenced by dry mucous membranes, decreased skin turgor, and pale skin. 
                  </div>
                </Link>
                <Link to='/planning' state={{ data: { ...data, diagnosis: 2 } }} className="grid grid-cols-2 p-4 text-2xl font-extrabold border">
                  <div>
                    (2)
                  </div>
                  <div>
                  Risk for Electrolyte Imbalance related to intense vomiting and diarrhea leading to fluid and electrolyte loss. 
                  </div>
                </Link>
                <Link to='/planning' state={{ data: { ...data, diagnosis: 3 } }} className="grid grid-cols-2 p-4 text-2xl font-extrabold border">
                  <div>
                    (3)
                  </div>
                  <div>
                  Acute Pain related to gastrointestinal inflammation as evidenced by the patients self-report of abdominal cramps rating 7/10 on the pain scale.
                  </div>
                </Link>
                <Link to='/planning' state={{ data: { ...data, diagnosis: 4 } }} className="grid grid-cols-2 p-4 text-2xl font-extrabold border">
                  <div>
                    (4)
                  </div>
                  <div>
                  Risk for Imbalanced Nutrition: Less Than Body Requirements related to nausea, vomiting, and diarrhea as evidenced by decreased oral intake.
                  </div>
                </Link>
                <Link to='/planning' state={{ data: { ...data, diagnosis: 5 } }} className="grid grid-cols-2 p-4 text-2xl font-extrabold border">
                  <div>
                    (5)
                  </div>
                  <div>
                  Activity Intolerance related to fatigue and diarrhea as evidenced by decreased activity level and reports of feeling tired.
                  </div>
                </Link>
              </div>
  
            {!isEmpty(newAssessDetailData) && (
              <div className="flex justify-end mt-5">
                <Link
                  to="/diagnosis"
                  state={{ data: { ...newAssessDetailData, ...data } }}
                  className="mt-2 bg-blue-500 p-2 text-white rounded-lg text-md"
                >
                  Proceed to Diagnosis
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  export default Diagnosis;
  