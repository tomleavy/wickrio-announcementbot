class FakeWickr {
    constructor() {
        this.fakeRooms = [];
    }
    clientInit() {}
    cmdAddKeyValue() {}
    cmdClearAllKeyValues() {}
    cmdDeleteKeyValue() {}
    cmdGetKeyValue() {}
    cmdGetRooms() {
        return {
            rooms: this.fakeRooms
        };
    }
    cmdStartAsyncRecvMessages() {}
    cmdSendRoomMessage() {}
    isConnected() {}
}

module.exports = FakeWickr;
