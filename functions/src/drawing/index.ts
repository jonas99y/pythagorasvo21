import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onNewDrawing = functions.database.ref("/drawings/{pushid}").onWrite(event => {
    console.log("event getriggert");
    // Only edit data when it is first created.
    if (event.data.previous.exists()) {
        console.log("no data")

        return;
    }
    // Exit when the data is deleted.
    if (!event.data.exists()) {
        console.log("no data")

        return;
    }
    const data = event.data.val();
    const topicid = data.topic;
    const drawingid = event.params ? event.params.pushid : null;
    const updates = { [drawingid+""]:true};
    admin.database().ref("topics/"+topicid+'/drawings').update(updates);
});