import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectCalculatedVDOT, selectClosestVDOT } from '../features/vdot/vdotSelectors';
import Vdot from './Vdot';
import OtherPace from './OtherPace';
import Training from './Training';

const Result: FC = () => {
  const calculatedVDOT = useSelector(selectCalculatedVDOT);
  const closestVDOT = useSelector(selectClosestVDOT);

  if (!calculatedVDOT || !closestVDOT) {
    return (
      <div className="max-w-md mx-auto mt-2 p-3 bg-white rounded-xl shadow-md">
        <h3 className="text-md font-bold mb-2 text-center text-blue-600">
          VDOT 지수를 산출하기 위해서는
        </h3>
        <div className="mb-4">
          <p className="block text-sm font-medium pt-1 text-gray-700">
            1. 완주한 대회의 거리를 선택
          </p>
          <p className="block text-sm font-medium pt-1 text-gray-700">2. 대회 기록을 입력</p>
          <p className="block text-sm font-medium pt-1 text-gray-700">
            3. VDOT 산출하기 버튼을 클릭
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <Vdot />
      <OtherPace />
      <Training />
    </div>
  );
};

export default Result;
