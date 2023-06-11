import React, { useState } from 'react'
import Dashboard from '../Components/Layouts'
import { Card, Col, Row, Input, Table, Tag, Space, Select, Button } from 'antd'
import Modals from '../Components/Modal'
import { RiBillLine } from 'react-icons/ri'
import { FaMoneyBillWave, FaUsers, FaEye, FaTrash } from 'react-icons/fa'

const Home = () => {
    const { Search } = Input;
    const gridStyle = {
        width: '25%',
        textAlign: 'center',
    };

    const [openModal, setOpenModal] = useState(false)

    const open = () =>{
        setOpenModal(true)
    }
    const close = () =>{
        setOpenModal(false)
    }
    return (
        <Dashboard>
            <p className='text-start'>Beranda</p>
            <p className='text-center font-bold text-2xl mx-4'>PRODUCT LIST</p>
            <Row className='flex justify-between m-4'>
                <Select placeholder="Filter By Price" className='w-1/6'></Select>
                <Input className='w-1/6' placeholder='Search'/>
            </Row>
            <Row className='flex flex-wrap'>
                {/* Looping Disini Datanya */}
                <div class="flex-shrink-0 h-70 w-52 rounded-lg bg-gray-800 overflow-hidden shadow-lg m-4">
                    <img class="w-full h-48 object-cover" src="https://assets.klikindomaret.com/products/20064438/20064438_1.jpg" alt="Product Image" />
                    <div class="p-4">
                        <h3 class="text-lg font-bold text-white">Product Name with a Very Long Name That Wraps</h3>
                        <p class="text-gray-300">Rp. 50.000</p>
                    </div>
                    <div className='flex justify-end'>
                        <Button className='m-4 bg-blue-500 text-white' onClick={open}>
                            See Details
                        </Button>
                    </div>
                </div>
            </Row>
            <Modals title={'Details'} handleOpen={openModal} handleClose={close}>
                <Row className='flex justify-between m-4'>
                    <img className='w-full h-52 object-fill' src='https://assets.klikindomaret.com/products/20064438/20064438_1.jpg' alt='Product Image'/>
                </Row>
            </Modals>
        </Dashboard>
    )
}

export default Home