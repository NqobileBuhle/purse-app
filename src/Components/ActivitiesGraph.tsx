import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

interface Transaction {
  transactionId: string;
  date: string;
  Expense: string;
  description: string;
  Category: string;
  amount: number;
}

const getDayOfWeek = (dateString: string): string => {
  const date = new Date(dateString);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[date.getUTCDay()];
};

const ActivitiesGraph: React.FC = () => {
  const [weeklyPayments, setWeeklyPayments] = useState<{ [key: string]: number }>({
    Sunday: 0,
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
  });

  useEffect(() => {
    fetch('/../public/Report.json')
      .then(response => response.json())
      .then((data: { transactions: Transaction[] }) => {
        const paymentsByDay = data.transactions
          .filter(transaction => transaction.Category !== "Payments") // Filter for Payments category
          .reduce((acc, transaction) => {
            const day = getDayOfWeek(transaction.date); // Get the day of the week
            acc[day] = (acc[day] || 0) + transaction.amount; // Sum amounts for each day
            return acc;
          }, { ...weeklyPayments });

        setWeeklyPayments(paymentsByDay);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const lineChartData = {
    labels: Object.keys(weeklyPayments), // Days of the week
    datasets: [
      {
        label: 'Total payments recieved',
        data: Object.values(weeklyPayments), // Total payments for each day
        backgroundColor: '#6b21a8',
        borderColor: '#6b21a8',
        borderWidth: 1,
        pointRadius: 1,
        tension: 0.4,
        
      },
    ],
  };

  return (
    <div style={{ backgroundColor: '#333', padding: '1rem', borderRadius: '15px' }}>
      <h3 className = 'color-#fff text-center text-white'>Payments</h3>
      <Line data={lineChartData} />
    </div>
  );
};

export default ActivitiesGraph;
