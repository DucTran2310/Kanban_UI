import styles from'./App.module.scss';
import Kanban from './components/kanban';

function App() {
  return (
    <div className={styles['wrapper']}>
      <h1 className={styles['title']}>
        Kanban UI
      </h1>
      <Kanban />
    </div>
  );
}

export default App;
