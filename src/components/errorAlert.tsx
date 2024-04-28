import { useAppDispatch, useAppSelector } from "@hooks/hooksStore";
import { Alert } from "@mui/material";
import { hideAlert } from "reducers/alertReducer";

export default function ErrorAlert() {
  const error = useAppSelector((state) => state.alert);
  const dispatch = useAppDispatch();
  if (!error.closed) {
    return (
      <>
        <Alert
          severity="error"
          onClose={() => {
            dispatch(hideAlert());
          }}
        >
          {error.message}
        </Alert>
      </>
    );
  }
  return null;
}
