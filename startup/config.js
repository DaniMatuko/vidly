module.exports = function() {
    const privateKey = process.env.jwtPrivateKey;
    // the app won't run if the user dosen't have a key
    if (!privateKey) {
        console.error('Fatal Erorr: jwtPrivateKey is not defined');
        process.exit(1);
    }
}