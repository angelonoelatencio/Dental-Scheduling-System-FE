import { Card } from "antd";
import MyAppointments from "../layouts/User/myAppointments";
import CreateAppointment from "../layouts/User/createAppointment";

const AppointmentPage = () => {
  return (
    <Card>
      <CreateAppointment />
      <MyAppointments />
    </Card>
  );
};

export default AppointmentPage;
