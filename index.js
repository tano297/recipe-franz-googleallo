module.exports = Franz => class Discord extends Franz {
    overrideUserAgent() {
        //const useragent = window.navigator.userAgent;
        //return useragent.replace('Chrome/52', 'Chrome/61');
        //return "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36";
		return window.navigator.userAgent;
    }
}; 