function button(color, title, options) {
    var opts = options||{};

    return Ti.UI.createButton({
        title:title,
        color:opts.color||'#ffffff',
        font: {
            fontFamily:opts.fontFamily||'Helvetica Neue',
            fontWeight:opts.fontWeight||'bold',
            fontSize:opts.fontSize||22
        },
        backgroundLeftCap:18,
        backgroundRightCap:18,
        backgroundTopCap:18,
        backgroundBottomCap:18,
        backgroundSelectedImage:'/img/'+color+'ButtonHighlight.png',
        backgroundImage:'/img/'+color+'Button.png',
        height:opts.height||44,
        width:opts.width,
        top:opts.top,
        left:opts.left,
        right:opts.right,
        bottom:opts.bottom
    });
}

// return pre-styled buttons...
exports.blackButton = function(title, options) {
    return button('black', title, options);
};

exports.grayButton = function(title, options) {
    var opts = options||{};
    opts.color = '#000';
    return button('grey', title, options);
};

exports.orangeButton = function(title, options) {
    return button('orange', title, options);
};

// label utility
exports.label = function(text, options) {
    var opts = options||{};
    return Ti.UI.createLabel({
        text:text,
        color:opts.color||'#ffffff',
        font: {
            fontFamily:opts.fontFamily||'Helvetica Neue',
            fontWeight:opts.fontWeight||'normal',
            fontSize:opts.fontSize||14
        },
        textAlign:opts.textAlign||'left',
        height:opts.height,
        width:opts.width,
        top:opts.top,
        left:opts.left,
        right:opts.right,
        bottom:opts.bottom
    });
};

