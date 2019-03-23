<template>
    <v-layout column>
        <v-card flat class="pa-2 pl-3 pr-3">
            <form-wizard
                @on-complete="onComplete"
                shape="tab"
                color="blue">
                <tab-content title="Informasi Ujian" icon="fas fa-info-circle">
                    <form-generator :schema="schema" :model="model" :options="formOptions"></form-generator>
                </tab-content>
                <tab-content title="Data Mahasiswa" icon="fas fa-graduation-cap">
                    Data Mahasiswa
                </tab-content>
                <tab-content title="Dosen Penguji" icon="fas fa-chalkboard-teacher">
                    Dosen Penguji
                </tab-content>
            </form-wizard>
        </v-card>
    </v-layout>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import FormGenerator from 'vue-form-generator'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {
    data() {
        return {
            model: {
                id: 1,
                name: "John Doe",
                password: "J0hnD03!x4",
                            age: 35,
                skills: ["Javascript", "VueJS"],
                email: "john.doe@gmail.com",
                status: true
            },
            schema: {
                fields: [{
                    type: "input",
                                    inputType: "text",
                    label: "ID",
                    model: "id",
                    readonly: true,
                    featured: false,
                    disabled: true
                }, {
                    type: "input",
                                    inputType: "text",
                    label: "Name",
                    model: "name",
                    readonly: false,
                    featured: true,
                    required: true,
                    disabled: false,
                    placeholder: "User's name",
                    validator: FormGenerator.validators.string
                }, {
                    type: "input",
                                    inputType: "password",
                    label: "Password",
                    model: "password",
                    min: 6,
                    required: true,
                    hint: "Minimum 6 characters",
                    validator: FormGenerator.validators.string
                }, {
                    type: "input",
                    inputType: "number",
                    label: "Age",
                    model: "age",
                                    min: 18,
                    validator: FormGenerator.validators.number
                }, {
                    type: "input",
                                    inputType: "email",
                    label: "E-mail",
                    model: "email",
                    placeholder: "User's e-mail address",
                    validator: FormGenerator.validators.email
                }, {
                    type: "checklist",
                    label: "Skills",
                    model: "skills",
                    multi: true,
                    required: true,
                    multiSelect: true,
                    values: ["HTML5", "Javascript", "CSS3", "CoffeeScript", "AngularJS", "ReactJS", "VueJS"]
                }, {
                type: "switch",
                    label: "Status",
                    model: "status",
                    multi: true,
                    readonly: false,
                    featured: false,
                    disabled: false,
                    default: true,
                                    textOn: "Active",
                                    textOff: "Inactive"
                }]
            },

            formOptions: {
                validateAfterLoad: true,
                validateAfterChanged: true
            }
        }
    },

    components: {
        FormWizard,
        TabContent,
        'form-generator': FormGenerator.component
    },

    methods: {
        onComplete: function(){
            alert('Yay. Done!');
        }
    }
}
</script>

<style>
    .wizard-header {
        display: none;
    }

    html {
	font-family: Tahoma;
	font-size: 14px;
}

body {
	font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
	font-size: 14px;
	line-height: 1.42857143;
	color: #333;
}

pre {
	overflow: auto;
}
	pre .string { color: #885800; }
	pre .number { color: blue; }
	pre .boolean { color: magenta; }
	pre .null { color: red; }
	pre .key { color: green; }    

h1 {
	text-align: center;
	font-size: 36px;
	margin-top: 20px;
	margin-bottom: 10px;
	font-weight: 500;
}

fieldset {
	border: 0;
}

.panel {
	margin-bottom: 20px;
	background-color: #fff;
	border: 1px solid transparent;
	border-radius: 4px;
	-webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
	box-shadow: 0 1px 1px rgba(0, 0, 0, .05);
	border-color: #ddd;
}

.panel-heading {
	color: #333;
	background-color: #f5f5f5;
	border-color: #ddd;

	padding: 10px 15px;
	border-bottom: 1px solid transparent;
	border-top-left-radius: 3px;
	border-top-right-radius: 3px;        
}

.panel-body {
	padding: 15px;
}				

.field-checklist .wrapper {
	width: 100%;
}
</style>
