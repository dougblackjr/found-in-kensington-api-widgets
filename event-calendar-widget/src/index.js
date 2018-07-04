import 'vue-event-calendar/dist/style.css'
import Vue from 'vue'
import vueEventCalendar from 'vue-event-calendar'

Vue.use(vueEventCalendar, {locale: 'en'})

const app = new Vue({
	el: '#app',
	mounted() {
		console.log('hallo world')
	}
});