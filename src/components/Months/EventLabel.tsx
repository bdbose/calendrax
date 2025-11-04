import { useState, useRef, useEffect } from "react";
import type { CalendarEvent } from "../../types/type";
import { formatDate } from "../../utils/dateHelpers";

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

type EventLabelProps = {
  label: string;
  span: number;
  startCol: number;
  row: number;
  isMinNights: boolean;
  event?: CalendarEvent;
  startDate?: Date;
  isMobile: boolean;
};

const EventLabel = (props: EventLabelProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isCompressed, setIsCompressed] = useState(false);
  const labelRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState<'center' | 'left' | 'right'>('center');
  
  // Check if this is a single-day event
  const isSingleDay = props.span === 1;
  
  // Check if text is compressed
  useEffect(() => {
    if (!labelRef.current || !isSingleDay) return;
    
    const element = labelRef.current;
    const isTextCompressed = element.scrollWidth > element.clientWidth;
    setIsCompressed(isTextCompressed);
  }, [props.label, isSingleDay]);
  
  // Calculate popup position to prevent overflow
  useEffect(() => {
    if (!showPopup || !labelRef.current || !popupRef.current) return;
    
    requestAnimationFrame(() => {
      if (!labelRef.current || !popupRef.current) return;
      
      const labelElement = labelRef.current;
      const popupElement = popupRef.current;
      
      const rect = labelElement.getBoundingClientRect();
      const popupRect = popupElement.getBoundingClientRect();
      
      const centerLeft = rect.left + rect.width / 2;
      const popupWidth = popupRect.width || 120;
      const popupLeft = centerLeft - popupWidth / 2;
      
      const padding = 8;
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      
      if (popupLeft < padding) {
        setPopupPosition('left');
      } else if (popupLeft + popupWidth > viewportWidth - padding) {
        setPopupPosition('right');
      } else {
        setPopupPosition('center');
      }
    });
  }, [showPopup, props.isMobile]);
  
  // Format date for popup (e.g., "25 Dec")
  const formatDateForPopup = (date: Date): string => {
    const day = date.getDate();
    const month = months[date.getMonth()];
    return `${day} ${month}`;
  };
  
  const handleMouseEnter = () => {
    if (isSingleDay && (isCompressed || props.event)) {
      setShowPopup(true);
    }
  };
  
  const handleMouseLeave = () => {
    setShowPopup(false);
  };
  
  const handleClick = () => {
    if (isSingleDay && (isCompressed || props.event)) {
      setShowPopup(!showPopup);
    }
  };
  
  // Get event name - use event prop if available, otherwise use label
  const eventName = props.event?.name || props.label;
  const eventDate = props.startDate || (props.event ? new Date(props.event.start_date) : null);
  
  return (
    <>
      <div
        ref={labelRef}
        key={`evt-${props.startCol}-${props.row}-${props.label}`}
        className={`event-label${props.isMinNights ? ' min-nights' : ''}${isSingleDay && (isCompressed || props.event) ? ' event-label-interactive' : ''}`}
        style={{
          gridColumn: `${props.startCol} / span ${props.span}`,
          gridRow: props.row,
        }}
        title={!isSingleDay ? props.label : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {props.label}
      </div>
      {showPopup && isSingleDay && eventDate && (
        <div
          ref={popupRef}
          className={`event-popup event-popup-${popupPosition}`}
          style={{
            position: 'absolute',
            gridColumn: `${props.startCol} / span ${props.span}`,
            gridRow: props.row,
          }}
        >
          <div className={`event-popup-arrow event-popup-arrow-${popupPosition}`}></div>
          <div className="event-popup-content">
            <div className="event-popup-date">{formatDateForPopup(eventDate)}</div>
            <div className="event-popup-name">{eventName}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventLabel;

