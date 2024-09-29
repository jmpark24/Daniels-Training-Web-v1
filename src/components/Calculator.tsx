import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCalculatedVDOT, setClosestVDOT } from '../features/vdot/vdotSlice';
import { setClosestIntensity } from '../features/intensity/intensitySlice';
import { timeStringToSeconds, calculateMaleVDOT } from '../utils/calculateVDOT';
import { maleVdotData } from '../constants/VDOTData';
import { VDOTData } from '../types/VDOTData';
import { findClosestData } from '../utils/findClosestData';

const Calculator: FC = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [distance, setDistance] = useState('10k');

  const dispatch = useDispatch();

  const handleCalculateVDOT = () => {
    const totalSeconds = timeStringToSeconds(hours, minutes, seconds);
    const distanceInKm = {
      '1500m': 1.5,
      Mile: 1.60934,
      '3k': 3,
      '2-mile': 3.21868,
      '5k': 5,
      '8k': 8,
      '5-mile': 8.04672,
      '10k': 10,
      '15k': 15,
      '10-mile': 16.0934,
      '20k': 20,
      '1/2 Marathon': 21.0975,
      '25k': 25,
      '30k': 30,
      Marathon: 42.195,
    }[distance];

    if (distanceInKm && totalSeconds > 0) {
      const vdot = calculateMaleVDOT(distanceInKm, totalSeconds);
      dispatch(setCalculatedVDOT(vdot));

      // VDOT 계산 후 가장 가까운 VDOT 데이터 설정
      const closestVDOT = findClosestData<VDOTData>(maleVdotData, vdot);
      if (closestVDOT) {
        dispatch(setClosestVDOT(closestVDOT));
      }

      // Intensity 계산을 위해 계산된 VDOT 값을 직접 전달
      dispatch(setClosestIntensity(vdot));
    } else {
      alert('유효한 시간과 거리를 입력하세요!');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border-[1px]">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">VDOT 계산기</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium pt-2 text-gray-700">
          완주한 대회를 선택하십시오:
        </label>
        <select
          value={distance}
          onChange={(e) => setDistance(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="1500m">1.5M</option>
          <option value="Mile">1 Mile</option>
          <option value="3k">3Km</option>
          <option value="2-mile">2 Mile</option>
          <option value="5k">5Km</option>
          <option value="8k">8Km</option>
          <option value="5-mile">5 Mile</option>
          <option value="10k">10Km</option>
          <option value="15k">15Km</option>
          <option value="10-mile">10 Mile</option>
          <option value="20k">20Km</option>
          <option value="1/2 Marathon">하프 마라톤</option>
          <option value="25k">25Km</option>
          <option value="30k">30Km</option>
          <option value="Marathon">풀 마라톤</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">시간 (시간:분:초):</label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="시간"
          />
          <input
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            className="flex-1 min-w-0 block w-full px-3 py-2 border-t border-b border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="분"
          />
          <input
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="초"
          />
        </div>
      </div>
      <div className="bg-blue-600 rounded-md text-center text-lg justify-center items-center transition-transform transform active:scale-[0.98]">
        <button
          onClick={handleCalculateVDOT}
          className="w-full  py-2 px-4 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
        >
          VDOT 산출하기
        </button>
      </div>
    </div>
  );
};

export default Calculator;
