
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
        createContact(){
            console.log('');
            console.log('creating contact...');
            console.group('Data');
            console.log(`name = ${this.form.name}`);
            console.log(`value = ${this.form.value}`);
            console.log(`marked = false`);
            console.log(`id = ${this.contacts.length + 1}`);
            console.groupEnd();

            const {...contact} = this.form;
            this.contacts.push({...contact, id : this.contacts.length + 1, marked : false});
        },
        otmetit(id){
           this.contacts.find(element => element.id === id).marked = true;

            // for (var i = 0; i <  this.contacts.length; i++){
            //     console.log(this.contacts[i]);
            //     this.contacts[i].marked = !this.contacts[i].marked ? true : false;
            // }
        },

        removeContact(id){
            console.log(`removing item with id = ${id}`);
            var rmid;
            for (var i = 0; i< this.contacts.length; i++){
                if (this.contacts.id === id){
                    rmid = i;
                }
            }

            this.contacts.splice(rmid, 1);
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