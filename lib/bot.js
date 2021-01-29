const WickrBot = require('wickrbot');

class AnnouncementBot extends WickrBot {
    constructor(wickr, username) {
        super(wickr, username);

        this.helpMessage = 'To announce to all rooms this bot is a member of: /announce [announcement]';
        this.noUsersError = 'Unable to send, not in any rooms';

        // This handler function will be run when the bot receives the `/echo` command
        // Parameters:
        //   msg: The message object as received from the Wickr client.
        //        See https://wickrinc.github.io/wickrio-docs/#definitions-wickr-message-formats
        //   args: An array of each of the arguments passed to the command
        this.listen('help', (msg, args) => {
            this.send(msg.vgroupid, args.join(' '));
        });

        this.listen('announce', (msg, args) => {
            this.announce(msg.vgroupid, args[0]);
        });

        // Wait for bot to start before interacting with Wickr APIs
        this.on('start', () => {
            // This clears the send/recv statistics on the client
            this.clearStats();
        });
    }

    help(vgroup) {
        this.send(vgroup, this.helpMessage);
    }

    announce(initiator , announcement) {
        let rooms = this.wickr.cmdGetRooms().rooms;

        if (rooms.length == 0) {
            this.send(initiator, this.noUsersError);
            return;
        }

        this.send(initiator, `Sending announcement to ${rooms.length} rooms ...`);

        for (const oneRoom in rooms) {
            this.send(oneRoom.vgroupid, announcement);
        }

        this.send(initiator, `Announcement complete \uD83C\uDF7B`);
    }
}

module.exports = AnnouncementBot;
