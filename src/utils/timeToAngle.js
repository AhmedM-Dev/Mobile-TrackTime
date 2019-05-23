const timeToAngle = time => {

  const t = parseInt(time[0]) + (parseInt(time[1]) / 60);

  if (t <= 12) {
    return ((t - 6) * 5) - 30;
  } else {
    return ((t - 12) * 5);
  }
}

export default timeToAngle;