import React, { useState } from 'react';
import { Input, Button, Form, Row, Col, Select, message,Modal } from 'antd';
import { addUser } from '../Redux/Slices/addSlice';
import {  useDispatch } from 'react-redux';


const AddForm = ({ handleOk }) => {
 
  const dispatch = useDispatch();
  const [form] = Form.useForm(); //method of antdesign to create and control the form
  const [formData, setFormData] = useState({
    cell: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    email: '',
    gender: '',
    recruiter: '',
    shift: '',
    mode_of_transportation: '',
    city: '',
    position_seeking: '',
    notes: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (value, name) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    formData.type = 2;
    formData.city=6074;
    formData.recruiter="18634";
    dispatch(addUser(formData))
    .then(() => {
      message.success('Form submitted successfully');
    console.log('Form Submitted', formData);
    // message.success('Form submitted successfully');
    handleOk(); // Close modal on form submission
    form.resetFields(); // Reset form fields after submission
    setFormData({
      cell: '',
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      gender: '',
      recruiter: '',
      shift: '',
      mode_of_transportation: '',
      city: '',
      position_seeking: '',
      notes: ''
    });

  })
  .catch(() => {
    message.error('Failed to submit form');
  });
  
  };

  return (
        <>
    {/* <Modal
      visible={visible}
      title="Edit Candidate"
      onCancel={onClose}
      footer={null} // Hide default footer buttons
    ></Modal> */}
    <div style={{ maxHeight: '550px', overflowY: 'auto', overflowX:'hidden' }}>
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Cell"
            name="cell"
            rules={[{ required: true, message: 'Please enter cell!' }]}
          >
            <Input name="cell" value={formData.cell} onChange={handleChange} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="First Name"
            name="first_name"
            rules={[{ required: true, message: 'Please enter first name!' }]}
          >
            <Input name="first_name" value={formData.first_name} onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label="Middle Name"
           name="middle_name">
            <Input name="middle_name" value={formData.middle_name} onChange={handleChange} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Last Name"
            name="last_name"
            rules={[{ required: true, message: 'Please enter last name!' }]}
          >
            <Input name="last_name" value={formData.last_name} onChange={handleChange} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please enter a valid email!' }]}
          >
            <Input name="email" value={formData.email} onChange={handleChange} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: 'Please select gender!' }]}
          >
            <Select
              value={formData.gender}
              onChange={(value) => handleSelectChange(value, 'gender')}
            >
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="no_disclose">I wish not to disclose</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Recruiter"
            name="recruiter"
          >
            <Select
              value={formData.recruiter}
              onChange={(value) => handleSelectChange(value, 'recruiter')}
            >
              <Select.Option value="test">OTHR Test</Select.Option>
              <Select.Option value="anything">Anything</Select.Option>
              <Select.Option value="othrt">OTHRT</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            label="Shifts"
            name="shift"
          >
            <Select
              value={formData.shift}
              onChange={(value) => handleSelectChange(value, 'shift')}
            >
              <Select.Option value="morning">Morning</Select.Option>
              <Select.Option value="night">Night</Select.Option>
              <Select.Option value="afternoon">Afternoon</Select.Option>
              <Select.Option value="continental">Continental</Select.Option>
              <Select.Option value="flexible">Flexible</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label="Mode of Transportation"
            name="mode_of_transportation"
            rules={[{ required: true, message: 'Please select mode of transportation!' }]}
          >
            <Select
              value={formData.mode_of_transportation}
              onChange={(value) => handleSelectChange(value, 'mode_of_transportation')}
            >
              <Select.Option value="car">Car</Select.Option>
              <Select.Option value="public_transit">Public Transit</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: 'Please select city!' }]}
          >
            <Select
              value={formData.city}
              onChange={(value) => handleSelectChange(value, 'city')}
            >
              <Select.Option value="alton">Alton</Select.Option>
              <Select.Option value="ajax">Ajax</Select.Option>
              <Select.Option value="ancaster">Ancaster</Select.Option>
              <Select.Option value="angus">Angus</Select.Option>
              <Select.Option value="alliston">Alliston</Select.Option>
              <Select.Option value="alcona">Alcona</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={16}>
          <Form.Item
            label="Position Seeking"
            name="position_seeking"
            rules={[{ required: true, message: 'Please select position seeking!' }]}
          >
            <Select
              value={formData.position_seeking}
              onChange={(value) => handleSelectChange(value, 'position_seeking')}
            >
              <Select.Option value="labour">General Labour</Select.Option>
              <Select.Option value="forklift">Forklift</Select.Option>
              <Select.Option value="machine_operator">Machine Operator</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="Notes"
            name="notes"
            rules={[{ required: true, message: 'Please enter notes!' }]}
          >
            <Input.TextArea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <Button type="primary" htmlType="submit">
             Submit   
          </Button>
        </Col>
      </Row>
    </Form>
    </div>
    </>
  );
};

export default AddForm;
