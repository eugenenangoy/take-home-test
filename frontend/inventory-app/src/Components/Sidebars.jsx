import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'


const { Sider } = Layout
const Sidebar = ({ nav, collapsed }) => {

    const location = useLocation()
    const { SubMenu } = Menu
    const [selectedKeys, setSelectedKeys] = useState(location.pathname);

    useEffect(() => {
        setSelectedKeys(window.location.pathname);
    }, []);

    return (
        <Sider width={collapsed ? 120 : 225} trigger={null} collapsible collapsed={collapsed} className='relative '>
            <Menu
                className='p-5 fixed top-0 bg-[#3F72AF]'
                mode="inline"
                style={{ height: '100%', width: collapsed ? 80 : 225 }}
                selectedKeys={selectedKeys}
            // onClick={handleMenuClick}
            >
                <div className={`w-full ${collapsed ? 'p-0' : 'justify-center'} flex mb-6`}>
                    {collapsed ? <img src='images/logo2.svg' alt='logo' className='w-auto' /> :
                        <img src='images/logo.svg' alt='logo' className='w-auto' />}
                </div>
                {nav.map((item, index) => {
                    if (item.child) { // cek jika item memiliki subnav
                        return (
                            <SubMenu key={index} icon={item.icon} title={item.name} className={`text-white hover:text-white`}>
                                {item.child.map((childItem, childIndex) => (
                                    <Menu.Item key={`${index}-${childIndex}`} className={`${location.pathname === childItem.href ? 'bg-[#112D4E] text-white' : ''}`}>
                                        <Link to={childItem.href} className='flex gap-2 items-center'>
                                            <div className=' flex gap-2 items-center'>
                                                <span>{childItem.icon}</span>
                                                {childItem.name}
                                            </div>
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        )
                    } else { // jika tidak ada subnav
                        return (
                            <Menu.Item key={index} className={`${selectedKeys === item.href ? 'bg-[#112D4E]' : ''}`}>
                                <Link to={item.href} className='flex gap-3 items-center'>
                                    <div className='text-white flex gap-3 items-center'>
                                        <span>{item.icon}</span>
                                        {item.name}
                                    </div>
                                </Link>
                            </Menu.Item>
                        )
                    }
                })}
            </Menu>
        </Sider>
    )
}

export default Sidebar