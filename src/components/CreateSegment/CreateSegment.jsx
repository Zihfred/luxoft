import { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      label: i.toString(36) + i,
      value: i.toString(36) + i,
    });
  }

  return (
    <Modal
      open={open}
      title="Згенерувати новий сегмент"
      okText="Створити"
      cancelText="Відмінити"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        <Form.Item
          name="title"
          label="Назва сегменту"
          rules={[
            {
              required: true,
              message: "Введіть назву сегменту",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="filters" label="Виберіть фільтри">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Виберіть фільтр"
            options={options}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CreateSegment = () => {
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };
  return (
    <div>
      <Button
        type="dashed"
        onClick={() => {
          setOpen(true);
        }}
        icon={<PlusCircleOutlined />}
      >
        Згенерувати
      </Button>
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </div>
  );
};
export default CreateSegment;
