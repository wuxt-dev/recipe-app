const fs = require('fs')
const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

// 让服务器可以读取 public 文件夹
app.use(express.static('public'))

app.post('/add-recipe', (req, res) => {
  const { name, ingredients } = req.body

  // 读取已有数据
  const data = fs.readFileSync('recipes.json')
  const recipes = JSON.parse(data)

  // 添加新食谱
  recipes.push({ name, ingredients })

  // 写回文件
  fs.writeFileSync('recipes.json', JSON.stringify(recipes, null, 2))

  res.send('保存成功！已经写入文件 ✅')
})
app.get('/recipes', (req, res) => {
  const data = fs.readFileSync('recipes.json')
  const recipes = JSON.parse(data)

  res.json(recipes)
})
app.post('/delete-recipe', (req, res) => {
  const { index } = req.body

  const data = fs.readFileSync('recipes.json')
  const recipes = JSON.parse(data)

  // 删除对应位置
  recipes.splice(index, 1)

  fs.writeFileSync('recipes.json', JSON.stringify(recipes, null, 2))

  res.send('删除成功 🗑️')
})
app.post('/update-recipe', (req, res) => {
  const { name, ingredients, index } = req.body

  const data = fs.readFileSync('recipes.json')
  const recipes = JSON.parse(data)

  recipes[index] = { name, ingredients }

  fs.writeFileSync('recipes.json', JSON.stringify(recipes, null, 2))

  res.send('更新成功 ✏️')
})
// 启动服务器
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`)
})
