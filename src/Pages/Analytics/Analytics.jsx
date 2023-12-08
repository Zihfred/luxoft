import styled from "styled-components";
import PieChart from "../../components/PieChart/PieChart";
import { Col, Row, Statistic } from "antd";
import ColumnChart from "../../components/ColumnChart/ColumnChart";

const Wrapper = styled.div`
  padding: 16px;
`;

const RegionData = [
  {
    type: "Черкаська область",
    value: 27,
  },
  {
    type: "Київська область",
    value: 25,
  },
  {
    type: "Чернігівська область",
    value: 18,
  },
  {
    type: "Миколаївська область",
    value: 15,
  },
  {
    type: "Полтавська область",
    value: 10,
  },
  {
    type: "Львівська область",
    value: 5,
  },
];

const QuestionsData = [
  {
    type: "консультації з питань працевлаштування",
    value: 1037,
  },
  {
    type: "консультації з питань навчання",
    value: 665,
  },
  {
    type: "консультації з питань соціального захисту",
    value: 1918,
  },
  {
    type: "консультації з питань покращення стану фізичного здоров’я",
    value: 300,
  },
  {
    type: "консультації з питань отримання психологічних послуг, зокрема з питань оформлення документів для отримання таких послуг",
    value: 529,
  },
];

const PeriodicalData = [
  {
    type: "7 днів",
    sales: 38,
  },
  {
    type: "14 днів",
    sales: 52,
  },
  {
    type: "21 день",
    sales: 61,
  },
  {
    type: "1 раз в місяць",
    sales: 145,
  },
  {
    type: "1 раз в три місяці",
    sales: 48,
  },
];

const Home = () => {
  return (
    <Wrapper>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Statistic
            title="Фіксування кількості усього звернень"
            value={121230}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Фіксування активності користувачів (наприклад, кількість відвідувань) виходячи з обраного періоду"
            value={2230}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div>Відстеження кількості юзерів по областям</div>
          <PieChart data={RegionData} />
        </Col>

        <Col span={12}>
          <div>Відстеження кількості найчастіших питань</div>
          <PieChart data={QuestionsData} />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col>
          <div>
            Сегментація користувачів за періодами активності, такими як 7 днів,
            14 днів, 21 день, 1 раз в місяць, 1 раз в три місяці,.
          </div>
          <ColumnChart data={PeriodicalData} />
        </Col>
      </Row>
    </Wrapper>
  );
};

export default Home;
