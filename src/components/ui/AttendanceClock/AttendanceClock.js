import React from 'react';
import { ProgressCircle } from 'react-native-svg-charts';
import { View } from 'native-base';
import { split, parseInt, take } from 'lodash';


const PI = 3.14159265359;

const timeToAngle = time => {

  const t = parseInt(time[0]) + (parseInt(time[1]) / 60);

  if (t <= 12) {
    return ((t - 6) * 5) - 30;
  } else {
    return ((t - 12) * 5);
  }
}

const AttendanceClock = props => {
  return (
    <>
      <ProgressCircle
        style={{ width: 200, height: 200, position: 'absolute', top: -3, right: -3, zIndex: 11 }}
        startAngle={(PI / 30) * timeToAngle(split(props.attendances[0], ':'))}
        endAngle={(PI / 30) * timeToAngle(split(props.attendances[3], ':'))}
        progress={1}
        progressColor={'#1D8348'}
      />
      <ProgressCircle
        style={{ width: 200, height: 200, position: 'absolute', top: -3, right: -3, zIndex: 12 }}
        startAngle={(PI / 30) * timeToAngle(split(props.attendances[1], ':'))}
        endAngle={(PI / 30) * timeToAngle(split(props.attendances[2], ':'))}
        progress={1}
        progressColor={'#FF8000'}
      />
      {
        timeToAngle(split(props.attendances[0], ':')) > -15 &&
        <ProgressCircle
          style={{ width: 200, height: 200, position: 'absolute', top: -3, right: -3, zIndex: 10 }}
          startAngle={-(PI / 2)}
          endAngle={(PI / 30) * (timeToAngle(split(props.attendances[0], ':'))+0.5)}
          progress={1}
          progressColor={'#AB2228'}
        />
      }
    </>
  )
}

export default AttendanceClock;
