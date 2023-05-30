import React from 'react';
import {ProgressBar} from 'react-toastify/dist/components';

interface ProgressBarProps {
  progress: number;
}

const CustomProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div>
      <ProgressBar 
        progress={progress}
        closeToast={()=>{}}
        delay={1000}
        isRunning={true}
        theme="light"
      />
    </div>
  );
};

export default CustomProgressBar;
