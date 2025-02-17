<template>
    <button @click="logout">Logout</button>
  </template>
  
  <script>
  import firebase from '~/plugins/firebase';
  
  export default {
    methods: {
      async logout() {
        await firebase.auth().signOut();
        this.$router.push('/login');
      },
    },
  };
  </script>
  