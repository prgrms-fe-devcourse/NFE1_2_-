import React, { useState, useEffect, useCallback } from 'react';
import './MbtiSelector.css';

type MbtiType = 'EI' | 'SN' | 'TF' | 'JP';

interface MbtiState {
  [key: string]: boolean;
}

interface MbtiRowProps {
  label: string;
  leftOption: string;
  rightOption: string;
  isRight: boolean;
  onChange: () => void;
}

interface MbtiSelectorProps {
  onMbtiChange: (mbti: string) => void;
}

const MbtiSelector: React.FC<MbtiSelectorProps> = ({ onMbtiChange }) => {
  const [mbti, setMbti] = useState<MbtiState>({
    EI: false,
    SN: false,
    TF: false,
    JP: false
  });

  const updateMbti = (key: MbtiType) => {
    setMbti((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const getMbtiResult = useCallback((): string => {
    return (
      (mbti.EI ? 'I' : 'E') +
      (mbti.SN ? 'N' : 'S') +
      (mbti.TF ? 'F' : 'T') +
      (mbti.JP ? 'P' : 'J')
    );
  }, [mbti]);

  useEffect(() => {
    const result = getMbtiResult();
    onMbtiChange(result);
  }, [getMbtiResult, onMbtiChange]);

  return (
    <div className="mbti-container">
      <div className="mbti-flex-container">
        <MbtiRow
          label="에너지의 방향"
          leftOption="E (외향형)"
          rightOption="I (내향형)"
          isRight={mbti.EI}
          onChange={() => updateMbti('EI')}
        />
        <MbtiRow
          label="인식 방식"
          leftOption="S (감각형)"
          rightOption="N (직관형)"
          isRight={mbti.SN}
          onChange={() => updateMbti('SN')}
        />
        <MbtiRow
          label="결정 방식"
          leftOption="T (사고형)"
          rightOption="F (감정형)"
          isRight={mbti.TF}
          onChange={() => updateMbti('TF')}
        />
        <MbtiRow
          label="삶의 패턴"
          leftOption="J (판단형)"
          rightOption="P (인식형)"
          isRight={mbti.JP}
          onChange={() => updateMbti('JP')}
        />
      </div>
      <div className="mbti-result">
        <p>선택된 MBTI <span className="mbti-result-text">{getMbtiResult()}</span></p>
      </div>
    </div>
  );
};

const MbtiRow: React.FC<MbtiRowProps> = ({ label, leftOption, rightOption, isRight, onChange }) => (
  <div className="mbti-row">
    <span className="mbti-label">{label}</span>
    <div className={`mbti-slider ${isRight ? 'right' : 'left'}`} onClick={onChange}>
      <div className="mbti-slider-option left">{leftOption}</div>
      <div className="mbti-slider-button"></div>
      <div className="mbti-slider-option right">{rightOption}</div>
    </div>
  </div>
);

export default MbtiSelector;