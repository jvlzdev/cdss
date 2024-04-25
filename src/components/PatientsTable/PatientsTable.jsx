import { Button, Table, Modal, Input, Dropdown, Space, DatePicker } from "antd";
import { useEffect, useState } from "react";
import {
  EditOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import {
  useDeleteEmployeeByIdMutation,
  useUpdateEmployeeByIdMutation,
  useCreatePatientMutation,
} from "../../services/appApi";
import { isEmpty } from "lodash";
import { Link } from "react-router-dom";

function PatientsTable({ data, isLoading }) {
  console.log("patients", { data, isLoading });
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [addPatient, setAddPatient] = useState(null);
  const [dataSource, setDataSource] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    if (!isLoading && !isEmpty(data) && !isEmpty(data)) setDataSource(data);
  }, [isLoading, data]);

  const [updateEmployeeById] = useUpdateEmployeeByIdMutation();

  const [deleteEmployeeById] = useDeleteEmployeeByIdMutation();

  const [createPatient] = useCreatePatientMutation();
  console.log("custom", data);
  const onChangeDatePicker = (date, dateString) => {
    console.log("datepicker", date, dateString);
    setAddPatient((pre) => {
      return { ...pre, birthday: dateString };
    });
  };

  const items = [
    {
      key: "1",
      label: (
        <Link
          style={{ cursor: "pointer" }}
          state={{ data: selectedPatient }}
          to="/patient-profile"
        >{`Patient Details`}</Link>
      ),
    },
  ];

  const columns = [
    {
      key: "1",
      title: "First Name",
      dataIndex: "firstName",
    },
    {
      key: "2",
      title: "Last Name",
      dataIndex: "lastName",
    },
    {
      key: "3",
      title: "Age",
      dataIndex: "age",
    },
    {
      key: "4",
      title: "Gender",
      dataIndex: "gender",
    },
    {
      key: "3",
      title: "Email",
      dataIndex: "email",
    },
    {
      key: "4",
      title: "Actions",
      render: (record) => {
        return (
          <>
            {/* <EditOutlined
              onClick={() => {
                onEdit(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDelete(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            /> */}

            <Space direction="vertical">
              <Space wrap>
                <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                  <Button onClick={() => {
                      onGetPatientProfile(record);
                    }} className="text-sm flex items-center"><div className="text-sm font-medium">View Profile</div><MoreOutlined
                    size={50}
                    
                    style={{ marginLeft: 12, cursor: "pointer" }}
                  /></Button>
                </Dropdown>
              </Space>
            </Space>
          </>
        );
      },
    },
  ];

  const onAdd = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newPatient = {
      id: randomNumber,
      name: "Name " + randomNumber,
      licenseNo: randomNumber,
      //   email: randomNumber + "@gmail.com",
      //   address: "Address " + randomNumber,
    };
    setDataSource((pre) => {
      //   createEmployee(newStudent);
      return [...pre, newPatient];
    });
  };

  const onDelete = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this employee record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          console.log("record delete", record);
          deleteEmployeeById(record);
          console.log(
            "delete ->",
            pre.filter((student) => student.id !== record.id)
          );
          return pre.filter((emp) => emp.id !== record.id);
        });
      },
    });
  };
  const onEdit = (record) => {
    setIsEditing(true);
    setEditEmployee({ ...record });
  };

  const resetEditing = () => {
    setIsEditing(false);
    setEditEmployee(null);
  };

  const closeAdd = () => {
    setIsCreating(false);
    setAddPatient(null);
  };

  const onGetPatientProfile = (record) => {
    setSelectedPatient(record);
    console.log("record patient", record);
  };
  console.log("selected", selectedPatient);
  return (
    <div className="text-right">
      <div>
        <Button
          onClick={() => setIsCreating(true)}
          className="my-4 text-sm font-medium text-white transition hover:bg-transparent hover:text-stone-200 focus:outline-none focus:ring active:text-stone-200"
          style={{ background: '#345673' }} 
        >
          Add Patient
        </Button>
      </div>
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        title="Edit Employee"
        visible={isEditing}
        okText="Save"
        okType="default"
        onCancel={() => {
          resetEditing();
        }}
        onOk={() => {
          setDataSource((pre) => {
            console.log("editEmployee", editEmployee);
            return pre.map((emp) => {
              console.log("editEmployee pre", emp);
              if (emp.id === editEmployee.id) {
                updateEmployeeById(editEmployee);
                return editEmployee;
              } else {
                return emp;
              }
            });
          });
          resetEditing();
        }}
      >
        <Input
          value={editEmployee?.name}
          onChange={(e) => {
            setEditEmployee((pre) => {
              return { ...pre, name: e.target.value };
            });
          }}
        />
        <Input
          value={editEmployee?.licenseNo}
          onChange={(e) => {
            setEditEmployee((pre) => {
              return { ...pre, licenseNo: e.target.value };
            });
          }}
        />
      </Modal>
      <Modal
        title="Add Patient"
        visible={isCreating}
        okType="ghost"
        okText="Save"
        onCancel={() => {
          closeAdd();
        }}
        onOk={() => {
          createPatient(addPatient);

          console.log("addPatient", {
            ...addPatient,
          });
          // createEmployee(addPatient)
          //   setDataSource((pre) => {
          //     console.log("addPatient", addPatient);
          //     return pre.map((emp) => {
          //       console.log("addPatient pre", emp);
          //     //   if (emp.id === editEmployee.id) {
          //     //     updateEmployeeById(editEmployee);
          //     //     return editEmployee;
          //     //   } else {
          //     //     return emp;
          //     //   }
          //     });
          //   });
          closeAdd();
        }}
      >
        <div className="mt-8 grid grid-cols-2 gap-2">
          <div>
            <label
              htmlFor="FirstName"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, firstName: e.target.value };
                });
              }}
              id="FirstName"
              name="first_name"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="LastName"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, lastName: e.target.value };
                });
              }}
              id="LastName"
              name="last_name"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Birthday"
              className="block text-sm font-medium text-gray-700"
            >
              Birthday
            </label>
            <DatePicker
              onChange={onChangeDatePicker}
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
            {/* <input
              type="text"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, birthday: e.target.value };
                });
              }}
              id="Birthday"
              name="birthday"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            /> */}
          </div>
          <div>
            <label
              htmlFor="Age"
              className="block text-sm font-medium text-gray-700"
            >
              Age
            </label>
            <input
              type="number"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, age: e.target.value };
                });
              }}
              id="Age"
              name="age"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Gender"
              className="block text-sm font-medium text-gray-700"
            >
              {" "}
              Gender{" "}
            </label>

            <select
              name="Gender"
              id="Gender"
              className="mt-1.5 w-full rounded-lg border border-neutral-400 text-lg text-gray-700 sm:text-sm p-3"
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, gender: e.target.value };
                });
              }}
              required
            >
              <option value="">Please select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="Height"
              className="block text-sm font-medium text-gray-700"
            >
              Height (cm)
            </label>
            <input
              type="number"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, height: e.target.value };
                });
              }}
              id="Height"
              name="height"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Weight"
              className="block text-sm font-medium text-gray-700"
            >
              Weight (kg)
            </label>
            <input
              type="number"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, weight: e.target.value };
                });
              }}
              id="Weight"
              name="weight"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Religion"
              className="block text-sm font-medium text-gray-700"
            >
              Religion
            </label>
            <select
              name="Religion"
              id="Religion"
              className="mt-1.5 w-full rounded-lg border border-neutral-400 text-lg text-gray-700 sm:text-sm p-3"
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, religion: e.target.value };
                });
              }}
              required
            >
              <option value="">Please select</option>
              <option value="Catholic">Catholic</option>
              <option value="Christian">Christian</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="Nationality"
              className="block text-sm font-medium text-gray-700"
            >
              Nationality
            </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, nationality: e.target.value };
                });
              }}
              id="Nationality"
              name="nationality"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Occupation"
              className="block text-sm font-medium text-gray-700"
            >
              Occupation
            </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, occupation: e.target.value };
                });
              }}
              id="Occupation"
              name="occupation"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Marital Status"
              className="block text-sm font-medium text-gray-700"
            >
              Marital Status
            </label>
            <select
              name="MaritalStatus"
              id="MaritalStatus"
              className="mt-1.5 w-full rounded-lg border border-neutral-400 text-lg text-gray-700 sm:text-sm p-3"
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, maritalStatus: e.target.value };
                });
              }}
              required
            >
              <option value="">Please select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="PhoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, phoneNumber: e.target.value };
                });
              }}
              id="PhoneNumber"
              name="phoneNumber"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, email: e.target.value };
                });
              }}
              id="Email"
              name="email"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="HomeAddress"
              className="block text-sm font-medium text-gray-700"
            >
              Home Address
            </label>
            <input
              type="text"
              required
              onChange={(e) => {
                setAddPatient((pre) => {
                  return { ...pre, homeAddress: e.target.value };
                });
              }}
              id="HomeAddress"
              name="homeAddress"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default PatientsTable;
