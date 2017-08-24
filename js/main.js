// Scroll top value to reset viewport top to be at the tabs
var scrollTopReset = 726;

// Clicking tabs for different articles
var tabLinks = document.querySelectorAll('.tabs li');

function tabClick(e) {
	// Switch active tab
	e = e || window.event;
	var oldActiveTab = document.querySelector('.tabs li[data-state="active"]');
	oldActiveTab.setAttribute('data-state', 'inactive');
	var target = e.target || e.srcElement;
	target.setAttribute('data-state', 'active');

	// Show/hide corresponding content
	var oldArticle = document.querySelector("#article" + oldActiveTab.id.substring(3));
	var newArticle = document.querySelector("#article" + target.id.substring(3));
	oldArticle.setAttribute('data-state', 'inactive');
	newArticle.setAttribute('data-state', 'active');

	// Animate scroll to top of tabs
	$("html, body").animate({ scrollTop: scrollTopReset }, 200);
}
for (var i = 0; i < tabLinks.length; i++) {
	tabLinks[i].addEventListener("click", tabClick);
}

// Clicking nav dropdown toggle on small width screens
// var navDropdownButton = document.querySelector("nav button");
// function dropdownClick(e) {
// 	e = e || window.event;
// 	var nav = document.querySelector("nav");
// 	nav.setAttribute('data-state', nav.getAttribute('data-state') === 'closed' ? 'open' : 'closed');
// }
// navDropdownButton.addEventListener("click", dropdownClick);

// Click to expand FAQ questions to show answer
var faqs = document.querySelectorAll('main #article-3 .faq .question');
function faqClick(e) {
	e = e || window.event;
	var target = e.currentTarget;
	var faq = target.parentElement;

	if (faq.getAttribute('data-state') === 'collapsed') {
		$(faq).animate({
			height: $(faq).get(0).scrollHeight
		}, 300, function() {
			$(this).height('auto');
		});
		faq.setAttribute('data-state', 'expanded');
	}
	else {
		$(faq).animate({
			height: '6rem'
		}, 300);
		faq.setAttribute('data-state', 'collapsed');
	}
}
for (var i = 0; i < faqs.length; i++) {
	faqs[i].addEventListener("click", faqClick);
}

// After a time, add class 'show' to banner elements to animate them in
setTimeout(function() {
	var bgImgs = document.querySelectorAll("#bg-icons > .bg-icon-wrapper");
	for (var i = 0; i < bgImgs.length; i++) {
		bgImgs[i].className += " show";
	}
	document.querySelector("#banner #app-icon").className += " show";
	document.querySelector("#banner h1").className += " show";
	document.querySelector("#banner .attributes").className += " show";
	document.querySelector("#banner .button-container").className += " show";
}, 500);

// Overview main - 'See all features' button scrolls to top and opens features tab
var featuresButton = document.querySelector('#article-1-section-2 #features-link');
function featuresButtonClick() {
	// Inactivate 'Overview' tab and article
	document.querySelector('.tabs #tab-1').setAttribute('data-state', 'inactive');
	document.querySelector('#article-1').setAttribute('data-state', 'inactive');

	// Activate 'Features' tab and article
	document.querySelector('.tabs #tab-2').setAttribute('data-state', 'active');
	document.querySelector('#article-2').setAttribute('data-state', 'active');

	// Animate scroll to top of tabs
	$("html, body").animate({ scrollTop: scrollTopReset }, 200);
}
featuresButton.addEventListener("click", featuresButtonClick);

// When about to scroll tabs off-screen top, change them to fixed position
function bodyScroll() {
	var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	var tabTop = $('.tabs').offset().top - scrollTop;

	if (scrollTop <= scrollTopReset + 1 ) {
		$(".tabs").removeClass("tabs-fixed");
		$("#banner").css("margin-bottom", "0");
	}
	else if (tabTop <= 1) {
		$(".tabs").addClass("tabs-fixed");
		$("#banner").css("margin-bottom", "3.921rem");
	}
	
}
window.addEventListener("scroll", bodyScroll);