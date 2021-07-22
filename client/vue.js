
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.14/dist/vue.esm.browser.js'

new Vue({
    el: "#app",
    data (){
        return {
            form : {
                name : '',
                value : '',
            },
            contacts : [{id: 1, name:'Sergey', value: '79165419136', marked: false}],
        }
    },
    computed : {
        canCreate(){
            return this.form.name.trim() && this.form.value.trim();
        }
    },

    methods : {
        async createContact(){
          
            console.log('');
            console.log('creating contact...');
            console.group('Data');
            console.log(`name = ${this.form.name}`);
            console.log(`value = ${this.form.value}`);
            console.log(`marked = false`);
            console.log(`id = ${this.contacts.length + 1}`);
            console.groupEnd();

            const {...contact} = this.form;

            const response = await fetch('/api/contacts',
                {
                    method: 'POST',
                    headers: new Headers({
                    Accept: '/api/contacts',
                    'Content-Type': 'application/json'}),
                    mode: 'same-origin',
                    body: JSON.stringify(contact)
                });

            console.log(response);
            this.contacts.push({...contact, id : this.contacts.length + 1, marked : false});
        },
        async otmetit(id){
            const response = await fetch('/api/contacts',
                {
                    method: 'PUT',
                    headers: new Headers({
                    Accept: '/api/contacts',
                    'Content-Type': 'application/json'}),
                    mode: 'same-origin',
                    body: JSON.stringify({'id': id})
                });
   
              const idx = this.contacts.findIndex(item=>item.id=== id);
              this.contacts[idx].marked = true;
        },

        async removeContact(id){
            const response = await fetch('/api/contacts',
                {
                    method: 'DELETE',
                    headers: new Headers({
                    Accept: '/api/contacts',
                    'Content-Type': 'application/json'}),
                    mode: 'same-origin',
                    body: JSON.stringify({'id': id})
                });

            this.contacts = this.contacts.filter(item=>item.id!== id);
        }
    },
    async mounted(){
        console.log('ready');
        const data = await request('/api/contacts');
        this.contacts = data;
    }
});

async function request(url, method = "GET", data = null){
    try {
        const headers = {};
        let body;

        if (data){
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }

        console.log('url ',url);
        console.log('method ',method);
        console.log('data ',data);
        const response = await fetch(url, {
            method, headers
        });

        return await response.json();

    } catch (e){
        console.error(e);
    }
}