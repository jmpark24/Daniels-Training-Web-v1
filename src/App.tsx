// import React, { useEffect, useState } from 'react';
// import { maleVdotData } from './constants/male';
// import { intensityData } from './constants/intensityData';
// import { VDOTData } from './type/VDOTData';
// import { IntensityData } from './type/intensityRawData';

// // selectedDistanceInKm을 함수 외부에 정의
// const selectedDistanceInKm: { [key: string]: number } = {
//   '800m': 0.8,
//   '': 1.5,
//   Mile: 1.60934,
//   '3k': 3,
//   '2-mile': 3.21868,
//   '5k': 5,
//   '8k': 8,
//   '5-mile': 8.04672,
//   '10k': 10,
//   '15k': 15,
//   '10-mile': 16.0934,
//   '20k': 20,
//   '1/2 Marathon': 21.0975,
//   '25k': 25,
//   '30k': 30,
//   Marathon: 42.195,
// };

// const timeStringToSeconds = (hours: number, minutes: number, seconds: number): number => {
//   if (hours < 0 || minutes < 0 || seconds < 0) {
//     return 0;
//   }
//   return hours * 3600 + minutes * 60 + seconds;
// };

// const calculateMaleVDOT = (distanceKm: number, timeSeconds: number): number => {
//   if (timeSeconds <= 0) {
//     return 0;
//   }
//   const velocityMPerMin = (distanceKm * 1000) / (timeSeconds / 60);
//   const vo2max = -4.6 + 0.182258 * velocityMPerMin + 0.000104 * velocityMPerMin * velocityMPerMin;
//   const vdot =
//     vo2max /
//     (0.8 +
//       0.1894393 * Math.exp((-0.012778 * timeSeconds) / 60) +
//       0.2989558 * Math.exp((-0.1932605 * timeSeconds) / 60));
//   return vdot;
// };

// const findClosestVDOTData = (vdotData: VDOTData[], vdot: number): VDOTData => {
//   const flooredVDOT = Math.floor(vdot);
//   let closest = vdotData[0];
//   let smallestDiff = Math.abs(flooredVDOT - closest.VDOT);
//   vdotData.forEach((data) => {
//     const currentDiff = Math.abs(flooredVDOT - data.VDOT);
//     if (currentDiff < smallestDiff) {
//       smallestDiff = currentDiff;
//       closest = data;
//     }
//   });
//   return closest;
// };

// const findClosestIntensityData = (intensityData: IntensityData[], vdot: number): IntensityData => {
//   const flooredVDOT = Math.floor(vdot);
//   let closest = intensityData[0];
//   let smallestDiff = Math.abs(flooredVDOT - closest.VDOT);
//   intensityData.forEach((data) => {
//     const currentDiff = Math.abs(flooredVDOT - data.VDOT);
//     if (currentDiff < smallestDiff) {
//       smallestDiff = currentDiff;
//       closest = data;
//     }
//   });
//   return closest;
// };

// const VDOTCalculator: React.FC = () => {
//   const [hours, setHours] = useState(0);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const [distance, setDistance] = useState<string>('10k'); // 문자열로 distance 타입을 지정
//   const [calculatedVDOT, setCalculatedVDOT] = useState<number | null>(null);
//   const [closestVDOT, setClosestVDOT] = useState<VDOTData | null>(null);
//   const [closestIntensity, setClosestIntensity] = useState<IntensityData | null>(null);

//   const raceDistances = [
//     '800m',
//     '1500m',
//     'Mile',
//     '3k',
//     '2-mile',
//     '5k',
//     '8k',
//     '5-mile',
//     '10k',
//     '15k',
//     '10-mile',
//     '20k',
//     '1/2 Marathon',
//     '25k',
//     '30k',
//     'Marathon',
//   ];

//   const handleTimeChange = (field: 'hours' | 'minutes' | 'seconds', value: number) => {
//     if (field === 'seconds' && value >= 60) {
//       setMinutes(minutes + Math.floor(value / 60));
//       value %= 60;
//     }
//     if (field === 'minutes' && value >= 60) {
//       setHours(hours + Math.floor(value / 60));
//       value %= 60;
//     }

//     if (field === 'hours') {
//       setHours(value);
//     } else if (field === 'minutes') {
//       setMinutes(value);
//     } else if (field === 'seconds') {
//       setSeconds(value);
//     }
//   };

//   const handleCalculateVDOT = () => {
//     const totalSeconds = timeStringToSeconds(hours, minutes, seconds);
//     if (totalSeconds === 0) {
//       alert('시간을 입력해주세요!');
//       return;
//     }

//     const vdot = calculateMaleVDOT(selectedDistanceInKm[distance], totalSeconds);
//     setCalculatedVDOT(vdot);

//     const closestData = findClosestVDOTData(maleVdotData, vdot);
//     setClosestVDOT(closestData);

//     const closestIntensityData = findClosestIntensityData(intensityData, vdot);
//     setClosestIntensity(closestIntensityData);
//   };

//   useEffect(() => {
//     if (calculatedVDOT) {
//       const closestData = findClosestVDOTData(maleVdotData, Number(calculatedVDOT));
//       setClosestVDOT(closestData);

//       const closestIntensityData = findClosestIntensityData(intensityData, Number(calculatedVDOT));
//       setClosestIntensity(closestIntensityData);
//     }
//   }, [calculatedVDOT]);

//   return (
//     <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
//       <h2 className="text-2xl font-bold mb-2 text-blue-600">VDOT지수를 산출하기위해서는</h2>
//       <p>1) 완주한 대회의 거리를 선택</p>
//       <p>2) 대회기록을 입력</p>
//       <p>3) VDOT 산출하기 버튼을 클릭</p>

//       <div className="mb-4">
//         <label className="block text-sm font-medium pt-2 text-gray-700">
//           완주한 대회를 선택하십시오:
//         </label>
//         <select
//           value={distance}
//           onChange={(e) => setDistance(e.target.value)} // 문자열로 변경
//           className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//         >
//           {raceDistances.map((race) => (
//             <option key={race} value={race}>
//               {race}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div className="mb-4">
//         <label className="block text-sm font-medium text-gray-700">시간 (시간:분:초):</label>
//         <div className="mt-1 flex rounded-md shadow-sm">
//           <input
//             type="number"
//             value={hours}
//             onChange={(e) => handleTimeChange('hours', Number(e.target.value))}
//             className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="시간"
//           />
//           <input
//             type="number"
//             value={minutes}
//             onChange={(e) => handleTimeChange('minutes', Number(e.target.value))}
//             className="flex-1 min-w-0 block w-full px-3 py-2 border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="분"
//           />
//           <input
//             type="number"
//             value={seconds}
//             onChange={(e) => handleTimeChange('seconds', Number(e.target.value))}
//             className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
//             placeholder="초"
//           />
//         </div>
//       </div>

//       <button
//         onClick={handleCalculateVDOT}
//         className="w-full mt-4 py-2 px-4 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
//       >
//         VDOT 산출하기
//       </button>

//       {calculatedVDOT !== null && (
//         <div className="mt-6 p-4 bg-blue-50 rounded-md">
//           <div className="flex">
//             <h3 className="text-lg font-semibold text-blue-700">
//               계산된 VDOT: {calculatedVDOT.toFixed(2)}
//             </h3>
//             <div className="px-2 mx-1 bg-blue-600 rounded-md text-center text-lg">
//               <button
//                 onClick={() => setCalculatedVDOT(calculatedVDOT + 1)}
//                 className=" text-white font-semibold"
//               >
//                 +
//               </button>
//             </div>
//             <div className="px-2 mx-1 bg-blue-600 rounded-md text-center text-lg">
//               <button
//                 onClick={() => setCalculatedVDOT(calculatedVDOT - 1)}
//                 className=" text-white font-semibold"
//               >
//                 -
//               </button>
//             </div>
//           </div>
//           <p className="text-sm text-blue-600">입력한 기록에 따라 계산된 VDOT 값입니다.</p>
//         </div>
//       )}

//       {closestVDOT && (
//         <div className="mt-6 p-4 bg-green-50 rounded-md">
//           <h3 className="text-lg font-semibold text-green-700">
//             훈련기준이 되는 VDOT 지수: {closestVDOT.VDOT}
//           </h3>
//           <p className="text-sm text-green-600 mb-2">동일 VDOT지수에서 타종목의 페이스:</p>
//           <ul className="space-y-2 text-sm text-green-600">
//             <li className="flex justify-between">
//               <span>1500m:</span>
//               <span>{closestVDOT['1500m']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>Mile:</span>
//               <span>{closestVDOT.Mile}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>5km:</span>
//               <span>{closestVDOT['5k']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>8km:</span>
//               <span>{closestVDOT['8k']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>5 mile:</span>
//               <span>{closestVDOT['5-mile']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>10km:</span>
//               <span>{closestVDOT['10k']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>15km:</span>
//               <span>{closestVDOT['15k']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>10 mile:</span>
//               <span>{closestVDOT['10-mile']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>20km:</span>
//               <span>{closestVDOT['20k']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>하프마라톤:</span>
//               <span>{closestVDOT['1/2 Marathon']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>25km:</span>
//               <span>{closestVDOT['25k']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>30km:</span>
//               <span>{closestVDOT['30k']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>풀마라톤:</span>
//               <span>{closestVDOT.Marathon}</span>
//             </li>
//           </ul>
//         </div>
//       )}

//       {closestIntensity && (
//         <div className="mt-6 p-4 bg-yellow-50 rounded-md">
//           <h3 className="text-lg font-semibold text-yellow-700">훈련종류에 따른 페이스</h3>
//           <p className="text-sm text-yellow-700 mb-2">동일 VDOT지수에서 타종목의 페이스:</p>

//           <div className="flex justify-between mt-2">
//             <h3 className="text-4xl font-semibold text-yellow-700">E</h3>
//             <h4 className="text-xl items-end flex ml-2 text-yellow-700">가볍게 달리기</h4>
//           </div>
//           <p className="text-yellow-700 text-sm">심박수: 65-79%</p>
//           <p className="text-yellow-700 text-sm">훈련량: 주간주행거리 25% 이하 혹은 150분</p>
//           <ul className="space-y-2 text-sm text-yellow-600">
//             <li className="flex justify-between">
//               <span>E/L Pace (km):</span>
//               <span>{closestIntensity['E/L Pace km']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>E/L Pace (mile):</span>
//               <span>{closestIntensity['E/L Pace mile']}</span>
//             </li>
//           </ul>

//           <div className="flex justify-between mt-2">
//             <h3 className="text-4xl font-semibold text-yellow-700">M</h3>
//             <h4 className="text-xl items-end flex ml-2 text-yellow-700">마라톤페이스(MP)</h4>
//           </div>
//           <p className="text-yellow-700 text-sm">심박수: 80-90%</p>
//           <p className="text-yellow-700 text-sm">훈련량: 90분이하 혹은 25-26km</p>
//           <ul className="space-y-2 text-sm text-yellow-600">
//             <li className="flex justify-between">
//               <span>MP km:</span>
//               <span>{closestIntensity['MP mile']}</span>
//             </li>
//           </ul>

//           <div className="flex justify-between mt-2">
//             <h3 className="text-4xl font-semibold text-yellow-700">T</h3>
//             <h4 className="text-xl items-end flex ml-2 text-yellow-700">LT(젖산역치)훈련</h4>
//           </div>
//           <p className="text-yellow-700 text-sm">심박수: 88-92%</p>
//           <p className="text-yellow-700 text-sm">훈련량: 주간주행거리의 10%이하 혹은 60분</p>
//           <ul className="space-y-2 text-sm text-yellow-600">
//             <li className="flex justify-between">
//               <span>T Pace 400m:</span>
//               <span>{closestIntensity['T Pace 400']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>T Pace 800m:</span>
//               <span>{closestIntensity['T Pace 800']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>T Pace 1000m:</span>
//               <span>{closestIntensity['T Pace 1000']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>T Pace .68 mile:</span>
//               <span>{closestIntensity['T Pace .68 mile']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>T Pace mile:</span>
//               <span>{closestIntensity['T Pace mile']}</span>
//             </li>
//           </ul>

//           <div className="flex justify-between mt-2">
//             <h3 className="text-4xl font-semibold text-yellow-700">I</h3>
//             <h4 className="text-xl items-end flex ml-2 text-yellow-700">인터벌훈련</h4>
//           </div>
//           <p className="text-yellow-700 text-sm">심박수: 98-100%</p>
//           <p className="text-yellow-700 text-sm">훈련량: 주간주행거리의 8%</p>
//           <ul className="space-y-2 text-sm text-yellow-600">
//             <li className="flex justify-between">
//               <span>I Pace 400m:</span>
//               <span>{closestIntensity['I Pace 400']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>I Pace 1000m:</span>
//               <span>{closestIntensity['I Pace 1000']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>I Pace .68 mile:</span>
//               <span>{closestIntensity['I Pace .68 mile']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>I Pace 1200m:</span>
//               <span>{closestIntensity['I Pace 1200']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>I Pace mile:</span>
//               <span>{closestIntensity['I Pace mile']}</span>
//             </li>
//           </ul>

//           <div className="flex justify-between mt-2">
//             <h3 className="text-4xl font-semibold text-yellow-700">R</h3>
//             <h4 className="text-xl items-end flex ml-2 text-yellow-700">반복훈련</h4>
//           </div>
//           <p className="text-yellow-700 text-sm">훈련량: 주간주행거리의 5%</p>
//           <ul className="space-y-2 text-sm text-yellow-600">
//             <li className="flex justify-between">
//               <span>R Pace 200m:</span>
//               <span>{closestIntensity['R Pace 200']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>R Pace 400m:</span>
//               <span>{closestIntensity['R Pace 400']}</span>
//             </li>
//             <li className="flex justify-between">
//               <span>R Pace 800m:</span>
//               <span>{closestIntensity['R Pace 800']}</span>
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VDOTCalculator;

import { Provider } from 'react-redux';
import store from './app/store';
import Calculator from './components/Calculator';
import Result from './components/Result';

const App = () => {
  return (
    <Provider store={store}>
      <div className="max-w-lg mx-auto p-6">
        <Calculator />
        <Result />
      </div>
    </Provider>
  );
};

export default App;
