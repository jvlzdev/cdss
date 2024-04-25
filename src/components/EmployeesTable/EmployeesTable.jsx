import { Button, Table, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  useCreateEmployeeMutation,
  useDeleteEmployeeByIdMutation,
  useUpdateEmployeeByIdMutation,
} from "../../services/appApi";
import { isEmpty } from "lodash";

function EmployeesTable({ data, isLoading }) {
  console.log("employees", { data, isLoading });
  const [isEditing, setIsEditing] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [dataSource, setDataSource] = useState(null);

  useEffect(() => {
    if (!isLoading && !isEmpty(data) && !isEmpty(data?.data))
      setDataSource(data?.data);
  }, [isLoading, data]);

  const [updateEmployeeById] = useUpdateEmployeeByIdMutation();

  const [deleteEmployeeById] = useDeleteEmployeeByIdMutation();

  const [createEmployee] = useCreateEmployeeMutation();
  console.log("custom", data);
  //   const [dataSource, setDataSource] = useState([
  //     {
  //       id: 1,
  //       name: "John",
  //       email: "john@gmail.com",
  //       address: "John Address",
  //     },
  //     {
  //       id: 2,
  //       name: "David",
  //       email: "david@gmail.com",
  //       address: "David Address",
  //     },
  //     {
  //       id: 3,
  //       name: "James",
  //       email: "james@gmail.com",
  //       address: "James Address",
  //     },
  //     {
  //       id: 4,
  //       name: "Sam",
  //       email: "sam@gmail.com",
  //       address: "Sam Address",
  //     },
  //   ]);
  const columns = [
    // {
    //   key: "1",
    //   title: "ID",
    //   dataIndex: "id",
    // },
    {
      key: "1",
      title: "License No.",
      dataIndex: "licenseNo",
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
    },
    {
      key: "3",
      title: "Role",
      dataIndex: "role",
    },
    {
      key: "4",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEdit(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDelete(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];

  const onAdd = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newStudent = {
      id: randomNumber,
      name: "Name " + randomNumber,
      licenseNo: randomNumber,
      //   email: randomNumber + "@gmail.com",
      //   address: "Address " + randomNumber,
    };
    setDataSource((pre) => {
      createEmployee(newStudent);
      return [...pre, newStudent];
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

  return (
    <div>
      {/* <Button onClick={onAdd}>Add a new Employees</Button> */}
      <Table columns={columns} dataSource={dataSource}></Table>
      <Modal
        title="Edit Employee"
        visible={isEditing}
        okText="Save"
        okType="ghost"
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
        <div className="mt-8 grid grid-cols-2 gap-2">
        <div>
            <label
              htmlFor="LicenseNo"
              className="block text-sm font-medium text-gray-700"
            >
              License No
            </label>
            <input
              type="text"
              required
              value={editEmployee?.licenseNo}
              onChange={(e) => {
                setEditEmployee((pre) => {
                  return { ...pre, licenseNo: e.target.value };
                });
              }}
              id="LicenseNo"
              name="license_no"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              required
              value={editEmployee?.name}
              onChange={(e) => {
                setEditEmployee((pre) => {
                  return { ...pre, name: e.target.value };
                });
              }}
              id="Name"
              name="name"
              className="mt-1 w-full rounded-md border border-neutral-400 text-lg text-gray-700 shadow-sm p-2"
            />
          </div>
        
        </div>

        {/* <Input
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
        /> */}
        {/* <Input
            value={editEmployee?.email}
            onChange={(e) => {
                setEditEmployee((pre) => {
                return { ...pre, email: e.target.value };
              });
            }}
          /> */}
        {/* <Input
            value={editEmployee?.address}
            onChange={(e) => {
                setEditEmployee((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          /> */}
      </Modal>
    </div>
  );
}

export default EmployeesTable;
