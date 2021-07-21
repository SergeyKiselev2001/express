import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

new Vue({
    el: "#app",
    data (){
        return {
            name : '',
            value : ''
        }
    },

    methods : {
        createContact(){
            console.log('creating contact...');
            console.log(`name = ${this.name}`);
            console.log(`value = ${this.value}`);
        }
    }
});