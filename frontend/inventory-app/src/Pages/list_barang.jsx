import React, { useState } from "react";
import Dashboard from "../Components/Layouts";
import { Button, Form, Input, Modal, Space, Table, Row } from "antd";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modals from "../Components/Modal";
import { ExclamationCircleFilled } from "@ant-design/icons";

const { confirm } = Modal;
const ListBarang = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const showModal = () => {
    setOpenModal(true);
  };
  const close = () => {
    setOpenModal(false);
  };
  const [editValue, setEditValue] = useState();
  const editData = (data) => {
    setOpenModalEdit(true);
    console.log(data);
    setEditValue({
      nama_barang: data.nama_barang,
      harga_jual: data.harga_jual,
      harga_beli: data.harga_beli,
      stok_barang: data.stok_barang,
      foto_barang: data.foto_barang,
    });
  };
  const deleteItems = () => {
    confirm({
      title: "Anda Yakin Ingin Menghapus Data Ini?",
      icon: <ExclamationCircleFilled />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        console.log("Ok");
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
            onClick={deleteItems}
          />
        </Space>
      ),
    },
  ];
  const rowTable = [
    {
      key: "1",
      nama_barang: "Aqua",
      harga_jual: 5000,
      harga_beli: 3000,
      stok_barang: 10,
    },
    {
      key: "2",
      nama_barang: "Aqua",
      harga_jual: 5000,
      harga_beli: 3000,
      stok_barang: 10,
    },
    {
      key: "3",
      nama_barang: "Aqua",
      harga_jual: 5000,
      harga_beli: 3000,
      stok_barang: 10,
    },
  ];
  const onFinish = (data) => {
    console.log(data);
    setOpenModal(false);
  };
  const onFinishEdit = (data) => {
    console.log(data);
  };

  const { Search } = Input;
  return (
    <Dashboard>
      <h1 className="flex justify-center font-bold mb-4 text-2xl">
        List Barang
      </h1>
      <Row className="flex justify-between m-4">
        <Button
          onClick={showModal}
          className="bg-blue-500 text-white"
        >
          Tambah Barang
        </Button>
        <Input className="w-1/6" placeholder="Search" />
      </Row>
      <Table dataSource={rowTable} columns={columnTable} className="mx-4" />

      <Modals
        handleOpen={openModal}
        handleClose={close}
        title={"Tambah / Edit Barang "}
      >
        <Form layout="vertical" onFinish={onFinish} autoComplete="off">
          <Form.Item
            label="Nama Barang"
            name={"nama_barang"}
            rules={[
              { required: true, message: "Nama Barang Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="Masukkan Nama Barang" />
          </Form.Item>
          <Form.Item
            label="Harga Jual"
            name={"harga_jual"}
            rules={[
              { required: true, message: "Harga Jual Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" />
          </Form.Item>
          <Form.Item
            label="Harga Beli"
            name={"harga_beli"}
            rules={[
              { required: true, message: "Harga Beli Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" />
          </Form.Item>
          <Form.Item
            label="Stok Barang"
            name={"stok_barang"}
            rules={[
              { required: true, message: "Stok Barang Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" />
          </Form.Item>
          <Form.Item
            label="Gambar Barang"
            name={"gambar_barang"}
            rules={[{ required: true, message: "Gambar Tidak Boleh Kosong" }]}
          >
            <Input type="file" />
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
          initialValues={editValue}
        >
          <Form.Item
            label="Nama Barang"
            name="nama_barang"
            rules={[
              { required: true, message: "Nama Barang Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="Masukkan Nama Barang" />
          </Form.Item>
          <Form.Item
            label="Harga Jual"
            name="harga_jual"
            rules={[
              { required: true, message: "Harga Jual Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" />
          </Form.Item>
          <Form.Item
            label="Harga Beli"
            name="harga_beli"
            rules={[
              { required: true, message: "Harga Beli Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" />
          </Form.Item>
          <Form.Item
            label="Stok Barang"
            name={"stok_barang"}
            rules={[
              { required: true, message: "Stok Barang Tidak Boleh Kosong" },
            ]}
          >
            <Input placeholder="0" type="number" />
          </Form.Item>
          <Form.Item
            label="Gambar Barang"
            name={"gambar_barang"}
            rules={[{ required: true, message: "Gambar Tidak Boleh Kosong" }]}
          >
            <Input type="file" />
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
