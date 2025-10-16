import "./styles.css";

type DateProps = {
  date: Date;
  dayState: "blocked" | "checkin" | "checkout" | "inRange" | "default";
  onClick?: (date: Date) => void;
  label?: string | null;
  labelSpan?: number; // number of cells to span (only on the first cell)
};

const Dates = (props: DateProps) => {
  const className = `day-wrapper ${props.dayState}`;
  const handleClick = () => {
    if (props.dayState === "blocked") return;
    props.onClick?.(props.date);
  };
  return (
    <div className={className} onClick={handleClick} role="button">
      {props.label ? (
        <div
          className="range-label"
          style={{
            width: `calc(100% * ${props.labelSpan ?? 1} + 1px * ${(props.labelSpan ?? 1) - 1})`,
          }}
        >
          {props.label}
        </div>
      ) : null}
      {new Date(props.date).getDate()}
    </div>
  );
};

export default Dates;
