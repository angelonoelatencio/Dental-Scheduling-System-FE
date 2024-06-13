import { Modal, Skeleton } from "antd";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useGetBySpecialty } from "../../services/Specialty/queries";
import { ISpecialty } from "../../interface/ISpecialty";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { useGetDentistBySpecialty } from "../../services/Dentists/queries";
import { IAvailableDentistPerSpecialty } from "../../interface/IDentist";
import { useFindSlot } from "../../services/Appointment/queries";
import showNotification from "../../utils/openNotification";
import convertTime from "../../utils/convertTime";
import { useCreateAppointment } from "../../services/Appointment/mutation";

const CreateAppointment = () => {
  const [open, setOpen] = useState(false);
  const [specialty, setSpecialty] = useState(0);
  const [dentist, setDentist] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Dayjs>();
  const [time, setTime] = useState("");

  const { data: specialtyList, isFetching: loadingSpecialty } =
    useGetBySpecialty();

  const { data: dentistsList, isFetching: loadingDentist } =
    useGetDentistBySpecialty({ specialtyId: specialty });

  const { mutate: createAppointment, isPending } = useCreateAppointment();

  const {
    data: timeSlotList,
    isFetching: loadingTimeSlot,
    isError: errorTimeSlot,
  } = useFindSlot({
    dentistId: dentist,
    appointmentDT: selectedDate?.format("MM/DD/YYYY")!,
  });

  useEffect(() => {
    if (errorTimeSlot) {
      showNotification("error", "Appointment", "No Slots Available");
    }
  }, [errorTimeSlot]);

  const handleChangeSpecialty = (event: SelectChangeEvent) => {
    setSpecialty(+event.target.value);
    setDentist(0);
  };

  const handleChangeDentist = (event: SelectChangeEvent) => {
    setDentist(+event.target.value);
  };

  const handleChangeTime = (event: SelectChangeEvent) => {
    setTime(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createAppointment({
      appointmentDT: selectedDate?.format("YYYY-MM-DD") + " " + time,
      dentistId: dentist!,
    });

    setOpen(false);
    setSelectedDate(undefined);
    setSpecialty(0);
    setDentist(0);
    setTime("");
  };

  return (
    <>
      <Button
        variant="contained"
        sx={{ marginBottom: "15px" }}
        onClick={() => setOpen(true)}>
        New Appointment
      </Button>
      <Modal
        title="Create an appointment"
        open={open}
        footer={false}
        onClose={() => setOpen(false)}
        onCancel={() => {
          setOpen(false);
          setSelectedDate(undefined);
          setSpecialty(0);
          setDentist(0);
          setTime("");
        }}>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <FormControl fullWidth sx={{ paddingBottom: "15px" }}>
            {loadingSpecialty ? (
              <Skeleton.Button active={true} block={true} />
            ) : (
              <>
                <InputLabel id="specialty-select-label">Specialty</InputLabel>
                <Select
                  labelId="specialty-select-label"
                  id="specialty-select"
                  label="Specialty"
                  onChange={handleChangeSpecialty}
                  disabled={loadingSpecialty}
                  value={specialty.toString()}>
                  {specialtyList?.specialties?.map((specialty: ISpecialty) => (
                    <MenuItem value={specialty?.id}>{specialty?.name}</MenuItem>
                  ))}
                </Select>
              </>
            )}
          </FormControl>

          {specialty !== 0 ? (
            <FormControl fullWidth sx={{ paddingBottom: "15px" }}>
              {loadingDentist ? (
                <Skeleton.Button active={true} block={true} />
              ) : (
                <>
                  <InputLabel id="dentist-select-label">Dentist</InputLabel>
                  <Select
                    labelId="dentist-select-label"
                    id="dentist-select"
                    label="Dentist"
                    onChange={handleChangeDentist}
                    disabled={loadingDentist}
                    value={dentist.toString()}
                    defaultValue="0">
                    {dentistsList?.dentists?.map(
                      (dentist: IAvailableDentistPerSpecialty) => (
                        <MenuItem value={dentist?.dentist_id}>
                          {dentist?.dentist_name}
                        </MenuItem>
                      )
                    )}
                  </Select>
                </>
              )}
            </FormControl>
          ) : (
            <></>
          )}

          {dentist !== 0 ? (
            <FormControl fullWidth sx={{ paddingBottom: "15px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  sx={{ paddingTop: "15px", paddingBottom: "15px" }}
                  //@ts-ignore
                  onChange={setSelectedDate}
                />
              </LocalizationProvider>
            </FormControl>
          ) : (
            <></>
          )}

          {selectedDate ? (
            <FormControl fullWidth sx={{ paddingBottom: "15px" }}>
              {loadingTimeSlot ? (
                <Skeleton.Button active={true} block={true} />
              ) : (
                <>
                  {timeSlotList?.count === 0 ? (
                    <>{timeSlotList?.message}</>
                  ) : (
                    <>
                      <InputLabel id="time-select-label">
                        Available Time
                      </InputLabel>
                      <Select
                        labelId="time-select-label"
                        id="time-select"
                        label="Available Time"
                        onChange={handleChangeTime}
                        disabled={loadingTimeSlot}
                        value={time}
                        defaultValue="">
                        {timeSlotList?.slots?.map((timeSlot: string) => (
                          <MenuItem value={timeSlot}>
                            {convertTime(timeSlot)}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                </>
              )}
            </FormControl>
          ) : (
            <></>
          )}

          {isPending ? (
            <LoadingButton
              fullWidth
              loading={true}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loadingPosition="start">
              <span>Submitting</span>
            </LoadingButton>
          ) : (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={
                specialty === 0 ||
                dentist === 0 ||
                selectedDate === undefined ||
                time === ""
              }>
              Submit
            </Button>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default CreateAppointment;
