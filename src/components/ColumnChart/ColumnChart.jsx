import { Column } from "@ant-design/plots";

const ColumnChart = ({ data }) => {
  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "кількість",
      },
      sales: {
        alias: "кількість",
      },
    },
  };
  return <Column {...config} />;
};

export default ColumnChart;
