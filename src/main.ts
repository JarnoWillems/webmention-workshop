import axios from 'axios'
import * as cheerio from 'cheerio'

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