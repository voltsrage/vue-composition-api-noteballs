const functions = require('firebase-functions')
const admin = require('firebase-admin')

admin.initializeApp();

exports.setCustomClaims = functions.https.onCall((data, context) => {

    if (!context.auth) {
        throw new functions.https.HttpsError('unauthenticated', 'The function must be called while authenticated.');
    }

    const { uid, customClaims } = data;

    return admin.auth().setCustomUserClaims(uid, customClaims)
        .then(() => {
            console.log('Custom claims set for user', uid);
            return { status: 'success' }
        })
        .catch(error => {
            console.error('Error setting custom claims:', error);
            throw new functions.https.HttpsError('internal', 'An error occurred while setting custom claims.');
        });

})