import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

export const onNewRating = functions.database.ref("/ratings/{pushid}/ratings/{userid}").onWrite(event => {
    let addToScore = 0;
    const parentRef = event.data.ref.parent.parent;
    if (event.data.previous.exists()) {
        addToScore -= getScoreFromChar(event.data.previous.val());
        changeCountOfChar(parentRef, event.data.previous.val(), -1);
    }
    if (event.data.exists()) {
        addToScore += getScoreFromChar(event.data.val());
        changeCountOfChar(parentRef, event.data.val(), 1);
    }
    parentRef.child('totalScore').transaction(x => {
        return x += addToScore;
    });
});

function getScoreFromChar(char: string): number {
    switch (char) {
        case "😍": return 100;
        case "💩": return -50;
        case "😐": return 10;
        case "👍": return 25;
        case "👎": return -25;
        default: return 1;
    }
}
function changeCountOfChar(parentRef: admin.database.Reference, char: string, value: number) {
    parentRef.child('scores/' + char).transaction(x => {
        return x = (x || 0) + value;
    })
}