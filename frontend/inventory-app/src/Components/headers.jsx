import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaUserCircle } from 'react-icons/fa'
import { Avatar, Space, Dropdown } from 'antd';
import { Link } from 'react-router-dom';

const Headers = ({ click }) => {
    const change = () => {
        click();
    };

    const items = [
        {
            label: <Link to="/profile">Profile</Link>,
            key: '0',
        },
        {
            type: 'divider',
        },
        {
            label: <Link to='/' onClick={()=> localStorage.clear()}>Logout</Link>,
            key: '1',
        },
    ];
    return (
        <>
            <div className='flex justify-between p-4 items-center'>
                <GiHamburgerMenu className='text-lg cursor-pointer hidden sm:block' onClick={change} />
                <div className='flex gap-3 items-center pr-4 ml-auto'>
                    <span className='font-semibold'>User</span>
                    <Dropdown
                        menu={{
                            items,
                        }}
                        trigger={['click']}
                    >
                        <Space size={16} wrap>
                            <Avatar
                                style={{ cursor: 'pointer', backgroundColor: '#112D4E', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                                icon={<FaUserCircle />}
                            />
                        </Space>
                    </Dropdown>
                </div>
            </div>
        </>
    )
}

export default Headers