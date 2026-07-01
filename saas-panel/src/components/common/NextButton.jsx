import React from 'react';
import { Icon } from '@iconify/react';
import { useColorContext } from '../../context/context';

export default function NextButton({ onClick, currentIndex, steps, label, disabled }) {
  const { color } = useColorContext();
  const isLastStep = currentIndex === steps.length - 1;

  return (
    <button
      style={{ backgroundColor: color }}
      onClick={onClick}
      disabled={disabled}
      className="flex cursor-pointer gap-1 items-center font-semibold text-sm px-4 py-2 text-white rounded disabled:opacity-50"
    >
      {label}
      <Icon
        icon={isLastStep ? "" : "iconamoon:arrow-left-2-bold"}
        className={`text-xl ${!isLastStep ? "rotate-180" : ""}`}
      />
    </button>
  );
}
