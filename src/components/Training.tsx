import { FC } from 'react';
import { useSelector } from 'react-redux';
import { selectClosestIntensity } from '../features/intensity/intensitySelectors';
import TrainingSession from './TrainingSession';

const Training: FC = () => {
  const closestIntensity = useSelector(selectClosestIntensity);

  if (!closestIntensity) {
    return <p className="text-red-600">훈련 데이터가 없습니다.</p>;
  }

  return (
    <div className="mt-6 p-4 bg-yellow-50 rounded-md border-[1px]">
      <h3 className="text-lg font-semibold text-yellow-700">훈련종류에 따른 페이스</h3>
      <p className="text-sm text-yellow-700 mb-2">동일 VDOT지수에서 타종목의 페이스:</p>
      <div className="mt-5">
        <TrainingSession type="E" intensity={closestIntensity} />
        <TrainingSession type="M" intensity={closestIntensity} />
        <TrainingSession type="T" intensity={closestIntensity} />
        <TrainingSession type="I" intensity={closestIntensity} />
        <TrainingSession type="R" intensity={closestIntensity} />
      </div>
    </div>
  );
};

export default Training;
