import React, {useState, useEffect} from 'react';
import FullCalendar, { formatDate } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';


export default function Scheduler (){

  const [trainings, setTrainings] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/gettrainings')
    .then(result => result.json())
    .then(data => formatTrainings(data))
  }

  const formatTrainings = (trains) => {
    setTrainings(trains.map((train) => ({
      id: train.id,
      title: train.activity + ', ' + train.customer.firstname + ' ' + train.customer.lastname + ', ' + train.duration + ' minutes',
      start: train.date
     }))
     );
     console.log(trainings);
  }


  return(
    <div>
    <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView="dayGridMonth"
        events={trainings}
      />
    </div>
  )
}