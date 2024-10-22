import React, { useEffect, useState} from 'react';
import './App.css';
import AddForm from './Components/addForm';        
import { Button, Popover, Input, message,Modal } from 'antd';
import { PlusOutlined, PrinterTwoTone, DownloadOutlined, FileExcelTwoTone } from '@ant-design/icons';
import DataTable from './Components/Datatable';
import { Popup } from './Components/PopUp';
import { Popup1 } from './Components/PopUp';
import { Popup2 } from './Components/PopUp';
import { fetchListing } from './Redux/Slices/listingSlice';
import { useSelector, useDispatch } from 'react-redux';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
const { Search } = Input;

export const App = () => {
  const dispatch = useDispatch();
  const [listingData, setListingData] = useState([]);
  const [numppage, setnumpppage] = useState(10);
  const [totalcount, settotalcount] = useState();
  const [selectedRows, setSelectedRows] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = useSelector((state) => state);
  useEffect(() => {
    const dataSource = data?.Listing?.data?.records?.prospective_candidates.map((item, index) => ({
      ...item,
      key: item.id || index,
    }));
    setListingData(dataSource);
    settotalcount(data?.Listing?.data?._metadata?.totalRecords);
  }, [data]);

  useEffect(() => {
    let skip = 0;
    let data = {
      numberPerPage: numppage,
      skip: skip,
    };
    dispatch(fetchListing(data));
  }, [numppage, dispatch]);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };
  const handleVisibleChange1 = (newVisible) => {
    setVisible1(newVisible);
  };
  const handleVisibleChange2 = (newVisible) => {
    setVisible2(newVisible);
  };

  // Export Current View to PDF
  const handleOption1 = () => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Name', 'Cell', 'Gender', 'Source', 'City', 'Position Seeking', 'Shift']],
      body: listingData.map(item => [
        item.name,
        item.cell,
        item.gender,
        item.registration_source,
        item.city?.name || '',
        item.position_seeking,
        item.shift
      ]),
    });
    doc.save('current_view.pdf');
    message.success("pdf file downloded successfully");
    setVisible(false);
  };
  // Export Selected Records to PDF
  const handleOption2 = () => {
    if (selectedRows.length === 0) {
      console.log('No rows selected');
      message.error("No rows selected");
      // message.error("please select atleast one row");    
      return;
    }
    const doc = new jsPDF();
    doc.autoTable({
      head: [['Name', 'Cell', 'Gender', 'Source', 'City', 'Position Seeking', 'Shift']],
      body: selectedRows.map(item => [
        item.name,
        item.cell,
        item.gender,
        item.registration_source,
        item.city?.name || '',
        item.position_seeking,
        item.shift
      ]),
    });
    doc.save('selected_records.pdf');
    message.success("pdf file downloded successfully");
    setVisible(false);
  };

  // Export current View to Excel
  const handleOption3 = () => {
    const worksheet = XLSX.utils.json_to_sheet(listingData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.writeFile(workbook, 'CurrentView.xlsx');
    message.success("excel file downloded successfully");
  };
  // Export Selected Records to Excel
  const handleOption4 = () => {
    if (selectedRows.length === 0) {
      console.log('No rows selected');
      message.error("No rows selected");
      return;
    }    
    const worksheet = XLSX.utils.json_to_sheet(selectedRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet);
    XLSX.writeFile(workbook, 'SelectedRecord.xlsx');
    message.success("excel file downloded successfully");
  };

  // Export Current View to PDF and Print
  const handleOption5 = () => {
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.autoTable({
      head: [['Name', 'Cell', 'Gender', 'Source', 'City', 'Position Seeking', 'Shift']],
      body: listingData.map(item => [
        item.name,
        item.cell,
        item.gender,
        item.registration_source,
        item.city?.name || '',
        item.position_seeking,
        item.shift
      ]),
    });
    doc.autoPrint(); // Automatically open the print dialog
    window.open(doc.output('bloburl'), '_blank'); // Open the PDF in a new tab and generates a URL that can be used to access the PDF document.
    message.success("printed  successfully");
    setVisible(false);
  };

  // Export Selected Records to Print
  const handleOption6 = () => {
    if (selectedRows.length === 0) {
      console.log('No rows selected');
      message.error("No rows selected");
      return;
    }
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.autoTable({
      head: [['Name', 'Cell', 'Gender', 'Source', 'City', 'Position Seeking', 'Shift']],
      body: selectedRows.map(item => [
        item.name,
        item.cell,
        item.gender,
        item.registration_source,
        item.city?.name || '',
        item.position_seeking,
        item.shift
      ]),
    });
    doc.autoPrint(); // Automatically open the print dialog
    window.open(doc.output('bloburl'), '_blank'); // Open the PDF in a new tab
    message.success("printed  successfully");
    setVisible(false);
  };


  function onChange(pagination) {
    console.log("pagination",pagination);
    let skip = pagination.pageSize * (pagination.current - 1);
    let numberPerPage = pagination.pageSize;
    setnumpppage(pagination.pageSize);

    let data = { search: '', numberPerPage, skip };
    dispatch(fetchListing(data));
  }
  //  function onSearch(value){
  //   console.log("button clicked");
  //   console.log("Current search state:", search);
  //  } 
  // Function to handle the search button click
  const onSearch = (value) => {
    if (value.length === 0) {
      console.log('No rows selected');
      // message.warning(" Please type something to search");
       // If no search value, fetch the full list again
    let skip = 0;
    let numberPerPage = 10;
    let data = { search: '', numberPerPage, skip };
    dispatch(fetchListing(data)); // Reset to original list
    
    }  else{
    console.log("Search button clicked with value:", value);
    console.log("Current search state:", search);
    let skip =0;
    let numberPerPage=10;
    let data = { search: value, numberPerPage, skip };
    dispatch(fetchListing(data)); } 
  };
   // Function to handle the input change
  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(e.target.value); // Update the state with the input value
    console.log("something typed");

    if (value === '') {
      let skip = 0;
      let numberPerPage = 10;
      let data = { search: '', numberPerPage, skip };
      dispatch(fetchListing(data)); // Dispatch action to fetch the full list again
    }
  };

  const handleRowSelection = (selectedRowKeys, selectedRows) => {
    setSelectedRows(selectedRows);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
  };
  return (
    <div className='Container'>
      <div>
        <div className='Buttons'>
          <Button className='btn'>Dashboard</Button>
          <Button className='btn2'>Prospective Candidates</Button>
        </div>

        <div className='search'>
          <Search
            placeholder="Input search text"
            allowClear
            enterButton="Search"
             size="large"
            style={{ width: 250, marginTop: '1.8rem' }}
            onSearch={onSearch}  //Track the search button 
            onChange={handleChange}  // Track user input
            value={search}           // Bind state to input value
          />
          <Button className='btn1' type="primary" icon={<PlusOutlined />} onClick={showModal}>Add</Button>
          <Modal
        title="Add New Record"
        visible={isModalOpen}
        footer={null} 
        onCancel={handleCancel}
      >
        <AddForm handleOk={handleOk} handleCancel={handleCancel} />
      </Modal>
        </div>
        <div>
          <div className='Lheader'>
            <h2>Prospective Candidates</h2>
          </div>
          <div className='icons'>
            <Popover
              content={<Popup2 onOption5={handleOption5} onOption6={handleOption6} />}
              title="Choose an Option"
              trigger="click"
              visible={visible2}
              onVisibleChange={handleVisibleChange2}
            >
              <Button className="button" icon={<PrinterTwoTone />}></Button>
            </Popover>
            <Popover
              content={<Popup onOption1={handleOption1} onOption2={handleOption2} />}
              title="Choose an Option"
              trigger="click"
              visible={visible}
              onVisibleChange={handleVisibleChange}
            >
              <Button className='button' icon={<DownloadOutlined />} />
            </Popover>

            <Popover
              content={<Popup1 onOption3={handleOption3} onOption4={handleOption4} />}
              title="Choose an Option"
              trigger="click"
              visible={visible1}
              onVisibleChange={handleVisibleChange1}
            >
              <Button className='button' icon={<FileExcelTwoTone />} />
            </Popover>
          </div>
        </div>

        <div>
          <DataTable
            dataSource={listingData}
            onChange={onChange}
            totalcount={totalcount}
            onRowSelection={handleRowSelection}
          />
        </div>
      </div>
    </div>
  );
};
export default App;
