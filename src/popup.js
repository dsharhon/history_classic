const filter = document.getElementById('filter')
const results = document.getElementById('results')

const getHistory = maxResults => {
  const text = filter.value

  // Chrome
  if (typeof chrome === 'object') {
    return new Promise(r => {
      chrome.history.search({ text, maxResults, startTime: 0 }, r)
    })
  }

  // Firefox
  if (typeof browser === 'object') {
    return browser.history.search({ text, maxResults, startTime: '2002-02-20' })
  }

  throw alert('Browser unsupported')
}

const addItems = items => {
  const chunk = document.createElement('div')
  items.forEach(item => {
    const a = document.createElement('a')
    a.title = item.title // tooltip
    a.href = item.url
    a.text = item.url
    a.target = '_blank'
    chunk.appendChild(a)
  })
  results.appendChild(chunk)
}

let shots = 0
const search = async () => {
  const shot = ++shots
  while (results.lastChild) results.removeChild(results.lastChild)

  let items = []

  items = await getHistory(20)
  if (shot !== shots) return
  addItems(items)

  items = await getHistory(200)
  if (shot !== shots) return
  addItems(items.slice(20))

  items = await getHistory(2000)
  if (shot !== shots) return
  addItems(items.slice(200))
}

window.onload = filter.oninput = search

// Close the window when the mouse leaves any side but the top
document.body.onmouseleave = event => (event.clientY > 20) && window.close()
