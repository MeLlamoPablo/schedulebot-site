"use strict";
import $ from "jquery";

$(document).ready(() => {
	$('.button-collapse').sideNav();
	$('.parallax').parallax();
	$('.materialboxed').materialbox();
	$('.tooltipped').tooltip({delay: 50});
	$('.collapsible').collapsible();

	// Apply collection class to lists inside collapsibles
	$(".collapsible ul").addClass("collection");
	$(".collapsible ul li").each((i, el) => {
		// For some reason marked doesn't always put p inside li
		// If it doesn't have it, add it.
		if ($(el).has("p").length === 0) {
			$(el).html("<p>" + $(el).html() + "</p>");
		}

		$(el).addClass("collection-item");
	});

	// By default, expand the prerequisites collapisble
	$("#collapsible-prerequisites").click();
});
