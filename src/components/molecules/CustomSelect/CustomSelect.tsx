import { Select, Tag } from 'antd';
import React from 'react';
import '../CustomSelect/CustomSelect.css';
const options = [{ value: 'gold' }, { value: 'black' }, { value: 'green' }, { value: 'blue' }];

const tagRender = (props : any) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3, display:'flex', alignItems:'center', minHeight:32,fontSize:14 }}
    >
      {label}
    </Tag>
  );
};

const CustomSelect: React.FC = () => (
  <Select
    mode="multiple"
    placeholder="select Color"
    tagRender={tagRender}
    style={{ width: '50%' }}
    options={options}
  />
);

export default CustomSelect;