export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  const dateWithoutTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );
  const nowWithoutTime = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const diffTime = nowWithoutTime.getTime() - dateWithoutTime.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? '오후' : '오전';
    const formattedHours = hours % 12 || 12;
    return `${ampm} ${formattedHours}:${minutes.toString().padStart(2, '0')}`;
  } else if (diffDays === 1) {
    return '어제';
  } else {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  }
};
