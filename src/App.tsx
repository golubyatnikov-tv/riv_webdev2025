import { Button, List } from 'antd'
import { useState } from 'react'
import { useCosmicObjectsQuery } from './api'
import './App.css'
import { CosmoObjectForm } from './CosmoObjectForm'
import { DeleteButton } from './DeleteButton'
import type { CosmoObject } from './types'
import { Visualizer } from './Visualizer'

export function App() {
  const { data } = useCosmicObjectsQuery()
  const [editingObject, setEditingObject] = useState<Partial<CosmoObject>>()

  return (
    <>
      <Visualizer />
      {editingObject && <CosmoObjectForm
        initialValues={editingObject}
        onSuccess={() => {
          setEditingObject(undefined);
        }}
        onCancel={() => {
          setEditingObject(undefined);
        }}
      />}
      {!editingObject && <Button onClick={() => {
        setEditingObject({ type: 'Планета земной группы' })
      }}>Добавить</Button>}
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            extra={
              <div>
                <Button type="link" onClick={() => {
                  setEditingObject(item);
                }}>Редактировать</Button>
                <DeleteButton id={item.id} />
              </div>
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
      <Visualizer orientation='vertical' maxCount={3} />
    </>
  )
}
