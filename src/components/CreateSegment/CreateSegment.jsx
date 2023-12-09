import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, InputNumber } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { createSegment, getAllRegions } from "../../api";

const { Option } = Select;

const CollectionCreateForm = ({ open, onCreate, onCancel, regions }) => {
  const [form] = Form.useForm();

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
          name="segmentName"
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
        <Form.Item name="age" label="Фільтр по віку">
          <InputNumber />
        </Form.Item>
        <Form.Item name="idRegion" label="Фільтр по області">
          <Select placeholder="Виберіть область зі списку" allowClear>
            {regions?.map((region) => (
              <Option key={region._id} value={region._id}>
                {region.regionName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="idUserStatus" label="Фільтр по статусу особи">
          <Select placeholder="Виберіть статус зі списку" allowClear>
            <Option value="1">Віськовий</Option>
            <Option value="2">Ветаран</Option>
            <Option value="3">Родич ветарана</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CreateSegment = () => {
  const [open, setOpen] = useState(false);
  const [regions, setRegions] = useState([]);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
    createSegment(values)
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allRegions = await getAllRegions();
        setRegions(allRegions);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    fetchData();
  }, []);

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
        regions={regions}
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
