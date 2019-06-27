import React from 'react';
import { View, Text } from 'native-base';
import { ProgressCircle } from 'react-native-svg-charts';
import { split, parseInt } from 'lodash';

import timeToAngle from '../../../utils/timeToAngle';


const PI = 3.14159265359;

const AttendanceClock = props => {

  const displayPauses = () => {
    let pauses = [];
    for (let i = 1; i <= props.attendances.length - 2; i += 2) {
      pauses.push(
        <ProgressCircle
          key={i}
          style={{ width: 200, height: 200, position: 'absolute', top: -3, right: -3, zIndex: 12 }}
          startAngle={(PI / 30) * timeToAngle(split(props.attendances[i], ':'))}
          endAngle={(PI / 30) * timeToAngle(split(props.attendances[i + 1], ':'))}
          progress={1}
          progressColor={'#7E0953'}
        />
      )
    }

    return pauses;
  }

  return (
    <>
      {props.data && props.data.workTime && props.data.workTime !== -1 ?
        <>
          <ProgressCircle
            style={{ width: 200, height: 200, position: 'absolute', top: -3, right: -3, zIndex: 11 }}
            startAngle={(PI / 30) * timeToAngle(split(props.attendances[0], ':'))}
            endAngle={(PI / 30) * timeToAngle(split(props.attendances[props.attendances.length - 1], ':'))}
            progress={1}
            progressColor={'#1D8348'}
          />
          {props.attendances && props.attendances.length > 2 && displayPauses().map(item => item)}
          {
            timeToAngle(split(props.attendances[0], ':')) > -15 &&
            <ProgressCircle
              style={{ width: 200, height: 200, position: 'absolute', top: -3, right: -3, zIndex: 10 }}
              startAngle={-(PI / 2)}
              endAngle={(PI / 30) * (timeToAngle(split(props.attendances[0], ':')) + 0.5)}
              progress={1}
              progressColor={'#EC8181'}
            />
          }
          <View style={{ width: 200, height: 200, position: 'absolute', justifyContent: 'center', alignItems: 'center', top: -3, right: -3 }}>
            {props.data.delay !== -1 && <Text style={{ color: '#EC8181', fontSize: 12 }}>{props.data.delay !== -1 ? props.data.delay : ''} of delay</Text>}
            <Text style={{ color: '#1D8348', fontSize: 12 }} >{props.data.workTime} of work</Text>
            <Text style={{ color: '#7E0953', fontSize: 12 }} >{props.data.pauseTime} of pause</Text>
          </View>
        </>
        :
        <View style={{ width: 200, height: 200, position: 'absolute', justifyContent: 'center', alignItems: 'center', top: -3, right: -3 }}>
          <Text style={{ color: '#EC8181', fontSize: 12 }}>Invalid Attendances</Text>
        </View>
      }
    </>
  )
}

export default AttendanceClock;
