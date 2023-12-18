import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps } from 'antd';
import React from 'react';
import style from './MoreInfoMenu.module.css';

// const items: MenuProps['items'] = [
//   {
//     label: 'Edit',
//     key: '0',
//     onClick: (e) => console.log(e)
//   },
//   {
//     label: 'Delete',
//     key: '1',
//     onClick: (e) => console.log(e)
//   },

// ];

interface MoreInfoMenuProps {
items: MenuProps['items'];
}

const MoreInfoMenu = ({items}: MoreInfoMenuProps ) => {
  return (
    <Dropdown menu={{ items }} trigger={['click']}>
      <button className={style['menu-button']} onClick={(e) => e.preventDefault()}>
        <MoreOutlined className={style['more-info-icon']} />{' '}
      </button>
    </Dropdown>
  );
};

export default MoreInfoMenu;
