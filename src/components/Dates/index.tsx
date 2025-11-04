import "./styles.css";
import { useState, useEffect, useRef } from "react";
import type { DayInfo, MinNights, BlockedDates, SelectDateType } from "../../types/type";
import { getMinNights } from "../../utils/minNights";

type DateProps = {
  date: Date;
  dayState: "blocked" | "checkin" | "checkout" | "inRange" | "strikethrough" | "default";
  onClick?: (date: Date) => void;
  label?: string | null;
  labelSpan?: number; // number of cells to span (only on the first cell)
  dayInfo?: DayInfo | null;
  cellWidth?: number | string;
  cellHeight?: number | string; 
  isMobile: boolean;
  minNights?: MinNights;
  blockedDates?: BlockedDates;
  selection?: SelectDateType;
};

const Dates = (props: DateProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldShowTooltip, setShouldShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState<'center' | 'left' | 'right'>('center');
  const dateRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
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

  // Check if this date has minimum nights requirement
  const minNightsValue = props.minNights ? getMinNights(props.date, props.minNights, props.blockedDates) : null;
  const hasCheckout = props.selection?.checkout !== null;
  
  // Get day of week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = props.date.getDay();
  const isMonday = dayOfWeek === 1;
  const isSunday = dayOfWeek === 0;
  
  // Calculate tooltip position to prevent overflow
  useEffect(() => {
    if (!shouldShowTooltip || !dateRef.current || !tooltipRef.current) return;
    
    // Use requestAnimationFrame to ensure tooltip is rendered and measured
    requestAnimationFrame(() => {
      if (!dateRef.current || !tooltipRef.current) return;
      
      const dateElement = dateRef.current;
      const tooltipElement = tooltipRef.current;
      
      const rect = dateElement.getBoundingClientRect();
      const tooltipRect = tooltipElement.getBoundingClientRect();
      
      // Calculate center position
      const centerLeft = rect.left + rect.width / 2;
      const tooltipWidth = tooltipRect.width || 120; // fallback width estimate
      const tooltipLeft = centerLeft - tooltipWidth / 2;
      
      // Check for left edge overflow (with padding)
      const padding = 8;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      
      if (tooltipLeft < padding) {
        setTooltipPosition('left');
      } 
      // Check for right edge overflow (with padding)
      else if (tooltipLeft + tooltipWidth > viewportWidth - padding) {
        setTooltipPosition('right');
      }
      // Default to center
      else {
        setTooltipPosition('center');
      }
    });
  }, [shouldShowTooltip, props.isMobile]);
  
  // Show tooltip when hovering over a date with min nights
  useEffect(() => {
    if (isHovered && minNightsValue !== null && props.dayState !== "blocked") {
      setShouldShowTooltip(true);
      // Set initial position based on day of week for quick positioning
      if (isMonday) {
        setTooltipPosition('left');
      } else if (isSunday) {
        setTooltipPosition('right');
      } else {
        setTooltipPosition('center');
      }
    }
  }, [isHovered, minNightsValue, props.dayState, isMonday, isSunday]);

  // Hide tooltip when checkout is selected
  useEffect(() => {
    if (hasCheckout) {
      setShouldShowTooltip(false);
    }
  }, [hasCheckout]);

  const showMinNightsTooltip = minNightsValue !== null && shouldShowTooltip && props.dayState !== "blocked";
  
  return (
    <div 
      ref={dateRef}
      className={className} 
      onClick={handleClick} 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      style={{ width: props.isMobile ? "100%" : `${cellWidth}px`, height: props.isMobile ? "100%" : `${cellHeight}px` }}
      title={getTooltip()}
    >
      {showMinNightsTooltip && (
        <div 
          ref={tooltipRef}
          className={`min-nights-tooltip min-nights-tooltip-${tooltipPosition}`}
        >
          <div className={`min-nights-tooltip-arrow min-nights-tooltip-arrow-${tooltipPosition}`}></div>
          <div className="min-nights-tooltip-content">
            {minNightsValue}-night minimum
          </div>
        </div>
      )}
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
