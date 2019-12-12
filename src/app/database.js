const firebase = require("firebase");
require('./components/notification/notification');

var firebaseConfig = {
    apiKey: "AIzaSyA2UWUMZ_DEo2i_b2eX-fStDDn7jDVGoVQ",
    authDomain: "pomadoro-productivityapp.firebaseapp.com",
    databaseURL: "https://pomadoro-productivityapp.firebaseio.com",
    projectId: "pomadoro-productivityapp",
    storageBucket: "pomadoro-productivityapp.appspot.com",
    messagingSenderId: "148347367847",
    appId: "1:148347367847:web:cfc39010c400dc3e3b8682"
};


firebase.initializeApp(firebaseConfig);
const pomadoroDB = firebase.firestore();


class DataBase {
    constructor() {

    }

    getData(coll) {
        return pomadoroDB.collection(coll).get()
            .then((snapshot) => {
                const array = snapshot.docs.map(doc => {
                    const id = doc.id;
                    return {...doc.data(), id}
                });
                return array;
            })
    }

    setSetting(data) {
        pomadoroDB.collection("settings").doc('values').update({
            workIteration: data.workIteration,
            workTime: data.workTime,
            shortBreak: data.shortBreak,
            longBreak: data.longBreak
        }).then(() => {
            $().notification({type: 'success', text: 'Settings was successfully saved!', showTime: 3000});
        }, () => console.error('Data is not saved'));
    }


    setCurrentStatus(document) {
        pomadoroDB.collection("tasks").doc(document).update({
            listStatus: 'daily'
        }).then(() =>   $().notification({type: 'info', text: 'You task was moved to the daily task list', showTime: 3000}), () => console.error('Data is not saved'));
    }

    setDoneTask(id, estimation, fail, finish, faild, completeDate) {
        pomadoroDB.collection("tasks").doc(id).update({
            done: true,
            estimation: estimation,
            faildPomodoros: fail,
            finishPomadoros: finish,
            faild: faild,
            completeDate: completeDate,
            active: "complete"
        }).then(() => {
            $().notification({type: 'success', text: 'You finished pomodoro!', showTime: 3000});
        }, () => console.error('Data is not saved'));

    }

    setTask(obj) {
        if (obj !== undefined) {
            pomadoroDB.collection("tasks").add({
                title: obj.title,
                description: obj.description,
                category: "category__" + obj.category + "",
                estimation: +obj.estimation,
                priority: obj.priority,
                data: obj.date,
                createDate: new Date(),
                listStatus: "global",
                status: "non-active",
                completedCount: null,
                faildPomodoros: null,
                completeDate: '',
                done: false

            }).then(function () {
                $().notification({type: 'success', text: 'Your task was successfully saved.', showTime: 3000});
            }).catch(function (error) {
            });
        } else {
            $().notification({type: 'faild', text: 'Unable to save your task. Try again later', showTime: 3000});
        }
    }

    editTask(obj, id) {
        pomadoroDB.collection("tasks").doc(id).update({
            title: obj.title,
            description: obj.description,
            category: "category__" + obj.category + "",
            estimation: obj.estimation,
            priority: obj.priority,
            data: obj.date,
            createDate: new Date(),
            status: "non-active",
            completedCount: null,
            faildPomodoros: null,
            completeDate: ''
        }).then(() => {
            $().notification({type: 'success', text: 'Your task was successfully edited!', showTime: 3000});

        }).catch(function (error) {
            $().notification({type: 'faild', text: 'Unable to edit your task. Try again later', showTime: 3000});
        });
    }

    remove(elem) {
        pomadoroDB.collection("tasks").doc(elem).delete()
            .then(function () {
                $().notification({type: 'success', text: 'Your task was successfully removed', showTime: 3000});
            })
            .catch(function (error) {
                $().notification({type: 'faild', text: 'Your task was not successfully deleted!', showTime: 3000});
            });
    }

    changeTaskStatusToActive(id, status) {
        if (status === 'active') {
            pomadoroDB.collection("tasks").doc(id).update({
                status: 'active'
            }).then(() => console.log('Data is saved'), () => console.error('Data is not saved'));
        } else if (status === 'nonactive') {
            pomadoroDB.collection("tasks").doc(id).update({
                status: 'nonactive'
            }).then(() => console.log('Data is saved'), () => console.error('Data is not saved'));
        }
    }

}

const pomadoroDatabase = new DataBase();
export {pomadoroDatabase}