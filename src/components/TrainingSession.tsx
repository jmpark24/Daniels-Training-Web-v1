import { FC } from 'react';

interface TrainingSessionProps {
  type: 'E' | 'M' | 'T' | 'I' | 'R';
  intensity: {
    VDOT: number;
    'E/L Pace km'?: string;
    'E/L Pace mile'?: string;
    'MP mile'?: string;
    'T Pace 400'?: string;
    'T Pace 800'?: string;
    'T Pace 1000'?: string;
    'T Pace .68 mile'?: string;
    'T Pace mile'?: string;
    'I Pace 400'?: string;
    'I Pace 1000'?: string;
    'I Pace .68 mile'?: string;
    'I Pace 1200'?: string;
    'I Pace mile'?: string;
    'R Pace 200'?: string;
    'R Pace 400'?: string;
    'R Pace 800'?: string;
  };
}

interface TrainingData {
  [key: string]: {
    title: string;
    heartRate?: string;
    volume: string;
    paceKm?: string;
    paceMile?: string;
    pace400?: string;
    pace800?: string;
    pace1000?: string;
    pace200?: string;
  };
}

const TrainingSession: FC<TrainingSessionProps> = ({ type, intensity }) => {
  const trainingData: TrainingData = {
    E: {
      title: '가볍게 달리기',
      heartRate: '65-79%',
      volume: '주간주행거리 25% 이하 혹은 150분',
      paceKm: intensity['E/L Pace km'],
      paceMile: intensity['E/L Pace mile'],
    },
    M: {
      title: '마라톤페이스(MP)',
      heartRate: '80-90%',
      volume: '90분 이하 혹은 25-26km',
      paceMile: intensity['MP mile'],
    },
    T: {
      title: 'LT(젖산역치)훈련',
      heartRate: '88-92%',
      volume: '주간주행거리의 10% 이하 혹은 60분',
      pace400: intensity['T Pace 400'],
      pace800: intensity['T Pace 800'],
      pace1000: intensity['T Pace 1000'],
      paceMile: intensity['T Pace mile'],
    },
    I: {
      title: '인터벌훈련',
      heartRate: '98-100%',
      volume: '주간주행거리의 8%',
      pace400: intensity['I Pace 400'],
      pace1000: intensity['I Pace 1000'],
      paceMile: intensity['I Pace mile'],
    },
    R: {
      title: '반복훈련',
      volume: '주간주행거리의 5%',
      pace200: intensity['R Pace 200'],
      pace400: intensity['R Pace 400'],
      pace800: intensity['R Pace 800'],
    },
  };

  const session = trainingData[type];

  const shouldRender = (value: any) => value !== '-' && value !== null && value !== undefined;

  return (
    <div className="mt-2 px-4 py-2 bg-yellow-50 rounded-md border-yellow-600 border-[1px]">
      <div className="flex justify-between mt-2">
        <h3 className="text-4xl font-semibold text-yellow-700">{type}</h3>
        <h4 className="text-xl items-end flex ml-2 text-yellow-700">{session.title}</h4>
      </div>

      {session.heartRate && <p className="text-yellow-700 text-sm">심박수: {session.heartRate}</p>}
      <p className="text-yellow-700 text-sm">훈련량: {session.volume}</p>

      <ul className="space-y-2 text-sm text-yellow-600">
        {shouldRender(session.paceKm) && (
          <li className="flex justify-between">
            <span>Pace (km):</span>
            <span>{session.paceKm}</span>
          </li>
        )}
        {shouldRender(session.pace200) && (
          <li className="flex justify-between">
            <span>Pace 200m:</span>
            <span>{session.pace200}</span>
          </li>
        )}
        {shouldRender(session.pace400) && (
          <li className="flex justify-between">
            <span>Pace 400m:</span>
            <span>{session.pace400}</span>
          </li>
        )}
        {shouldRender(session.pace800) && (
          <li className="flex justify-between">
            <span>Pace 800m:</span>
            <span>{session.pace800}</span>
          </li>
        )}
        {shouldRender(session.pace1000) && (
          <li className="flex justify-between">
            <span>Pace 1000m:</span>
            <span>{session.pace1000}</span>
          </li>
        )}
        {shouldRender(session.paceMile) && (
          <li className="flex justify-between">
            <span>Pace (mile):</span>
            <span>{session.paceMile}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default TrainingSession;
