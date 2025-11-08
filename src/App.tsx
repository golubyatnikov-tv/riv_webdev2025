import { List } from 'antd'
import './App.css'
import { Visualizer } from './Visualizer'
import { useCosmicObjects } from './api'

export function App() {
  // const [data, setData] = useState<[]>();

  // useEffect(() => {
  //   axios.get('http://localhost:3000/cosmicObjects')
  //     .then(response => response.data)
  //     .then(setData)
  // }, [])

  const { data } = useCosmicObjects()

  return (
    <>
      <Visualizer />
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            extra={
              <div>extra</div>
            }
          >
            <List.Item.Meta
              avatar={<div style={{}}></div>}
              title={item.name}
              description={item.diameterKm + 'км - ' + item.type}
            />
          </List.Item>
        )}
      />
    </>
  )
}
