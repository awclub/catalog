export const clickOutsideDirective = {
	mounted: (el, binding) => {
		// Define a function to handle clicks
		el.__clickOutsideHandler__ = (event) => {
			// Check if the click was outside the el and its children
			if (!(el === event.target || el.contains(event.target))) {
				// Call the method provided as the directive's value
				binding.value(event);
			}
		};
		// Attach the click handler to the document
		document.addEventListener('click', el.__clickOutsideHandler__);
	},
	unmounted: (el) => {
		// Remove the click handler from the document
		document.removeEventListener('click', el.__clickOutsideHandler__);
		el.__clickOutsideHandler__ = null;
	}
}