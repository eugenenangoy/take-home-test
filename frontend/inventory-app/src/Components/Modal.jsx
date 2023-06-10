import { Modal } from 'antd'
import React, { useState } from 'react'

const Modals = ({title, handleOpen, handleClose, children}) => {
    const [modalOpen, setModalOpen] = useState(handleOpen)
  return (
    <>
      <Modal
      title={title}
      open={handleOpen}
      onCancel={handleClose}
      centered
      footer={null}
      >
        {children}
      </Modal>
    </>
  )
}

export default Modals
