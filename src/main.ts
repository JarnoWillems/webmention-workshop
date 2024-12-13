import './style.css'
// @ts-ignore
import axios = require("axios")
// @ts-ignore
import cheerio = require('cheerio') // Import Cheerio for HTML manipulation

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

document.querySelector<HTMLButtonElement>('#button')!.addEventListener('click', async () => {
    const response = await axios.get('https://webmention-client.vercel.app/');
    const html = response.data;

    const $ = cheerio.load(html);

    const webmentionEndpoint = $('link[rel="webmention"]').attr('href')
        || $('a[rel="webmention"]').attr('href'); // Also check <a> tags as a fallback

    if (webmentionEndpoint) {
        const absoluteEndpoint = new URL(webmentionEndpoint, 'https://webmention-client.vercel.app/').toString();
        console.log('Webmention endpoint gevonden:', absoluteEndpoint);
        return absoluteEndpoint;
    } else {
        console.warn('Geen Webmention endpoint gevonden op de website.');
        return null;
    }

})