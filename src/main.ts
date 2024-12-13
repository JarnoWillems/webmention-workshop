import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>CLICK TE BUTTON</h1>
    <div>
        <h2>Blogpost van Arno zijn website</h2>
        <p>Kijk hoe shit deze blogpost is, lelijk</p>
        <a href="https://webmention-client.vercel.app/">Zie hier</a>
    </div>
    <div class="card">
      <button id="button" type="button">Click me</button>
    </div>
    <a href="mailto:jarnowillems001@gmail.com" rel="me">john@gmail.com</a>
  </div>
`

document.querySelector<HTMLButtonElement>('#button')!.addEventListener('click', () => {

})