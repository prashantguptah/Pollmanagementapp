// middleware/auth.js
import firebase from '~/plugins/firebase';

export default function ({ redirect }) {
  const user = firebase.auth().currentUser;
  if (!user) {
    return redirect('/login');
    console.log(middleware)
  }
}
