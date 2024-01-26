<template>
	<footer>
		<div>
			<a
				id="podcast-link"
				href="https://itbeard.com/aia"
				target="_blank"
			>AIA Podcast</a>
			<a
				id="podcast-chat-link"
				href="https://t.me/aiapodcast"
				target="_blank"
			>{{ $t('podcastChatLinkText') }}</a>
			<a
				href="https://aw.club"
				target="_blank"
			>AW Club</a>
			<a
				id="github-code-link"
				href="https://github.com/awclub/catalog"
				target="_blank"
			>{{ $t('githubCodeLinkText') }}</a>
		</div>
	</footer>
</template>

<style scoped>
footer {
    padding: 10px;
    text-align: center;
    max-width: 1200px;
    margin: 35px auto 10px;
    flex: 0 0 auto;
    width: 100%;
}

footer div {
    background-color: rgb(241, 235, 244);
    border-radius: 10px;
    padding: 5px 10px;
}

footer a {
    margin: 0 10px;
    color: #333;
    padding: 5px;
    display: inline-block;
}

</style>
