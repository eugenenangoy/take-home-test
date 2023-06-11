import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Layouts";
import { Button, Form, Input, Modal, Space, Table, Row } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modals from "../Components/Modal";
import { doAddBarang, doDeleteBarang, doEditBarang, doGetBarang } from "../Store/Actions/barangActions";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
// import FormData from 'form-data'; 

const { confirm } = Modal;
const ListBarang = () => {
  const dispatch = useDispatch();
  const { barang } = useSelector((state) => state.barangReducers);

  useEffect(() => {
    dispatch(doGetBarang());
  }, [barang]);
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [search, setSearch] = useState('')
  const showModal = () => {
    setOpenModal(true);
  };
  const close = () => {
    setOpenModal(false);
  };
  const [editValue, setEditValue] = useState({
    id : '',
    nama_barang : '',
    harga_jual : '',
    harga_beli : '',
    stok_barang : '',
    foto : []
  });
  const [addValue, setAddValue] = useState({
    nama_barang : '',
    harga_jual : '',
    harga_beli : '',
    stok_barang : '',
    foto : []
  })
  const editData = (data) => {
    setOpenModalEdit(true);
    // console.log(data);
    setEditValue({
      id : data.id ,
      nama_barang: data.nama_barang,
      harga_jual: data.harga_jual,
      harga_beli: data.harga_beli,
      stok_barang: data.stok_barang,
      foto: data.foto_barang,
    });
  };
  
  const deleteItems = (data) => {
    confirm({
      title: "Anda Yakin Ingin Menghapus Data Ini?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log(data);
        dispatch(doDeleteBarang(data))
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  const columnTable = [
    {
      title: "Nama Barang",
      dataIndex: "nama_barang",
      key: "nama_barang",
    },
    {
      title: "Harga Jual",
      dataIndex: "harga_jual",
      key: "harga_jual",
    },
    {
      title: "Harga Beli",
      dataIndex: "harga_beli",
      key: "harga_beli",
    },
    {
      title: "Jumlah Barang",
      dataIndex: "stok_barang",
      key: "stok_barang",
    },
    {
      title: "Gambar Barang",
      dataIndex: "foto_barang",
      key: "foto_barang",
      render: (_, record) => <img className="w-24" src={record.foto_barang} />,
    },
    {
      title: "Actions",
      dataIndex: "x",
      render: (_, record) => (
        <Space size="middle">
          <FaEdit
            className="cursor-pointer text-blue-600"
            onClick={() => editData(record)}
          />
          <FaTrash
            className="cursor-pointer text-blue-600"
            onClick={()=>deleteItems(record.id)}
          />
        </Space>
      ),
    },
  ];
  const onFinish = () => {
    const formData = new FormData();
    formData.append('foto', addValue.foto[0]);
    formData.append('nama_barang', addValue.nama_barang);
    formData.append('harga_jual',parseInt(addValue.harga_jual))
    formData.append('harga_beli',parseInt(addValue.harga_beli));
    formData.append('stok_barang',parseInt(addValue.stok_barang))
    // console.log(formData)
    dispatch(doAddBarang(formData));
    setAddValue({
      nama_barang : '',
      harga_jual : '',
      harga_beli : '',
      stok_barang : '',
      foto : []
    })
    setOpenModal(false);
  };
  const onFinishEdit = () => {
    const body = new FormData()
    console.log(editValue)
    body.append('id', editValue.id)
    body.append('foto', editValue.foto[0]);
    body.append('nama_barang', editValue.nama_barang);
    body.append('harga_jual',editValue.harga_jual)
    body.append('harga_beli',editValue.harga_beli);
    body.append('stok_barang',editValue.stok_barang);
    dispatch(doEditBarang({id : editValue.id, body}))
    setOpenModalEdit(false)
  };
  const filterData = barang.filter((item)=>{
    if(search == ""){
      return item
    }else{
      return item.nama_barang.toLowerCase().includes(search)
    }
  })
  const { Search } = Input;
  return (
    <Dashboard>
      <h1 className="flex justify-center font-bold mb-4 text-2xl">
        List Barang
      </h1>
      <Row className="flex justify-between m-4">
        <Button onClick={showModal} className="bg-blue-500 text-white">
          Tambah Barang
        </Button>
        <Search className="w-1/6" placeholder="Cari Barang" onChange={(e)=> setSearch(e.target.value.toLocaleLowerCase())}/>
      </Row>
      <Table dataSource={filterData} columns={columnTable} className="mx-4" />

      <Modals
        handleOpen={openModal}
        handleClose={close}
        title={"Tambah / Edit Barang "}
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
          encType="multipart/form-data"
        >
          <Form.Item
            label="Nama Barang"
            rules={[
              { required: true, message: "Nama Barang Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="Masukkan Nama Barang" value={addValue.nama_barang} onChange={e => setAddValue({...addValue, nama_barang:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Harga Jual"
            rules={[
              { required: true, message: "Harga Jual Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" value={parseInt(addValue.harga_jual)} onChange={e => setAddValue({...addValue, harga_jual:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Harga Beli"
            rules={[
              { required: true, message: "Harga Beli Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" value={parseInt(addValue.harga_beli)} onChange={e => setAddValue({...addValue, harga_beli:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Stok Barang"
            rules={[
              { required: true, message: "Stok Barang Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" value={parseInt(addValue.stok_barang)} onChange={e => setAddValue({...addValue, stok_barang:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Gambar Barang"
            rules={[{ required: true, message: "Gambar Tidak Boleh Kosong" }]}
          >
            <Input type="file" data-title={addValue.foto ? addValue.foto[0] : "No file choosen"} onChange={e => setAddValue({...addValue, foto:[e.target.files[0]]})}/>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <div className="flex gap-2 justify-end">
              <Button
                className="bg-red-500 text-white"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
              <Button htmlType="submit" className="bg-sky-500 text-white">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modals>
      <Modals
        handleOpen={openModalEdit}
        handleClose={() => setOpenModalEdit(false)}
        title={"Edit Barang"}
      >
        <Form
          layout="vertical"
          onFinish={onFinishEdit}
          autoComplete="off"
          encType="miltipart/form-data"
          initialValues={editValue}
        >
          <Form.Item
            label="Nama Barang"
            name="nama_barang"
            rules={[
              { required: true, message: "Nama Barang Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="Masukkan Nama Barang" value={editValue.nama_barang} onChange={e => setEditValue({...editValue, nama_barang:e.target.value})} />
          </Form.Item>
          <Form.Item
            label="Harga Jual"
            name="harga_jual"
            rules={[
              { required: true, message: "Harga Jual Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" value={editValue.harga_jual} onChange={e => setEditValue({...editValue, harga_jual:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Harga Beli"
            name="harga_beli"
            rules={[
              { required: true, message: "Harga Beli Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" value={editValue.harga_beli} onChange={e => setEditValue({...editValue, harga_beli:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Stok Barang"
            name={"stok_barang"}
            rules={[
              { required: true, message: "Stok Barang Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" value={editValue.stok_barang} onChange={e => setEditValue({...editValue, stok_barang:e.target.value})}/>
          </Form.Item>
          <Form.Item
            label="Gambar Barang"
            name={"gambar_barang"}
            rules={[{ required: true, message: "Gambar Tidak Boleh Kosong" }]}
          >
            <Input type="file" data-title={editValue.foto ? editValue.foto[0] : "No filechoosen"} onChange={e => setEditValue({...editValue, foto:[e.target.files[0]]})}/>
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <div className="flex gap-2 justify-end">
              <Button
                className="bg-red-500 text-white"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
              <Button htmlType="submit" className="bg-sky-500 text-white">
                Save
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modals>
    </Dashboard>
  );
};

export default ListBarang;
