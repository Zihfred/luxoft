import { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, InputNumber } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { createSegment, getAllRegions } from "../../api";

const { Option } = Select;

const statuses = [
  {
    _id: "65735ef5997f0a6e91d4deac",
    userStatusName: "військовослужбовці, які брали безпосередню участь у заходах, необхідних для забезпечення оборони України, захисту безпеки населення та інтересів держави, та були звільнені з військової служби, зокрема демобілізовані у визначеному законом порядку",
  },
  {
    _id: "65735ede997f0a6e91d4deab",
    userStatusName: "члени сімей загиблих (померлих) ветеранів війни, Захисників і Захисниць України",
  },
  {
    _id: "65735ece997f0a6e91d4deaa",
    userStatusName: "члени сімей ветеранів війни та осіб, які мають особливі заслуги перед Батьківщиною",
  },
  {
    _id: "657355c1997f0a6e91d4dea6",
    userStatusName: "ветерани війни, особи, які мають особливі заслуги перед Батьківщиною",
  },
];

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
            {statuses?.map((status) => (
                 <Option key={status._id} value={status._id}>
                 {status.userStatusName}
               </Option>
            ))}
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
    createSegment(values);
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
