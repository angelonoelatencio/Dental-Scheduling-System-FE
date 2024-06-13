import { Table } from "antd";
import { useGetMyAppointments } from "../../services/Appointment/queries";
import moment from "moment";

const MyAppointments = () => {
  const { data, isFetching } = useGetMyAppointments();
  return (
    <Table
      pagination={false}
      loading={isFetching}
      columns={[
        {
          title: "Date",
          dataIndex: "appointment_time",
          render: (value) => moment(value).format("MM/DD/YYYY, h:mm:ss a"),
        },
        { title: "Doctor", dataIndex: "dentist_name" },
        { title: "Specialty", dataIndex: "specialty_name" },
        { title: "Status", dataIndex: "status" },
      ]}
      dataSource={data?.appointments}
    />
  );
};

export default MyAppointments;
