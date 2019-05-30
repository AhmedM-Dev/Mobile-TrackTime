import React from 'react';
import { View, Text } from 'native-base';
import { ProgressCircle } from 'react-native-svg-charts';
import { split, parseInt } from 'lodash';

import timeToAngle from '../../../utils/timeToAngle';


const PI = 3.14159265359;

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
          progressColor={'#EC8181'}
        />
      }
      <View style={{ width: 200, height: 200, position: 'absolute', justifyContent: 'center', alignItems: 'center', top: -3, right: -3 }}>
        <Text>{} of delay</Text>
        <Text>{} worked</Text>
        <Text>{} of pause</Text>
      </View>
    </>
  )
}

export default AttendanceClock;
