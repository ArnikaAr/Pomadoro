(function ($){
    /**
     * Render report in view of Highchair's.
     * @plagin
     *  @param {object} obj - object,
     *  witch contain parameters for timer
     *  (time, text==, time for timeout  and callback for next step).
     */
    $.fn.radialTimer = function (obj){
        let time = obj.time;
        const contentDiv = $('.timer__content');
        const spinner = $('.spinner');
        const filler = $('.filler');
        const mask = $('.mask');
        contentDiv.html(obj.content);
        clearAnimation(filler, spinner, mask);
        setTimeout(() => {
            setAnimation(filler, spinner, mask, time);
        }, 0);

        const oneMinuteInterval = setInterval(() => {
            if (time > 1){
                const timeDiv = $('.currentTime');
                time -= 1;
                timeDiv.html(time);
            }
        }, obj.renderInterval * 60 * 1000);

        setTimeout(() => {
            obj.onTimeout();
            mask.css('z-index', '0');
            clearAnimation(filler, spinner, mask);
        }, time * 60 * 1000);
    };

    function clearAnimation(filler, spinner, mask){
        spinner.css('animation', '');
        filler.css('animation', '');
        mask.css('animation', '');
    }

    function setAnimation(filler, spinner, mask, time){
        filler.css('display', 'block');
        mask.css('z-index', '300000');
        spinner.css('animation', 'rota ' + time * 60 + 's linear infinite');
        filler.css('animation', 'opa  ' + time * 60 + 's steps(1, end) infinite reverse');
        mask.css('animation', ' opa  ' + time * 60 + 's steps(1, end) infinite');
    }
}(jQuery));

