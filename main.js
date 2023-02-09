let endOfThePage = 0;

let preloading = false;

const getData = () => {
	if (!preloading) {
		preloading = true;
		fetch('https://akademia108.pl/api/ajax/get-users.php')
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				let body = document.body;
				let hr = document.createElement('hr');
				body.append(hr);

				for (let user of data) {
					let pId = document.createElement('p');
					let pName = document.createElement('p');
					let pWebsite = document.createElement('p');

					pId.textContent = `User ID: ${user.id}`;
					pName.textContent = `User Name: ${user.name}`;
					pWebsite.textContent = `User URL: ${user.pWebsite}`;

					body.append(pId, pName, pWebsite);
				}
				preloading = false;
				hidePreloader();
			});
	}
};

const showPreloader = () => {
	let preloader = document.getElementById('preloader');
	preloader.style.display = 'block';
};
const hidePreloader = () => {
	let preloader = document.getElementById('preloader');
	preloader.style.display = 'none';
};

const scrollToEndOfPage = () => {
	let d = document.documentElement;
	let scrollHeight = d.scrollHeight;
	let scrollTop = d.scrollTop;
	let clientHeight = d.clientHeight;

	let sumScrolls = clientHeight + scrollTop;
	console.log(sumScrolls);
	console.log(scrollHeight);

	if (sumScrolls >= scrollHeight) {
		endOfThePage++;
		// console.log(endOfThePage);
		showPreloader();
		getData();
	}
};

window.addEventListener('scroll', scrollToEndOfPage);
