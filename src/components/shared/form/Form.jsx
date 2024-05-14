import React from "react";
import "./Form.scss";
import { Form, Input, Upload, Button, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const DynamicForm = ({ fields, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const handleFormSubmit = async () => {
    try {
      const formData = await form.validateFields();
      onSubmit(formData);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const handleSelectChange = (value, field) => {
    if (field.onChange) {
      field.onChange(value);
    }
  };

  return (
    <Form form={form} onFinish={handleFormSubmit} initialValues={initialValues}>
      {fields.map((field, index) => (
        <Form.Item
          key={index}
          name={field.name}
          label={<span style={{ display: 'block', color: '#803D3B', fontSize: "16px", fontWeight: "700", fontFamily: "Cairo" }}>{field.labelName}</span>}
          rules={[{ required: field.required, message: field.placeholder }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          {field.type === "number" && (
            <Input
              type="number"
              placeholder={field.placeholder}
              className="disable-scroll"
              onWheel={(event) => event.currentTarget.blur()}
            />
          )}
          {field.type === "textarea" && (
            <Input.TextArea
              placeholder={field.placeholder}
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          )}
          {field.type === "image" && (
            <div>
              {initialValues && initialValues[field.name] && (
                <img
                  src={`${initialValues[field.name]}`}
                  alt={`alt-${initialValues.name}`}
                  style={{ width: "50px", height: "50px" }}
                />
              )}
              <Form.Item
                name={field.name}
                valuePropName="file"
                getValueFromEvent={(e) => e.fileList}
                rules={[{ required: true, message: "يرجى تحميل الملف" }]}
              >
                <Upload name={field.name} listType="text" beforeUpload={() => false}>
                  <Button icon={<UploadOutlined />}>اضغط لرفع الملف</Button>
                </Upload>
              </Form.Item>
            </div>
          )}
          {field.type === "select" && (
            <Select
              placeholder={field.placeholder}
              showSearch // Enable search functionality
              optionFilterProp="children" // Search by children (option label)
              onChange={(value) => handleSelectChange(value, field)}
            >
              {field.options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
          {field.type === "text" && (
            <Input
              placeholder={field.placeholder}
              disabled={field.disabled}
              value={field.disabled ? field.value : undefined}
            />

          )}
        </Form.Item>
      ))}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          اضافة
        </Button>
      </Form.Item>
    </Form>
  );
};

export default DynamicForm;
