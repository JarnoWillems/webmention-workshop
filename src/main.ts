import axios from 'axios';
import * as cheerio from 'cheerio';

document.querySelector<HTMLButtonElement>('#button')!.addEventListener('click', async () => {
    try {
        // Fetch the HTML of the website
        const response = await axios.get('https://webmention-client.vercel.app/');
        const html = response.data;

        // Parse the HTML using Cheerio
        const $ = cheerio.load(html);

        // Find the Webmention endpoint
        const webmentionEndpoint = $('link[rel="webmention"]').attr('href')
            || $('a[rel="webmention"]').attr('href'); // Fallback to <a> tags

        if (!webmentionEndpoint) {
            console.warn('Geen Webmention endpoint gevonden op de website.');
            return null;
        }

        // Convert the Webmention endpoint to an absolute URL
        const absoluteEndpoint = new URL(webmentionEndpoint, 'https://webmention-client.vercel.app/').toString();
        console.log('Webmention endpoint gevonden:', absoluteEndpoint);

        // Prepare the source and target for the Webmention
        const sourceUrl = 'https://webmention-workshop-rho.vercel.app/';
        const targetUrl = 'https://webmention-client.vercel.app/';

        // Send the Webmention
        const webmentionResponse = await axios.post(absoluteEndpoint,
            new URLSearchParams({ source: sourceUrl, target: targetUrl }), // Format as URL-encoded
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

        // Check the response status
        if (webmentionResponse.status === 202) {
            console.log('Webmention verzonden:', webmentionResponse.data);
        } else {
            console.log('Webmention mislukt:', webmentionResponse.status, webmentionResponse.data);
        }
    } catch (error: any) {
        console.error('Fout bij het verzenden van Webmention:', error.response?.data || error.message);
    }
});
