import React from 'react';
import { InputProps } from '../../utils/interfaces/commoninput.interface';
import ClayLabel from '@clayui/label';
import { ClayInput } from '@clayui/form';

const CommonInput: React.FC<InputProps> = ({ label, value, onChange, error }) => (
  <div>
    <ClayLabel>{label}:</ClayLabel>
    <ClayInput value={value} onChange={(e) => onChange(e.target.value)} />
    {error && <div style={{ color: 'red' }}>{error}</div>}
  </div>
);

export default CommonInput;
