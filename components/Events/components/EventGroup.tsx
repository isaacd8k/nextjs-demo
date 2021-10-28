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

export default function EventGroup({title, eventSeason, events, stringsGen}: Props) {
  const [isGroupExpanded, setIsGroupExpanded] = useState(false);

  const variants = {
    expanded: { opacity: 1, height: "100%", display: "block" },
    collapsed: { opacity: 0, height: "0", transitionEnd: { display: "none"}}
  };
  

  const toggleExpanded: () => void = () => {
    console.log('toggleExpanded() called')
    setIsGroupExpanded(!isGroupExpanded);
  }

  return (
    <article>
      {/* Event season name */}
      <h2 className='text-3xl uppercase' onClick={ () => toggleExpanded() }>
        <ControlPoint fontSize="inherit" color="inherit" /> {title}
      </h2>

      {/* Event data */}
      <motion.div className="border-l pl-4"
        animate={ isGroupExpanded ? "expanded" : "collapsed" }
        variants = { variants }
        initial = { false }
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
          : <>{stringsGen.noEventsFound}</>
        }
      </motion.div>
    </article>
  )
}
