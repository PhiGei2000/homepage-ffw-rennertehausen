let animations = document.getAnimations();

animations.forEach((animation) => {
    animation.cancel();
    animation.currentTime = 0;
});

function startAnimations() {
    let animations = document.getAnimations();

    animations.forEach((animation) => {
        if (animation.playState != 'paused') {
            return;
        }

        let element = animation.effect.target;
        let rect = element.getBoundingClientRect();

        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
            animation.play();
        }
    })
}

document.addEventListener('scroll', startAnimations);

startAnimations();