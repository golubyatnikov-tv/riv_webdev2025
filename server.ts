import cors from 'cors'
import express from 'express'
import { body, validationResult } from 'express-validator'
import { nanoid } from 'nanoid'
import fs from 'node:fs'

const app = express()
const port = 3000

type Db = {
  cosmicObjects: CosmoObject[]
}

type CosmoObject = {
  id: string
  name: string
  diameterKm: number
  color: string
  type: 'Планета земной группы' | 'Газовый гигант'
}

const readDb = () => {
  const db = fs.readFileSync('db.json', 'utf8')
  return JSON.parse(db) as Db
}

const writeDb = (db: Db) => {
  fs.writeFileSync('db.json', JSON.stringify(db, null, 2), 'utf8')
}

const handleValidationErrors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const validateCosmicObject = [
  body('name').notEmpty().isString(),
  body('diameterKm').notEmpty().isInt({ min: 1 }),
  body('color').notEmpty().isString().isHexColor(),
  body('type').notEmpty().isIn(['Планета земной группы', 'Газовый гигант']),
  handleValidationErrors,
]

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/cosmicObjects', (req, res) => {
  res.json(readDb().cosmicObjects)
})

app.post('/cosmicObjects', validateCosmicObject, (req, res) => {
  const db = readDb()
  const newObject = { ...req.body, id: nanoid() } as CosmoObject
  db.cosmicObjects.push(newObject)
  writeDb(db)
  res.json(newObject)
})

app.put('/cosmicObjects/:id', validateCosmicObject, (req, res) => {
  const db = readDb()
  const updatedObject = { ...req.body, id: req.params.id } as CosmoObject
  db.cosmicObjects = db.cosmicObjects.map((obj) => (obj.id === req.params.id ? updatedObject : obj))
  writeDb(db)
  res.json(updatedObject)
})

app.delete('/cosmicObjects/:id', (req, res) => {
  const db = readDb()
  db.cosmicObjects = db.cosmicObjects.filter((obj) => obj.id !== req.params.id)
  writeDb(db)
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
