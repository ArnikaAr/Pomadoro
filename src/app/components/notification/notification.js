const notification = require('./notification.hbs');

(function ($){
    /**
     * plagin for render notification.
     * @function
     *  @param {object} object - object,
     *  witch contain parameters for notification(time, text and type of note).
     */
    $.fn.notification = function (object){
        if(object.type === undefined || !object.type){
            object.type = 'info';
        }
        render(object);
        return this;
    };
    /**
     * Render notification.
     * @function
     *  @param {object} type - object,
     *  witch contain parameters for notification(time, text and type of note).
     */
    function render(object){
        $('#content').append(notification(object));
        if(object.type !== 'faild'){
            $('.note').fadeOut(object.showTime);
        }
        $('.icon-close').bind('click', function(){
            $('.note').css('display', 'none');
        });
    }
})(jQuery);
