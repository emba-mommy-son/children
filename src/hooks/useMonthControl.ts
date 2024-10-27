import {useState} from 'react';

export const useMonthControl = () => {
  const [date, setDate] = useState(() => ({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  }));

  // 현재 월인지 체크
  const isCurrentMonth = () => {
    const now = new Date();
    return date.year === now.getFullYear() && date.month === now.getMonth() + 1;
  };

  // month 감소(1월이면 1년전 12월로)
  const handlePrevMonth = () => {
    setDate(prev => ({
      year: prev.month === 1 ? prev.year - 1 : prev.year,
      month: prev.month === 1 ? 12 : prev.month - 1,
    }));
  };

  // month 증가(12월이면 1년후 1월로)
  const handleNextMonth = () => {
    setDate(prev => ({
      year: prev.month === 12 ? prev.year + 1 : prev.year,
      month: prev.month === 12 ? 1 : prev.month + 1,
    }));
  };

  return {
    date,
    isCurrentMonth,
    handlePrevMonth,
    handleNextMonth,
  };
};
