import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../Components/Layouts";
import { Card, Col, Row, Input, Table, Tag, Space, Select, Button, Pagination } from "antd";
import Modals from "../Components/Modal";
import { RiBillLine } from "react-icons/ri";
import { FaMoneyBillWave, FaUsers, FaEye, FaTrash } from "react-icons/fa";
import { doGetBarang } from "../Store/Actions/barangActions";

const {Option } = Select
const Home = () => {
  const dispatch = useDispatch();
  const [sortedInfo, setSortedInfo] = useState({})
  const { barang } = useSelector((state) => state.barangReducers);
  useEffect(() => {
    dispatch(doGetBarang());
  }, []);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (value) =>{
    const order = value === 'ascend' ? 'ascend' : 'descend'
    setSortedInfo({
        columnKey : 'harga_jual',
        order
    })
  }

  const open = () => {
    setOpenModal(true);
  };
  const close = () => {
    setOpenModal(false);
  };

  const dataSorted = barang.sort((a, b)=>{
    if(sortedInfo.order === 'ascend'){
        return a.harga_jual - b.harga_jual
    }else if(sortedInfo.order === 'descend'){
        return b.harga_jual - a.harga_jual
    }
    return 0;
  })
  
  return (
    <Dashboard>
      <p className="text-start">Beranda</p>
      <p className="text-center font-bold text-2xl mx-4">PRODUCT LIST</p>
      <Row className="flex justify-between m-4">
        <Select placeholder="Filter By Price" onChange={handleChange} className="w-1/6">
            <Option value='ascend' >Harga Terendah</Option>
            <Option value= 'descend'>Harga Tertinggi</Option>
        </Select>
      </Row>
      {/* Looping Disini Datanya */}
      <Row className="flex flex-wrap">
      {dataSorted.map((item, i) => (
          <div
            key={i}
            class="flex-shrink-0 h-70 w-56 rounded-lg bg-gray-800 overflow-hidden shadow-lg m-4"
          >
            <img
              class="w-56 h-48 object-cover"
              src={item.foto_barang}
              alt="Product Image"
            />
            <div class="p-4">
              <h3 class="text-lg font-bold text-white">
                {item.nama_barang}
              </h3>
              <p class="text-gray-300">{item.harga_jual}</p>
            </div>
            <div className="flex justify-end">
              <Button className="m-4 bg-blue-500 text-white" onClick={open}>
                See Details
              </Button>
            </div>
          </div>
      ))}
        </Row>
      <Modals title={"Details"} handleOpen={openModal} handleClose={close}>
        <Row className="flex justify-between m-4">
          <img
            className="w-full h-52 object-fill"
            src="https://assets.klikindomaret.com/products/20064438/20064438_1.jpg"
            alt="Product Image"
          />
        </Row>
      </Modals>
      <Pagination defaultCurrent={1} total={barang.length} defaultPageSize={8}/>
    </Dashboard>
  );
};

export default Home;
