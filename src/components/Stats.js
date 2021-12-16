import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';

export default function Stats() {

  const [activityData, setActivitydata] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/trainings')
    .then(result => result.json())
    .then(data => setActivitydata(
      _(data.content).groupBy('activity').map((activity, index) => ({
            activity: index,
            duration: _.sumBy(activity, 'duration')
          })).value()
        ))
  }

  return(
    <div style={{display: 'flex',  justifyContent:'center'}}>
      
      <BarChart
        width={1200}
        height={500}
        data={activityData}
        margin={{ top: 10, right: 20, left: 10, bottom: 5 }}
      >
      <XAxis dataKey="activity" />
      <YAxis unit=" min"/>
      <CartesianGrid stroke="#e7f0c9" />
      <Bar fill="#f0e4c9" dataKey="duration" stroke="#e7f0c9" barSize={80}/>
    </BarChart>
    </div>
  )

}