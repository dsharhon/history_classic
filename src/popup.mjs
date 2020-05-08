const addItem = item => {
  const a = document.createElement('a')
  a.title = item.title // tooltip
  a.href = item.url
  a.text = item.url
  a.target = '_blank'
  document.body.appendChild(a)
}

const text = '' // wildcard search
const history = maxResults => typeof browser === 'undefined'
  ? new Promise(resolve => chrome.history.search({ text, maxResults }, resolve)) // chrome
  : browser.history.search({ text, maxResults }) // firefox

window.onload = async () => {
  let items = []

  items = await history(20)
  items.forEach(addItem)
  
  items = await history(200)
  items.slice(20).forEach(addItem)
  
  items = await history(2000)
  items.slice(200).forEach(addItem)
  
  document.body.onmouseleave = () => window.close()
}
