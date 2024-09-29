import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCalculatedVDOT } from '../features/vdot/vdotSelectors';
import { decrementByVDOT, incrementByVDOT } from '../features/vdot/vdotSlice';
import { incrementIntensity, decrementIntensity } from '../features/intensity/intensitySlice';
import { TiPlus as Plus } from 'react-icons/ti';
import { TiMinus as Minus } from 'react-icons/ti';

const Vdot: FC = () => {
  const calculatedVDOT = useSelector(selectCalculatedVDOT);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(incrementByVDOT());
    dispatch(incrementIntensity());
  };

  const handleDecrement = () => {
    dispatch(decrementByVDOT());
    dispatch(decrementIntensity());
  };

  return (
    <div className="p-2 bg-blue-50 rounded-md border-[1px]">
      <h3 className="text-lg font-semibold text-blue-700">VDOT 결과</h3>
      <div className="flex">
        <h3 className="text-lg font-semibold text-blue-700">
          계산된 VDOT: {calculatedVDOT?.toFixed(2)}
        </h3>
        <div className="ml-5 p-2 mx-1 bg-blue-600 rounded-md text-center text-lg justify-center items-center transition-transform transform active:scale-[0.98]">
          <Plus
            onClick={handleIncrement}
            className=" bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
          />
        </div>
        <div className="p-2 mx-1 bg-blue-600 rounded-md text-center text-lg transition-transform transform active:scale-[0.98]">
          <Minus
            onClick={handleDecrement}
            className="bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none"
          />
        </div>
      </div>
      <p className="text-sm text-blue-600">입력한 기록에 따라 계산된 VDOT 값입니다.</p>
    </div>
  );
};

export default Vdot;
