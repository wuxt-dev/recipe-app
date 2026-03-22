function addRecipe() {
  const name = document.getElementById('name').value
  const ingredients = document.getElementById('ingredients').value
  const editIndex = document.getElementById('editIndex').value

  const url = editIndex ? '/update-recipe' : '/add-recipe'

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, ingredients, index: editIndex })
  })
    .then(res => res.text())
    .then(data => {
      alert(data)

      // 清空输入
      document.getElementById('name').value = ''
      document.getElementById('ingredients').value = ''
      document.getElementById('editIndex').value = ''

      loadRecipes()
    })
}
function loadRecipes() {
  fetch('/recipes')
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById('list')
      list.innerHTML = ''

      data.forEach((recipe, index) => {
        const div = document.createElement('div')
        div.innerHTML = `
  <h3>${recipe.name}</h3>
  <p>${recipe.ingredients}</p>
  <button onclick="editRecipe(${index})">编辑</button>
<button onclick="deleteRecipe(${index})">删除</button>
  <hr>
`
        list.appendChild(div)
      })
    })
}
function editRecipe(index) {
  fetch('/recipes')
    .then(res => res.json())
    .then(data => {
      const recipe = data[index]

      document.getElementById('name').value = recipe.name
      document.getElementById('ingredients').value = recipe.ingredients
      document.getElementById('editIndex').value = index
    })
}
function deleteRecipe(index) {
  fetch('/delete-recipe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index })
  })
    .then(res => res.text())
    .then(data => {
      alert(data)
      loadRecipes() // 刷新列表
    })
}

// 页面加载时执行
window.onload = loadRecipes
