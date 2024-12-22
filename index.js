const SMTPServer = require('smtp-server').SMTPServer;
const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cb){
            console.log('Connection established from: ' + session.id);
            return cb();
        
    },
    onMailFrom(address, session, cb){
        console.log('Mail from: ' + address.address, session.id);
        return cb();
    },
    onRcptTo(address, session, cb){
        console.log('Mail to: ' + address.address, session.id);
        return cb();
    },
    onData(stream, session, cb){
        stream.on('data', (data) => {
        console.log('Data: ' + data, session.id);   
        stream.on('end', () => {
            console.log('End of message', session.id);
            return cb();
        });
    });
    },
    onClose(session) {
        console.log('Session ended', session.id);
    }
});
server.listen(25, () => console.log('SMTP server started on port 25'));