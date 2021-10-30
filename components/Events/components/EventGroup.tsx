import { EventSeason, SeasonalEvent } from "../../../shared/models/GetEventData";
import { GeneralStrings } from "../../../shared/models/GetEventsPageStrings";
import { ControlPoint } from "@material-ui/icons";
import { motion } from 'framer-motion';
import SeasonInfo from "./SeasonInfo";
import EventMonthsLayout from "./EventMonthsLayout";
import { useState } from "react";

export type Props = {
  title: string,
  eventSeason?: EventSeason,
  events?: SeasonalEvent[],
  stringsGen: GeneralStrings
}

// Animation
const variants = {
  expanded: { 
    opacity: 1, 
    height: "100%", 
    display: "block",
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.05
    }
  },
  collapsed: { 
    opacity: 0, 
    height: "0",
    transition: {
      when: "afterChildren"
    },
    transitionEnd: { 
      display: "none"
    }
  }
};

export default function EventGroup({title, eventSeason, events, stringsGen}: Props) {
  const [isGroupExpanded, setIsGroupExpanded] = useState(false);  


  const toggleExpanded: () => void = () => {
    setIsGroupExpanded(!isGroupExpanded);
  }

  return (
    
    <motion.article className="mb-2 last:mb-0" layout>
      {/* Event season name */}
      <motion.h2 
        className={`        
          text-3xl uppercase cursor-pointer select-none
          filter drop-shadow-lg
          ${isGroupExpanded ? 'text-blue-300' : 'text-gray-300'}                        
        `}
        onClick={ () => toggleExpanded() }
        layout
      >
        <ControlPoint fontSize="inherit" color="inherit" /> {title}
      </motion.h2>

      {/* Event data */}
      <motion.div className="border-l border-blue-300 pl-4"
        animate={ isGroupExpanded ? "expanded" : "collapsed" }
        variants = { variants }
        initial = { false }
        layout     
      >
        {/* Event season information */}
        {eventSeason && 
          <SeasonInfo 
            theme={eventSeason.theme} 
            seasonYears={eventSeason.seasonYears} 
            durationDays={eventSeason.durationDays}
            eventThemeLabel={stringsGen.eventThemeLabel}
            yearsShowingLabel={stringsGen.yearsShowingLabel}
            durationLabel={stringsGen.durationLabel}
          />
        }

        {/* Show some events! */}
        { (events && events.length > 0) 
          ? <EventMonthsLayout events={events} /> 
          : <motion.div layout className='text-blue-200 p-2'>{stringsGen.noEventsFound}</motion.div>
        }
      </motion.div>
    </motion.article>
    
  )
}
