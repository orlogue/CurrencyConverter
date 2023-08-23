import styles from './Costs.module.scss';
import Section from "../../components/ui/Section/Section.tsx";

export default function Costs() {
  const range = [1, 5, 10, 25, 50, 100, 500, 1000, 5000];
  const rangeList = range.map(item =>
    <td>{item}</td>
  );
  const usdToRub = range.map(item =>
    <td>{(item * 93.94).toFixed(2)}</td>
  );
  const usdToRubResultList = rangeList.map((item, i) =>
    <tr key={i}>
      {item}
      {usdToRub[i]}
    </tr>
  );
  const eurToRub = range.map((item, i) =>
    <td key={i}>{(item * 101.23).toFixed(2)}</td>
  );
  const eurToRubResultList = rangeList.map((item, i) =>
    <tr key={i}>
      {item}
      {eurToRub[i]}
    </tr>
  );


  return (
    <Section
      parentClasses={styles.costs}
      title="Costs"
    >
      <div className={styles['costs-row']}>
        <table>
          <thead>
          <tr>
            <th>USD</th>
            <th>RUB</th>
          </tr>
          </thead>
          <tbody>
          {usdToRubResultList}
          </tbody>
        </table>
        <table>
          <thead>
          <tr>
            <th>EUR</th>
            <th>RUB</th>
          </tr>
          </thead>
          <tbody>
          {eurToRubResultList}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
