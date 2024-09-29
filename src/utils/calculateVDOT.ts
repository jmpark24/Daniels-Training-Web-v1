export const timeStringToSeconds = (hours: number, minutes: number, seconds: number): number => {
  if (hours < 0 || minutes < 0 || seconds < 0) {
    return 0;
  }
  return hours * 3600 + minutes * 60 + seconds;
};

export const calculateMaleVDOT = (distanceKm: number, timeSeconds: number): number => {
  if (timeSeconds <= 0) {
    return 0;
  }
  const velocityMPerMin = (distanceKm * 1000) / (timeSeconds / 60);
  const vo2max = -4.6 + 0.182258 * velocityMPerMin + 0.000104 * velocityMPerMin * velocityMPerMin;
  const vdot =
    vo2max /
    (0.8 +
      0.1894393 * Math.exp((-0.012778 * timeSeconds) / 60) +
      0.2989558 * Math.exp((-0.1932605 * timeSeconds) / 60));
  return vdot;
};
