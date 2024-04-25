import { Button, Col, DatePicker, Divider, Flex, Row, Space, message } from "antd";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HistoryOutlined
} from "@ant-design/icons";

function PatientProfile() {
  const location = useLocation();
  const data = location.state?.data;
  const [isClickable, setIsClickable] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [newPatientData, setNewPatientData] = useState(null);
  const [vitalData, setVitalData]= useState(null);
  console.log("get selected profile", data);

  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'success',
      content: 'Patient Profile saved successfully!',
    });
  };

  const warning = (props) => {
    messageApi.open({
      type: 'warning',
      content: `${!isEmpty(props) ? props : 'Please input data'}`,
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

  const getVitalSigns = () => {
    const onClickSubmitVital = () => {
      console.log('submit vitalData', vitalData)

      if (isEmpty(vitalData)) warning('Please input all the vital signs')

      if (!isEmpty(vitalData)) {
        if (vitalData?.temperature < 36.5) warning('Temperature is less than normal.')
        if (vitalData?.temperature > 37.4) warning('Temperature is greater than normal.')

        if (vitalData?.bloodPressure < 80) warning('Temperature is less than normal.')
        if (vitalData?.bloodPressure > 120) warning('Temperature is greater than normal.')

        if (vitalData?.respiratoryRate < 12) warning('Respiratory rate is less than normal')
        if (vitalData?.respiratoryRate > 18) warning('Respiratory rate is greater than normal')

        if (vitalData?.pulseRate < 60) warning('Pulse Rate is less than normal.')
        if (vitalData?.pulseRate > 100) warning('Pulse Rate is greater than normal.')

        if (vitalData?.oxygenSaturation < 95) warning('Oxygen Rate is less than normal.')
        if (vitalData?.oxygenSaturation > 100) warning('Oxygen Rate is greater than normal.')


      }
    }

    const onChangeDatePicker = (date, dateString) => {
      console.log("datepicker", date, dateString);
      setVitalData((pre) => {
        return { ...pre, dateTime: dateString };
      });
    };

    console.log('vitalData', vitalData)
    return (
      <div>
        <div className="font-bold text-xl grid grid-cols-2">
          <div className="cols-span-6 font-medium text-xl">VITAL SIGNS</div>
          <div className="cols-span-6 text-right justify-self-end	"><Button className="align-center flex items-center"><HistoryOutlined /></Button></div>
        </div>
          <div>
            <label htmlFor="Physician" className="text-gray-700 text-sm">
              Date and Time
            </label>
            <DatePicker
              required
              showTime
              onChange={onChangeDatePicker}
              className="w-full rounded-md border border-neutral-400 text-md text-gray-700 shadow-sm p-1"
            />
          </div>
          <div>
            <label htmlFor="Physician" className="text-gray-700 text-sm">
              Temperature (°C)
            </label>
            <input
              type="number"
              id="FirstName"
              name="first_name"
              className="w-full rounded-md border border-neutral-400 text-md text-gray-700 shadow-sm p-1"
              // disabled={!isClickable}
              // style={{ background: !isClickable ? "#dadada" : "" }}
              required
              onChange={(e) => {
                setVitalData((pre) => {
                  return { ...pre, temperature: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="Physician" className="text-gray-700 text-sm">
              Blood Pressure
            </label>
            <input
              id="FirstName"
              name="first_name"
              className="w-full rounded-md border border-neutral-400 text-md text-gray-700 shadow-sm p-1"
              // disabled={!isClickable}
              // style={{ background: !isClickable ? "#dadada" : "" }}
              required
              onChange={(e) => {
                setVitalData((pre) => {
                  return { ...pre, bloodPressure: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="Physician" className="text-gray-700 text-sm">
              Respiratory Rate
            </label>
            <input
              type="number"
              id="FirstName"
              name="first_name"
              className="w-full rounded-md border border-neutral-400 text-md text-gray-700 shadow-sm p-1"
              // disabled={!isClickable}
              // style={{ background: !isClickable ? "#dadada" : "" }}
              required
              onChange={(e) => {
                setVitalData((pre) => {
                  return { ...pre, respiratoryRate: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="Physician" className="text-gray-700 text-sm">
              Pulse Rate
            </label>
            <input
              type="number"
              id="FirstName"
              name="first_name"
              className="w-full rounded-md border border-neutral-400 text-md text-gray-700 shadow-sm p-1"
              // disabled={!isClickable}
              // style={{ background: !isClickable ? "#dadada" : "" }}
              required
              onChange={(e) => {
                setVitalData((pre) => {
                  return { ...pre, pulseRate: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="Physician" className="text-gray-700 text-sm">
              Oxygen Saturation
            </label>
            <input
              type="number"
              id="FirstName"
              name="first_name"
              className="w-full rounded-md border border-neutral-400 text-md text-gray-700 shadow-sm p-1"
              // disabled={!isClickable}
              // style={{ background: !isClickable ? "#dadada" : "" }}
              required
              onChange={(e) => {
                setVitalData((pre) => {
                  return { ...pre, oxygenSaturation: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <label htmlFor="Physician" className="text-gray-700 text-sm">
              Pain Scale
            </label>
            <input
              type="number"
              id="FirstName"
              name="first_name"
              className="w-full rounded-md border border-neutral-400 text-md text-gray-700 shadow-sm p-1"
              // disabled={!isClickable}
              // style={{ background: !isClickable ? "#dadada" : "" }}
              required
              onChange={(e) => {
                setVitalData((pre) => {
                  return { ...pre, painScale: e.target.value };
                });
              }}
            />
          </div>
          <Button className="mt-2" onClick={onClickSubmitVital}>Submit</Button>
      </div>
    );
  };

  // const getOutPatients = () => {
  //   return (
  //     <div>
  //       <div className="font-bold text-xl my-3">Outpatient/Admission</div>
  //       {/* <div className="grid grid-cols-2 mb-4">
  //         <div className="text-sm text-gray-700">Gender</div>
  //         <div className="font-bold">{data?.gender}</div>
  //       </div> */}
  //     </div>
  //   );
  // };

  const getMainData = () => {
    return (
      <>
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
    console.log('savedata', newPatientData)
    if (!isEmpty(newPatientData)) {
      // save to db
      setIsSave(true)
      success()
    }

    if (isEmpty(newPatientData)) warning()

    setIsClickable(false)
  };

  return (
    <div>
      {contextHolder}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <div className="rounded-lg bg-white p-4 col-span-2 shadow-md h-fit">
            {getSideData()}
          </div>
          <div className="rounded-lg bg-white p-4 col-span-2 shadow-md h-fit mt-4">
            {getVitalSigns()}
          </div>
          {/* <div className="rounded-lg bg-white p-4 col-span-2 shadow-md h-fit mt-4">
            {getOutPatients()}
          </div> */}
        </div>
        <div className="rounded-lg bg-white p-4 col-span-10 shadow-md h-auto">
          <div className="grid grid-cols-12">
            <div className="font-medium text-xl mb-5 col-span-6">
              PERSONAL DETAILS
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
          {getMainData()}

          <div className="mt-8 overflow-y-scroll h-[450px] p-4 border border-slate-200 rounded-lg">
          <div className="my-2 text-gray-700 text-sm">Please put (N/A) if no data provided.</div>
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">IN-CHARGE</div>
              <div className="grid grid-cols-2 mb-10 gap-4">
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    Physician-In-Charge
                  </label>

                  <input
                    type="text"
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewPatientData((pre) => {
                        return { ...pre, physicianInCharge: e.target.value };
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="Physician" className="text-sm text-gray-700">
                    Nurse-In-Charge
                  </label>

                  <input
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewPatientData((pre) => {
                        return { ...pre, nurseInCharge: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">CHIEF COMPLAINT</div>
              <div className="grid grid-cols-2 mb-10 gap-4">
                <div>
                  <label htmlFor="Physician" className="text-gray-700 text-sm">
                    Complaint
                  </label>

                  <input
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewPatientData((pre) => {
                        return { ...pre, chiefComplaint: e.target.value };
                      });
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="Physician" className="text-sm text-gray-700">
                    Nurse Notes
                  </label>

                  <input
                    type="text"
                    // onChange={(e) => setFirstName(e.target.value)}
                    id="FirstName"
                    name="first_name"
                    className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-1"
                    disabled={!isClickable}
                    style={{ background: !isClickable ? "#dadada" : "" }}
                    required
                    onChange={(e) => {
                      setNewPatientData((pre) => {
                        return { ...pre, nurseNotes: e.target.value };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">MEDICAL HISTORY</div>
              <div className="grid grid-cols-1 mb-10 gap-4">
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
                    setNewPatientData((pre) => {
                      return { ...pre, medHistory: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">FAMILY HISTORY</div>
              <div className="grid grid-cols-1 mb-10 gap-4">
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
                    setNewPatientData((pre) => {
                      return { ...pre, famHistory: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">MEDICATIONS</div>
              <div className="grid grid-cols-1 mb-10 gap-4">
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
                    setNewPatientData((pre) => {
                      return { ...pre, medicationHistory: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">SOCIAL HISTORY</div>
              <div className="grid grid-cols-1 mb-10 gap-4">
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
                    setNewPatientData((pre) => {
                      return { ...pre, socHistory: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">
                IMMUNIZATION HISTORY
              </div>
              <div className="grid grid-cols-1 mb-10 gap-4">
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
                    setNewPatientData((pre) => {
                      return { ...pre, immuHistory: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">SURGICAL HISTORY</div>
              <div className="grid grid-cols-1 mb-10 gap-4">
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
                    setNewPatientData((pre) => {
                      return { ...pre, surgicalHistory: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">ALLERGIES</div>
              <div className="grid grid-cols-1 mb-10 gap-4">
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
                    setNewPatientData((pre) => {
                      return { ...pre, allergyHistroy: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
            <Divider />
            <div className="col-span-10">
              <div className="font-medium text-xl mb-3">
                OUTPATIENT/ADMISSION
              </div>
              <div className="grid grid-cols-1 mb-10 gap-4">
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
                    setNewPatientData((pre) => {
                      return { ...pre, outPatient: e.target.value };
                    });
                  }}
                />
              </div>
            </div>
          </div>

          {isSave && !isEmpty(newPatientData) && <div className="flex justify-end mt-5"><Link to="/assessments" state={{ data: { ...newPatientData, ...data } }} className="mt-2 bg-blue-500 p-2 text-white rounded-lg text-md">Proceed to Assessment</Link></div>}
        </div>
      </div>
    </div>
  );
}

export default PatientProfile;
