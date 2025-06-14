import React from 'react';
import './Rules.css'

interface IProps {
  title: string;
  rules: string[];
}
const Rules:React.FC<IProps> = ({title,rules}) => {
  return (
    <div  className='rules'>
      <h1>{title}</h1>
      <div style={rules.length === 0 ? { display: 'none' } : {}}>{rules.map((label, index) => (<p>{label}</p>))}</div>
    </div>
  )
}
export default Rules;