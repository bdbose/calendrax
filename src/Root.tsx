import { StrictMode, useState } from "react";
import App from "./App";

export type SelectDateType = {
  checkin: Date | null;
  checkout: Date | null;
};

export default function Root() {
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState<SelectDateType>({
    checkin: null,
    checkout: null,
  });

  return (
    <StrictMode>
      <App open={open} setOpen={setOpen} dates={dates} setDates={setDates} />
    </StrictMode>
  );
}
