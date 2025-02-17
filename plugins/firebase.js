import firebase from "firebase/compat/app";
import 'firebase/auth'
import firebaseConfig from "~/firebase.config";

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
}else{
    firebase.app()
}

export default firebase;