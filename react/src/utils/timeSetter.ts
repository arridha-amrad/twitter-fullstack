export default function timeSetter(date: string) {
  const oneMinuteMilliSeconds = 1000 * 60;
  const oneHourMilliSeconds = 1000 * 60 * 60;
  const OneDayInMilliSeconds = 1000 * 60 * 60 * 24;

  const postTime = new Date(date).getTime();
  const currTime = new Date().getTime();
  const timeDifferentInMilliSeconds = currTime - postTime;
  if (timeDifferentInMilliSeconds < OneDayInMilliSeconds) {
    if (timeDifferentInMilliSeconds < oneMinuteMilliSeconds) {
      return "just now";
    } else if (
      timeDifferentInMilliSeconds >= oneMinuteMilliSeconds &&
      timeDifferentInMilliSeconds < oneHourMilliSeconds
    ) {
      const result = Math.ceil(
        timeDifferentInMilliSeconds / oneMinuteMilliSeconds
      );
      return `${result.toString()}m ago`;
    } else {
      const result = Math.ceil(
        timeDifferentInMilliSeconds / oneHourMilliSeconds
      );
      return `${result.toString()}h ago`;
    }
  } else {
    return Intl.DateTimeFormat("en-US").format(new Date(date));
  }
}
