const wickr = require('wickrio_addon');

const AnnouncementBot = require('./lib/bot');

async function main() {
    let bot = new AnnouncementBot(wickr);
    bot.start();
}

main().then(result => {}).catch(e => { console.error(e); process.exit(1); });
