import Sidebar from './Sidebars'
import Headers from './headers';
import { Layout } from 'antd'
import { useState } from 'react'
import { FaCashRegister, FaHome, FaUsers, FaUsersCog, FaMoneyBillWave, FaBook, FaDatabase, FaMoneyCheck } from 'react-icons/fa';
import { MdLocalLaundryService, MdPriceChange } from 'react-icons/md'
import { GiClothes } from 'react-icons/gi'

const Dashboard = ({ children }) => {
    const [collapsed, setCollapsed] = useState(true)
    const { Content } = Layout
    const navigation = [
        {
            name: 'Beranda',
            icon: <FaHome />,
            href: '/beranda'
        },
        {
            name: 'Data Barang',
            icon: <FaCashRegister />,
            href: '/barang'
        },
    ]
    const collapse = () => {
        setCollapsed(!collapsed)
    }


    return (
        <>
            <Layout className='bg-[#DBE2EF]' hasSider>
                <Sidebar nav={navigation} collapsed={collapsed} />
                <Content style={{ minHeight: "100vh" }}>
                    <Headers click={collapse} />
                    <Content className='py-4 px-8' style={{ minHeight: '85vh' }}>
                        {children}
                    </Content>
                </Content>
            </Layout>
        </>
    )
}

export default Dashboard