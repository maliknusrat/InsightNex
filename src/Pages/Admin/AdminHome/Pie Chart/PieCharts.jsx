// import  { PureComponent } from 'react';
import { PieChart, Pie, } from 'recharts';

const data01 = [
  { name: 'Returnable', value: 40 },
  { name: 'Non-Retunrnable', value: 60 },
 
];
const data02 = [
  { name: 'Returnable', value: 40 },
  { name: 'Non-Retunrnable', value: 60 },
];


export default function PieCharts() {
  return (
    <div>
      <div>
    <h2 className="text-4xl text-center font-bold mt-10">Pie Chart</h2>
  </div>
    <PieChart className='flex items-center justify-center mx-auto' width={400} height={400}>
     
      <Pie
        data={data01}
        dataKey="value"
        cx={200}
        cy={200}
        outerRadius={60}
        fill="#8884d8"
      />
      <Pie
        data={data02}
        dataKey="value"
        cx={200}
        cy={200}
        innerRadius={70}
        outerRadius={90}
        fill="#82ca9d"
        label
      />
    </PieChart>
    </div>
  );
}



