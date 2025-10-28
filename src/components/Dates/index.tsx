import "./styles.css";
import type { DayInfo } from "../../types/type";

type DateProps = {
  date: Date;
  dayState: "blocked" | "checkin" | "checkout" | "inRange" | "strikethrough" | "default";
  onClick?: (date: Date) => void;
  label?: string | null;
  labelSpan?: number; // number of cells to span (only on the first cell)
  dayInfo?: DayInfo | null;
  cellWidth?: number;
  cellHeight?: number;
};

const Dates = (props: DateProps) => {
  const className = `day-wrapper ${props.dayState}`;
  const cellWidth = props.cellWidth ?? 80;
  const cellHeight = props.cellHeight ?? 80;
  
  const handleClick = () => {
    // Blocked dates can't be clicked, strikethrough dates can be clicked through
    if (props.dayState === "blocked") return;
    props.onClick?.(props.date);
  };
  
  // Generate tooltip text
  const getTooltip = () => {
    if (props.dayState === "checkin") return "Check-in";
    if (props.dayState === "checkout") return "Check-out";
    return undefined;
  };
  
  return (
    <div 
      className={className} 
      onClick={handleClick} 
      role="button"
      style={{ width: `${cellWidth}px`, height: `${cellHeight}px` }}
      title={getTooltip()}
    >
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
      <div className="date-number">{new Date(props.date).getDate()}</div>
      {props.dayInfo && (
        <div
          className="day-info"
          style={{
            color: props.dayInfo.textColor,
            backgroundColor: props.dayInfo.backgroundColor,
          }}
        >
          {props.dayInfo.text}
        </div>
      )}
    </div>
  );
};

export default Dates;
