const expect = require('chai').expect;
const sinon = require('sinon');

const FakeWickr = require('./fakes/wickr');
const AnnouncementBot = require('../lib/bot');

describe('bot', function() {
    beforeEach(function() {
        this.fakeWickr = new FakeWickr();
        this.bot = new AnnouncementBot(this.fakeWickr, "rbot");
    });

    describe('initialization', function() {
        it('instantiates without issue', function() {
            let wickr = new FakeWickr();
            let bot = new AnnouncementBot(wickr, 'foo');
        });
    
        it('registers handlers', function() {
            expect(Object.keys(this.bot.handlers)).to.eql(["help", "announce"]);
        });
    });

    describe('announcements', function() {
        it('can announce to every room', function() {
            this.fakeWickr.fakeRooms = [{vgroupid: "fakegroup1"}, {vgroupid: "fakegroup2"}];
            let announcement = "look behind you";
    
            sinon.spy(this.bot, 'send');
            this.bot.announce('foo', announcement);

            expect(this.bot.send
                .calledWith('foo', `Sent announcement to ${this.fakeWickr.fakeRooms.length} rooms`))
                .to.be.true;

            for (const oneFakeRoom in this.fakeWickr.fakeRooms) {
                expect(this.bot.send
                    .calledWith(oneFakeRoom.vgroupid, announcement))
                    .to.be.true;
            }
        });
    
        it('will return an error if it is not in any rooms', function() {
            sinon.spy(this.bot, 'send');
            this.bot.announce('foo', 'bar');

            expect(this.bot.send
                .calledWith('foo', this.bot.noUsersError))
                .to.be.true;
        });
    });

    describe('help', function() {
        it('provides a help command', function() {
            sinon.spy(this.bot, 'send');
            this.bot.help('foo');
    
            expect(this.bot.send
                .calledWith('foo', this.bot.helpMessage))
                .to.be.true;
        });
    });
});
