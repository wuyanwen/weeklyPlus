const api = {
	development: 'http://127.0.0.1:1111',
	production: "http://api.feweekly.vue-js.com:9090"
}
export const frontUrl = (function(){
	if(process.env.NODE_ENV) return api[process.env.NODE_ENV];
	return api['development'];
})()