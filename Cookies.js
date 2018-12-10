function getCookie(name) {
	const nameLenPlus = (name.length + 1);
	return document.cookie
		.split(';')
		.map(c => c.trim())
		.filter(cookie => {
			return cookie.substring(0, nameLenPlus) === `${name}=`;
		})
		.map(cookie => {
			return decodeURIComponent(cookie.substring(nameLenPlus));
		})[0] || null;
}

function deleteCookie(name) {
	try {
		document.cookie = name + '= ""; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		return true;
	} catch (error) {
		return false;
	}
}

function deleteAllCookies() {
	const cookies = document.cookie.split(';');

	for (let i = 0; i < cookies.length; i++) {
		const cookie = cookies[i];
		const eqPos = cookie.indexOf('=');
		const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
		document.cookie = name + '= ""; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
	}
}

function setCookie(cname, cvalue, exdays) {
	const d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	const expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

function getCookieObject() {
	const userID = getCookie('userID');
	const tk = getCookie('tk');
	return { userID: userID, tk: tk, data: '' };
}
