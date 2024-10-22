import React, { useState } from 'react';
import {  Table,Modal} from "antd";
import './Datatable.css';
import EditForm from './editForm';

export const DataTable = ({ dataSource, isLoading, totalcount, onChange, onRowSelection}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  
  const handleOk = () => {
    setIsModalOpen(false); 
  };

  const handleCancel = () => {
    setIsModalOpen(false); 
  }; 
  const handleEdit = (id) => { 
    console.log("dispatch id",id)
    setEditId(id);
    setIsModalOpen(true) 
  };
  const columns = [
    {       
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span className="column-highlight">{text}</span>,
    },
    {
      title: 'Cell',
      dataIndex: 'cell',
      key: 'cell',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Source',
      dataIndex: 'registration_source',
      key: 'source',
    },
    {
      title: 'City',
      key: 'city',
      render: (value) => <span className="column-highlight">{value?.city?.name}</span>,
    },
    {
      title: 'Position Seeking',
      dataIndex: 'position_seeking',
      key: 'position_seeking',
    },
    {
      title: 'Shift',
      dataIndex: 'shift',
      key: 'shift',
    },
    {
  title: 'Action',
  dataIndex: '',
  key: 'x',
  render: (text, record) => (
    <a onClick={() => handleEdit(record.id)}>Edit</a>  // Pass the record's id to handleEdit
  ),
}
  ];
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const rowSelection = {
    selectedRowKeys, // Bind the selected row keys to state
    onChange: (newSelectedRowKeys, newSelectedRows) => {
      setSelectedRowKeys(newSelectedRowKeys); // Update selected row keys
      onRowSelection(newSelectedRowKeys, newSelectedRows); // Pass the selected rows to the parent
      console.log(`Selected Row Keys: ${newSelectedRowKeys}`, 'Selected Rows: ', newSelectedRows);
    },
  };
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        dataSource={dataSource}
        columns={columns}
        loading={isLoading}
        pagination={{ total: totalcount }}
        onChange={onChange}
        style={{ marginLeft: '2rem', marginRight: '2rem' }}
      />
  <Modal
        title="Edit Record"
        visible={isModalOpen}
        footer={null} 
        onCancel={handleCancel}
      >
        <EditForm  handleOk={handleOk} handleCancel={handleCancel} id={editId}/>
      </Modal>
    </div>
  );
}; 
export default DataTable;
