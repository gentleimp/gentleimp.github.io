const tabs = document.querySelectorAll('nav a');
const content = document.querySelector('#content');
const preloader = document.querySelector('#preloader');
const xhr = new XMLHttpRequest();

function showTab(event) {
	event.preventDefault();
	if (event.currentTarget.classList.contains('active')) {
		return;
	}
	for (tab of tabs) {
		tab.classList.remove('active');
	}
	event.currentTarget.classList.add('active');
	preloader.classList.remove('hidden');
	
    xhr.open(`GET`, event.currentTarget.href, true);
    xhr.send();
    xhr.addEventListener(`load`, function() {
       	if(xhr.status !== 200) {
        	console.log(new Error('Error!'));
        	return;
        }
    	preloader.classList.add('hidden');  
      	content.innerHTML = xhr.responseText;      	
	});
}

for (tab of tabs) {
	if (tab.classList.contains('active')) {
		xhr.open(`GET`, tab.href, true);
    	xhr.send();
    	xhr.addEventListener(`load`, function() {
       		if(xhr.status !== 200) {
        		console.log(new Error('Error!'));
        		return;
        	}
    		preloader.classList.add('hidden');  
      		content.innerHTML = xhr.responseText;      	
		});
	}
	tab.addEventListener('click', showTab);
}