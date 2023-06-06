window.addEventListener('load', ()=>{
	if(document.querySelectorAll('[data-activator="policy-activate"]')){
		const policyButtons = document.querySelectorAll('[data-activator="policy-activate"]');
		
		const openPopUp = (e)=>{
			e.preventDefault();
			document.querySelector('#policy-popup').classList.remove('hidden-policy');
			document.querySelector('html').style.overflow = 'hidden-policy';
			document.querySelector('html').style.height = '100vh';
			document.querySelector('.close-button').addEventListener('click', ()=>{
			document.querySelector('html').style.overflow = 'auto';
			document.querySelector('html').style.height = 'auto';
			document.querySelector('#policy-popup').classList.add('hidden-policy');
			})
		}
	
		for(let i = 0; i < policyButtons.length; i++){
		policyButtons[i].addEventListener('click', openPopUp);
		}
	}
})
