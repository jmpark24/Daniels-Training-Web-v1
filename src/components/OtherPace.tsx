import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectClosestVDOT } from '../features/vdot/vdotSelectors';

const OtherPace: FC = () => {
  const closestVDOT = useSelector(selectClosestVDOT)!;
  return (
    <div className="mt-6 p-4 bg-green-50 rounded-md border-[1px]">
      <h3 className="text-lg font-semibold text-green-700">
        훈련기준이 되는 VDOT 지수: {closestVDOT?.VDOT}
      </h3>
      <p className="text-sm text-green-600 mb-2">동일 VDOT지수에서 타종목의 페이스:</p>
      <div className="mt-5 p-4 border-green-600 rounded-md border-[1px]">
        <ul className="space-y-2 text-sm text-green-600">
          <li className="flex justify-between">
            <span className="text-xl font-semibold">종목</span>
            <span className="text-xl font-semibold">페이스</span>
          </li>
          <li className="flex justify-between">
            <span>1500m:</span>
            <span>{closestVDOT['1500m']}</span>
          </li>
          <li className="flex justify-between">
            <span>Mile:</span>
            <span>{closestVDOT?.Mile}</span>
          </li>
          <li className="flex justify-between">
            <span>5km:</span>
            <span>{closestVDOT['5k']}</span>
          </li>
          <li className="flex justify-between">
            <span>8km:</span>
            <span>{closestVDOT['8k']}</span>
          </li>
          <li className="flex justify-between">
            <span>5 mile:</span>
            <span>{closestVDOT['5-mile']}</span>
          </li>
          <li className="flex justify-between">
            <span>10km:</span>
            <span>{closestVDOT['10k']}</span>
          </li>
          <li className="flex justify-between">
            <span>15km:</span>
            <span>{closestVDOT['15k']}</span>
          </li>
          <li className="flex justify-between">
            <span>10 mile:</span>
            <span>{closestVDOT['10-mile']}</span>
          </li>
          <li className="flex justify-between">
            <span>20km:</span>
            <span>{closestVDOT['20k']}</span>
          </li>
          <li className="flex justify-between">
            <span>하프마라톤:</span>
            <span>{closestVDOT['1/2 Marathon']}</span>
          </li>
          <li className="flex justify-between">
            <span>25km:</span>
            <span>{closestVDOT['25k']}</span>
          </li>
          <li className="flex justify-between">
            <span>30km:</span>
            <span>{closestVDOT['30k']}</span>
          </li>
          <li className="flex justify-between">
            <span>풀마라톤:</span>
            <span>{closestVDOT?.Marathon}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OtherPace;
