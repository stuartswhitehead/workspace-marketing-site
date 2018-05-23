// Overflow menu for tabs on small width screens
var overflowButton = document.querySelector('#overflow-menu #overflow-button');
var overflowMenu = document.querySelector('#overflow-menu > ol');
function toggleOverflowTabMenu() {
	overflowMenu.setAttribute('data-state', overflowMenu.getAttribute('data-state') === 'closed' ? 'open' : 'closed');
}
overflowButton.addEventListener("click", toggleOverflowTabMenu);

// Switch tabs, hide/show the appropriate content, select the corresponding tabs
function showTab(tabName) {
	// Invalid tab name check
	if (!document.querySelector('#' + tabName)) {
		return;
	}

	// Switch active tab
	var oldActiveTab = document.querySelector('.tabs .tab-value[data-state="active"]');
	oldActiveTab.setAttribute('data-state', 'inactive');
	var newTab = document.querySelector('#' + tabName);
	newTab.setAttribute('data-state', 'active');

	// Switch active overflow tab
	var oldActiveOverflowTab = document.querySelector('.tabs #overflow-menu ol li[data-state="active"]');
	oldActiveOverflowTab.setAttribute('data-state', 'inactive');
	var newActiveOverflowTab = document.querySelector("#overflow-" + tabName);
	newActiveOverflowTab.setAttribute('data-state', 'active');

	// Show/hide corresponding content (article)
	var oldArticle = document.querySelector("#article-" + oldActiveTab.id);
	oldArticle.setAttribute('data-state', 'inactive');
	var newArticle = document.querySelector("#article-" + tabName);
	newArticle.setAttribute('data-state', 'active');

	// Animate scroll to top of tabs
	var tabMarker = $('#tab-marker').offset().top;
	$("html, body").animate({ scrollTop: tabMarker }, 200);

	// Update URL
	if (window.history && history.pushState) {
		history.replaceState("", "", "?tab=" + tabName);
	}
}

// Clicking tabs for different articles
var tabLinks = document.querySelectorAll('.tabs .tab-value');
function tabClick(e) {
	e = e || window.event;
	var target = e.target || e.srcElement;
	showTab(target.id);
}
for (var i = 0; i < tabLinks.length; i++) {
	tabLinks[i].addEventListener("click", tabClick);
}

// Clicking overflow tabs for different articles
var overflowTabLinks = document.querySelectorAll('.tabs #overflow-menu ol li');
function overflowTabClick(e) {
	// Switch active overflow tab
	e = e || window.event;
	var target = e.target || e.srcElement;
	showTab(target.id.substring(9));

	// Close menu
	toggleOverflowTabMenu();
}
for (var i = 0; i < overflowTabLinks.length; i++) {
	overflowTabLinks[i].addEventListener("click", overflowTabClick);
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
var faqs = document.querySelectorAll('main #article-faq .faq .question');
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
			height: '6.5rem'
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
	showTab("features");
}
featuresButton.addEventListener("click", featuresButtonClick);

// When about to scroll tabs off-screen top, change them to fixed position
function bodyScroll() {
	// How far you are scrolled down the page
	var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	// Distance of the top of .tabs from your current scrolled Y position
	var tabTop = $('.tabs').offset().top - scrollTop;
	// Distance of the top of unfixed .tabs from the top of the entire page
	var tabMarker = $('#tab-marker').offset().top;

	// If you scroll up past where the tabs are placed when they are not fixed, un-fix tabs
	if (scrollTop <= tabMarker + 1) {
		$(".tabs").removeClass("tabs-fixed");
		$("#tab-marker").css("height", "0");
	}
	// If the top of .tabs meets the top of the scrolled window, fix .tabs
	else if (tabTop <= 1) {
		$(".tabs").addClass("tabs-fixed");
		$("#tab-marker").css("height", "3.921rem");
	}
	
}
window.addEventListener("scroll", bodyScroll);

// Modal use case story
var closeButton = document.querySelector(".modal-container > svg");
var useCaseText = document.querySelectorAll("main #article-use-cases .use-case .example");
var modal = document.querySelector(".modal-container");
var overlay = document.querySelector(".modal-overlay");
function toggleModal() {
	document.getElementsByTagName("body")[0].classList.toggle("no-scroll");

	if (modal.getAttribute('data-state') === 'closed') {
		// Switch active modal text
		var oldActiveText = document.querySelector('.modal .modal-content[data-state="active"]');
		oldActiveText.setAttribute('data-state', 'inactive');
		var newText = document.querySelector('#modal-content-' + this.id);
		newText.setAttribute('data-state', 'active');

		$(".modal").fadeIn(300, function() {
			modal.setAttribute('data-state', 'open');
			overlay.setAttribute('data-state', 'open');
		});
	}

	else {
		$(".modal").fadeOut(300, function() {
			modal.setAttribute('data-state', 'closed');
			overlay.setAttribute('data-state', 'closed');
		});
	}
}
for (var i = 0; i < useCaseText.length; i++) {
	useCaseText[i].addEventListener('click', toggleModal);
}
closeButton.addEventListener('click', toggleModal);
overlay.addEventListener('click', toggleModal);

// Send user to right tab based on URL
document.addEventListener('DOMContentLoaded', function() {

	// Parse URL for params
	var urlParams = {};
	window.location.href.replace(
	    new RegExp("([^?=&]+)(=([^&]*))?", "g"),
	    function($0, $1, $2, $3) { urlParams[$1] = $3; }
	);

	// If there is a "tab" URL param, make sure the corresponding content is shown
	//   and the appropriate tab is selected
	if (urlParams.tab) {
		showTab(urlParams.tab);
	}
}, false);

// Color status dot with current status
var getJSON = function(url, callback) {
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	xhr.responseType = 'json';
	xhr.onload = function() {
		var status = xhr.status;
		if (status === 200) {
			callback(null, xhr.response);
		} else {
			callback(status, xhr.response);
		}
	};
	xhr.send();
};
var statusURL = 'https://api.status.io/1.0/status/5a25f61f15f9ee756dc775de'; 
var statusDot = document.querySelector(".status-dot");
getJSON(statusURL,
	function(err, data) {
		if (err !== null) {
			window.console.log('Something went wrong: ' + err);
		} else {
			var currentStatus = data.result.status_overall.status_code;
			switch(currentStatus) {
				case 100:
					break;
				case 300:
					statusDot.classList += " orange";
					break;
				case 400:
					statusDot.classList += " orange";
					break;
				case 500:
					statusDot.classList += " red";
					break;
				case 600:
					statusDot.classList += " red";
					break;
				default:
					break;
			}
		}
	}
);