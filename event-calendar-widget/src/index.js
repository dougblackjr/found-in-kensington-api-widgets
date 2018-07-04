import 'vue-event-calendar/dist/style.css'
import '../style/app.scss'
import Vue from 'vue'
import vueEventCalendar from 'vue-event-calendar'
import moment from 'moment'
import axios from 'axios'

Vue.use(vueEventCalendar, {locale: 'en'})

const app = new Vue({
	el: '#app',
	data () {
		return {
			demoEvents: [{
				date: '2016/11/12', // Required
				title: 'Foo' // Required
			}, {
				date: '2016/12/15',
				title: 'Bar',
				desc: 'description',
				customClass: 'disabled highlight' // Custom classes to an calendar cell
			}],
			events: []
		}
	},
	methods: {
		getEvents(category = null) {
			this.events = []
			var self = this,
				url;

			if(category) {
				url = 'https://foundinkensington.com/api/event?cat=' + category
			} else {
				url = 'https://foundinkensington.com/api/event'
			}
			axios.get(url)
			.then(res => {

				let output = []
				res.data.fikapi.data.forEach( function(appt, index) {
					let eDescription = self.makeDescription(appt)

					output.push({
						date: moment.unix(appt.start).format('YYYY/MM/DD'),
						title: appt.title,
						desc: eDescription
					})


				});

				self.events = output
				self.$forceUpdate();
				self.$EventCalendar.toDate(moment().format('YYYY/MM/DD'))
			})
			.catch(res => {});
		},
		makeDescription(appt) {
			console.log('getting appt', appt.start, appt.end)
			let desc = '',
				start = moment.unix(appt.start).format('MMM DD, HH:mm'),
				end = moment.unix(appt.end).format(appt.all_day ? 'MMM DD, HH:mm' : 'HH:mm')
			
			desc += start + ' ~ ' + end + '\n'
			desc += appt.description + '\n'
			if(appt.address) {
				desc += 'Location: \n'
				desc += appt.address + ', ' + appt.city + ', ' + appt.state + ' ' + appt.zip
			}
			return desc; 
		}
	},
	mounted() {
		console.log('hallo world')
		this.getEvents();
	}
});