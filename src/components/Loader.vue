<template>
	<div class="outer-circle">
		<div class="inner-circle"></div>
	</div>
</template>

<style scoped>
.outer-circle {
    width: 3rem;
    height: 3rem;
    background-color: #1a1b1e;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
}

.inner-circle {
    border-radius: inherit;
    background-image: conic-gradient(#fff0, rgb(183, 42, 246), rgb(189, 7, 255));
    position: absolute;
    z-index: -1;
    margin: auto;
    top: -0.6rem;
    bottom: -0.6rem;
    left: -0.6rem;
    right: -0.6rem;
    animation: circle-anim 0.6s linear infinite;
}

@keyframes circle-anim {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>