# 📸 Screenshot API on Netlify

This Screenshot API allows you to quickly and easily capture screenshots of web pages by sending a request to a Netlify function. It's a perfect tool for generating previews, archiving snapshots, or enhancing your application with visual links.

## How to Use 🛠️

Send a request to the following endpoint:

`https://fluffy-sunshine-983e63.netlify.app/.netlify/functions/puppet?page=https://whitep4nth3r.com`

You can set your page with the `page` parameter.

For example: `page=https://whitep4nth3r.com`

Receive an image of the page in the Response.

## Demo 📺

Try it out by going to:
[https://fluffy-sunshine-983e63.netlify.app/](https://fluffy-sunshine-983e63.netlify.app/)
and using your Chrome console with the following command:
```javascript
fetch("https://fluffy-sunshine-983e63.netlify.app/.netlify/functions/puppet?page=https://whitep4nth3r.com");
```
You can see the image in Preview when clicking on the Request in the Network Tab.

## Acknowledgments 🙏

Special thanks to Blackspike Design
