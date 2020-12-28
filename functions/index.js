const functions = require('firebase-functions');
const admin = require('firebase-admin');
const { user } = require('firebase-functions/lib/providers/auth');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
    //check request is made by an admin
    if (context.auth.token.admin !== true) {
        return { error: 'Only coordinator/admin can add other admins/coordinator' }
    }

    //get user and ad custom claim (admin)
    return admin.auth().getUserByEmail(data.email).then(user => {
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        return {
            message: `success ${data.email} has been made an coordinator`
        }
    }).catch(err => {
        return err;
    });
});