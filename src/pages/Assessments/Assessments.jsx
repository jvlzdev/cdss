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

function Assessments() {
  const location = useLocation();
  const data = location.state?.data;
  const [isClickable, setIsClickable] = useState(false);
  const [newAssessDetailData, setNewAssessDetailData] = useState(null);
  console.log("get selected profile", data);

  const [messageApi, contextHolder] = message.useMessage();

  const [newAssessmentData, setNewAssessmentData] = useState([]);

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
                      setNewAssessDetailData((pre) => {
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
      content: "Assessment Details saved successfully!",
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
          <div className="grid grid-cols-12">
            <div className="font-medium text-xl col-span-6">
              ASSESSMENT DETAILS
            </div>
            <div className="col-span-6 text-right">
              <div>
                <Button className="mr-4" onClick={onClickEditDetails}>
                  Edit
                </Button>
                <Button onClick={onClickSaveDetails}>Save</Button>
              </div>
            </div>
          </div>
          {/* {getMainData()} */}

          <div className="mt-8 overflow-y-scroll h-[77vh] p-4 border border-slate-200 rounded-lg">
            <div className="my-2 text-gray-700 text-sm">
              Please put (N/A) if no data provided.
            </div>
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">HEALTH HISTORY</div>
              <div className="grid grid-cols-1 mb-10 gap-4">
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    Chief Complaint (CC)
                  </label>

                  <input
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    value={data?.chiefComplaint}
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={true}
                    style={{ background: '#dadada' }}
                    required
                    onChange={(e) => {
                      setNewAssessDetailData((pre) => {
                        return { ...pre, chiefComplaint: e.target.value };
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    History of Present Illness (HPI)
                  </label>

                  <textarea
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewAssessDetailData((pre) => {
                        return { ...pre, medHistory: e.target.value };
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    Pass Medical History (PMH)
                  </label>

                  <textarea
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewAssessDetailData((pre) => {
                        return { ...pre, medHistory: e.target.value };
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    Social History
                  </label>

                  <textarea
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewAssessDetailData((pre) => {
                        return { ...pre, medHistory: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">
                PHYSICAL EXAMINATIONS
              </div>
              <div className="grid grid-cols-1 mb-10 gap-4">
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    Objective and Subjective Cues
                  </label>

                  <textarea
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewAssessDetailData((pre) => {
                        return { ...pre, medHistory: e.target.value };
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    System-Specific Exams
                  </label>

                  <textarea
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewAssessDetailData((pre) => {
                        return { ...pre, medHistory: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">DIAGNOSTIC TEST</div>
              <div className="grid grid-cols-1 mb-10 gap-4">
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    Laboratory Tests
                  </label>

                  <textarea
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewAssessDetailData((pre) => {
                        return { ...pre, medHistory: e.target.value };
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    Imaging Studies
                  </label>

                  <textarea
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewAssessDetailData((pre) => {
                        return { ...pre, medHistory: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">
                FUNCTIONAL ASSESSMENT
              </div>
              <div className="grid grid-cols-1 mb-10 gap-4">
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    Acitivity and Exercise
                  </label>

                  <textarea
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewAssessDetailData((pre) => {
                        return { ...pre, medHistory: e.target.value };
                      });
                    }}
                  />
                </div>
                <div>
                  <div className="flex justify-between"><label htmlFor="Physician" className="text-gray-700 text-sm">
                    Nutrional Assessment
                  </label>

                  <Button
                    onClick={handleAddRow}
                    type="primary"
                    style={{ marginBottom: 16 }}
                  >
                    Add Row
                  </Button></div>
                  <Table dataSource={newAssessmentData} columns={columns} />
                </div>
              </div>
            </div>
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">
                CULTURAL ASSESSMENT
              </div>
              <div className="grid grid-cols-1 mb-10 gap-4">
                <div>
                  <textarea
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewAssessDetailData((pre) => {
                        return { ...pre, medHistory: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
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

export default Assessments;
