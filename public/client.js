/**
 * Created by szh on 4/11/17.
 */


/************ control webcam ****************/


function hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
}
function controlWebCam() {
    if (hasUserMedia()) {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        //get both video and audio streams from user's camera
        navigator.getUserMedia({ video: true, audio: false }, function (stream) {
            var video = document.querySelector('video');
            var track = stream.getTracks()[0];
            var localStream = stream;
            //insert stream into the video tag
            // if (video.paused){
            if (webCamOn){
                video.src = window.URL.createObjectURL(stream);
                video.play();
                // $('#btn_video_on').find('img').attr('src', 'img/btnOn.png');
            }
            else{
                // $('#btn_video_on').find('img').attr('src', 'img/btnOff.png');
                video.src = "";
                track.stop();
                video.pause();
                // location.reload();

            }
        }, function (err) {});

    }else {
        alert("Error. WebRTC is not supported!");
    }
}
/****************** makeup removal btn Control ********************/
var webCamOn = false;
var LiveVideo = function () {
    var obj = $('#camera_popout_container');
    var ratio = 1.7;
    setRatio(obj,ratio);
    $(window).resize(function(){
        setRatio(obj,ratio);
    });

    $(window).resize(function(){
        setRatio(obj,ratio);
    });
    if (webCamOn){
        $('#btn_video_on').find('img').attr('src', 'img/btnOff.png');
        controlWebCam();
        webCamOn = false;
    }else{
        $('#camera_popout_container').show();
        $('#hide_layer').show();
        $('#btn_sure').click(function () {
            $('#camera_popout_container').hide();
            $('#hide_layer').hide();
            controlWebCam();
            $('#btn_video_on').find('img').attr('src', 'img/btnOn.png');
            webCamOn = true;
        });
        $('#btn_template').click(function () {
            $('#camera_popout_container').hide();
            $('#hide_layer').hide();
            webCamOn = false;
        });
        $('#camera_popout_close').click(function () {
            $('#camera_popout_container').hide();
            $('#hide_layer').hide();
            webCamOn = false;
        });
        // controlWebCam();
    }
};

var removeMakeup = false;
var makeupRemove = function () {
    var obj = $('#removal_popout_container');
    var ratio = 1.7;
    setRatio(obj,ratio);
    $(window).resize(function(){
        setRatio(obj,ratio);
    });

    if (removeMakeup){
        removeMakeup = false;
        $('#btn_makeUp_on').find('img').attr('src', 'img/btnOff.png');
    }else{
        $('#removal_popout_container').show();
        $('#hide_layer').show()

        // $("body").css("overflow","hidden");

        $('#btn_remove').click(function () {
            removeMakeup = true;
            $('#btn_makeUp_on').find('img').attr('src', 'img/btnOn.png');
            $('#removal_popout_container').hide();
            $('#hide_layer').hide();
        });
        $('#btn_toGo').click(function () {
            $('#removal_popout_container').hide();
            $('#hide_layer').hide();
            removeMakeup = false;
        });
        $('#removal_popout_close').click(function () {
            $('#removal_popout_container').hide();
            $('#hide_layer').hide();
            removeMakeup = false;
        });

    }
};
/***************** add saved look Recommendation page *************/ 
var ChosenProduct = [];
var lipstickProduct = {
    "product": "lipstick",
    "name": "ROUGH COCO SHINE",
    "color": "",
    "description": "Hydrating Sheer Lipshine",
    "imgPath": "img/lipstick1.png"
};
var eyeshadowProduct = {
    "product": "eyeshadow",
    "name": "LES 4 OMBRES",
    "color": "",
    "description": "Multi Effect Quadra Eyeshadow",
    "imgPath": "img/les4.png"
};

var lipChecked = false;
var eyeChecked = false;
var savedRecommendList = [];
var LipCheck = function(){
    if (!lipChecked){
        lipChecked = true;
        $('#lipPro').css('display','inline-block');
        $('#lipColor').find('img').attr('src', 'img/lipcolor_selected.png');
        var contained = false;
        for (var i = 0; i < ChosenProduct.length; i++){
            if (ChosenProduct[i].product === "lipstick"){
                contained = true;
            }
        }
        if (contained === false){
            ChosenProduct.push(lipstickProduct);
        }
    }else{
        lipChecked = false;
        $('#lipPro').css('display','none');
        $('#lipColor').find('img').attr('src', 'img/lipcolor_unselected.png');
        for (var i = 0; i < ChosenProduct.length; i++){
            if (ChosenProduct[i].product === "lipstick"){
                ChosenProduct.splice(i, 1);
            }
        }
    }
    if (ChosenProduct.length == 0){
        $('#bookmark').find('img').attr('src', 'img/Bookmark.png');
    }
    else{
        if (ChosenProduct.length > savedRecommendList.length){
            $('#bookmark').find('img').attr('src', 'img/Bookmark.png');
        }
        else{
            var temp = 0;
            while (temp < ChosenProduct.length){
                var saved = false;
                for (var j = 0; j < savedRecommendList.length; j++){
                    if (ChosenProduct[temp].product === savedRecommendList[j].product){
                        temp++;
                        saved = true;
                        break;
                    }
                }
                if (saved == false){
                    break;
                }
            }
            if (temp === ChosenProduct.length){
                $('#bookmark').find('img').attr('src', 'img/Bookmark_colored.png');
            }else{
                $('#bookmark').find('img').attr('src', 'img/Bookmark.png');
            }
        }
    }
};
var eyeShadowCheck = function() {
    if (!eyeChecked){
        eyeChecked = true;
        $('#eyeShadowPro').css('display','inline-block');
        $('#eyeShadow').find('img').attr('src', 'img/eyeshadow_selected.png');
        var contained = false;
        for (var i = 0; i < ChosenProduct.length; i++){
            if (ChosenProduct[i].product === "eyeshadow"){
                contained = true;
            }
        }
        if (contained === false){
            ChosenProduct.push(eyeshadowProduct);
        }
    }

    else{
        eyeChecked = false;
        $('#eyeShadowPro').css('display','none');
        $('#eyeShadow').find('img').attr('src', 'img/eyeshadow_unselected.png');
        for (var i = 0; i < ChosenProduct.length; i++){
            if (ChosenProduct[i].product === "eyeshadow"){
                ChosenProduct.splice(i, 1);
            }
        }
    }
    if (ChosenProduct.length == 0){
        $('#bookmark').find('img').attr('src', 'img/Bookmark.png');
    }
    else{
        if (ChosenProduct.length > savedRecommendList.length){
            $('#bookmark').find('img').attr('src', 'img/Bookmark.png');
        }
        else{
            var temp = 0;
            while (temp < ChosenProduct.length){
                var saved = false;
                for (var j = 0; j < savedRecommendList.length; j++){
                    if (ChosenProduct[temp].product === savedRecommendList[j].product){
                        temp++;
                        saved = true;
                        break;
                    }
                }
                if (saved == false){
                    break;
                }
            }
            if (temp === ChosenProduct.length){
                $('#bookmark').find('img').attr('src', 'img/Bookmark_colored.png');
            }else{
                $('#bookmark').find('img').attr('src', 'img/Bookmark.png');
            }
        }
    }
};

var addRecommendationPro = function() {
    $('#savedContainerTop3').empty();
    var savedProNumber = Math.min(2, savedRecommendList.length);
    for (var i = 0; i < savedProNumber; i++) {
        var id = "div_top3_" + i;
        var iconContainerId = "savedIconContainer_3_" + i;
        var iconImgId = "savedIconImg_3_" + i;
        var infoContainerId = "savedInfoContainer_3_" + i;
        var infoId = "savedInfo_3_" + i;
        var btnContainer = "savedBtn_3_" + i;
        var oDiv = document.createElement("DIV");
        oDiv.id = id;
        $('#savedContainerTop3').append(oDiv);
        $("#" + oDiv.id).css({
            'position': 'relative',
            'width': '20%',
            'height': '40%',
            'color': 'black',
            'display': 'inline-block',
            'margin': '3%  9% 3% 4%'
        });
        var savedIconContainer = "<div id=" + iconContainerId + " style='width: 35%; height: 100%; display:inline-block'><img id=" + iconImgId + " style='width: 100%; height: 100%'></div>";
        var savedInfoContainer = "<div id=" + infoContainerId + "></div>";
        var savedInfo = "<div id=" + infoId + "><p></p><p></p></div>";
        var savedBtnContainer = "<div id=" + btnContainer + " ></div>";

        // var savedBtnContainer = "<div id=" + btnContainer + " >Try Again</div>";

        $("#" + id).append(savedIconContainer);
        $("#" + id).append(savedInfoContainer);
        $("#" + infoContainerId).append(savedInfo);
        $("#" + infoContainerId).append(savedBtnContainer);

        $('#' + iconImgId).attr('src', savedRecommendList[savedRecommendList.length - i - 1].imgPath);
        $("#" + infoContainerId).css({
            'display': 'inline-block',
            'float': 'right',
            'clear': 'both',
            'line-height': '100%',
            'width': '60%',
            'height': '100%'
        });
        $("#" + infoId).css({
            'display': 'inline-block',
            'float': 'right',
            'clear': 'both',
            'height': '60%',
            'width': '100%'
        });
        $('#' + infoId).find('p:first').css({
            'font-size': '1.4rem',
            'font-weight': 'bold',
            'line-height': '150%',
            'overflow': 'hidden',
            'text-overflow': 'ellipsis',
            'white-space': 'nowrap'
        });
        $('#' + infoId).find('p:eq(1)').css({
            'font-size': '1.4rem',
            'font-weight': 'normal',
            'line-height': '1.4rem'
        });

        $('#' + infoId).find('p:eq(0)').html(savedRecommendList[savedRecommendList.length - i - 1].name);
        $('#' + infoId).find('p:eq(1)').html(savedRecommendList[savedRecommendList.length - i - 1].description);
        $('#' + btnContainer).css({
            'position': 'absolute',
            'bottom': '2%',
            'display': 'inline-block',
            'float': 'left',
            'clear': 'both',
            'width': '58%',
            'height': '35%',
            'background-image': 'url(' + 'img/try_again.png)',
            'background-size': 'cover',
            'background-position': 'center'
        });
        $('#' + btnContainer).hover(
            function () {
                $(this).css('cursor', 'pointer');
            },
            function () {
                $(this).css('cursor', 'auto');
            }
        );
        var ProductNameList = ["lipstick", "eyeshadow"];
        (function(){
            // var lipstickProduct = {
            //     "product": "lipstick",
            //     "name": "ROUGH COCO SHINE",
            //     "color": "",
            //     "description": "Hydrating Sheer Lipshine",
            //     "imgPath": "img/lipstick1.png"
            // };
            // var eyeshadowProduct = {
            //     "product": "eyeshadow",
            //     "name": "LES 4 OMBRES",
            //     "color": "",
            //     "description": "Multi Effect Quadra Eyeshadow",
            //     "imgPath": "img/les4.png"
            // };
            var curProduct = savedRecommendList[savedRecommendList.length-1-i].product;
            // var curIntro = savedProductList[savedProductList.length-1-i].intro;
            // var curID = savedProductList[savedProductList.length-1-i].id;
            // var colorNumber = savedProductList[savedProductList.length-1-i].color;
            // var colorDes = savedProductList[savedProductList.length-1-i].description;
            // var colorImg = savedProductList[savedProductList.length-1-i].imgPath;
            var curSaved = true;
            $('#' + btnContainer).click(function () {
                for (var k = 0; k < ProductNameList.length; k++){
                    if (curProduct === ProductNameList[k] && k == 0){
                        lipChecked = false;
                        LipCheck();
                        break;
                    }
                    if (curProduct === ProductNameList[k] && k == 1){
                        eyeChecked = false;
                        eyeShadowCheck();
                        break;
                    }
                }
                // $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');
                
            });
        })();
    }
};
var RecommendationBookmark = function () {
    $('#savedLookProduct').show();
    $('#savedProductMsg').hide();
    // console.log(savedRecommendList.length);
    // console.log(ChosenProduct.length);

    if (ChosenProduct.length > savedRecommendList.length){
        savedRecommendList = [];
        for (var i = 0; i < ChosenProduct.length; i++){
            savedRecommendList.push(ChosenProduct[i]);
            $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');

        }
    }
    else if (ChosenProduct.length == savedRecommendList.length){
        if (ChosenProduct.length == 1 && savedRecommendList.length == 1){
            if (ChosenProduct[0].product !== savedRecommendList[0].product){
                    savedRecommendList.push(ChosenProduct[0]);
                $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');
                }else{
                    savedRecommendList = [];
                $('#bookmark').find('img').attr('src','img/Bookmark.png');
                $('#savedLookProduct').hide();
                    $('#savedProductMsg').show();
                }
        }
        else if (ChosenProduct.length == 2 && savedRecommendList.length ==2){
            $('#bookmark').find('img').attr('src','img/Bookmark.png');
            savedRecommendList = [];
            $('#savedLookProduct').hide();
            $('#savedProductMsg').show();
        }
    }
    else{
        for (var i = 0; i < savedRecommendList.length; i++){
            if (savedRecommendList[i].product == ChosenProduct[0].product){
                savedRecommendList.splice(i, 1);
                $('#bookmark').find('img').attr('src','img/Bookmark.png');
            }
        }
    }
    addRecommendationPro();
};
    
/***************** add saved look Try on page *************/

/***** top 3 saved look *******/
// saved looks count
var curLipstick = {};
var addDivTopThree = function(){
    $('#savedContainerTop3').empty();
    var savedProNumber = Math.min(3, savedProductList.length);
    for (var i = 0; i < savedProNumber; i++){
        var id = "div_top3_" + i;
        var iconContainerId = "savedIconContainer_3_" + i;
        var iconImgId = "savedIconImg_3_" + i;
        var infoContainerId = "savedInfoContainer_3_" + i;
        var infoId = "savedInfo_3_" + i;
        var btnContainer = "savedBtn_3_" + i ;
        var oDiv = document.createElement("DIV");
        oDiv.id = id;
        // oDiv.innerHTML = divsTopThree;
        $('#savedContainerTop3').append(oDiv);
        $("#" + oDiv.id).css({
            'position':'relative',
            'width': '20%',
            'height': '40%',
            'color': 'black',
            'display': 'inline-block',
            'margin': '3%  9% 3% 4%'
        });

        var savedIconContainer = "<div id=" + iconContainerId + " style='width: 35%; height: 100%; display:inline-block'><img id=" + iconImgId + " style='width: 100%; height: 100%'></div>";
        var savedInfoContainer = "<div id=" + infoContainerId + "></div>";
        var savedInfo = "<div id=" + infoId + "><p></p><p></p></div>";
        var savedBtnContainer = "<div id=" + btnContainer + " ></div>";
        
        // var savedBtnContainer = "<div id=" + btnContainer + " >Try Again</div>";

        $("#" + id).append(savedIconContainer);
        $("#" + id).append(savedInfoContainer);
        $("#" + infoContainerId).append(savedInfo);
        $("#" + infoContainerId).append(savedBtnContainer);

        $('#' +iconImgId).attr('src', savedProductList[savedProductList.length - i -1].imgPath);
        // if (savedProductList[savedProductList.length - i -1].name === "Pure Color Envy"){
        //     $('#' +iconImgId).css('width','82%');
        // }
        // if (savedProductList[savedProductList.length - i -1].name === "Wildly Whipped Soft Matte"){
        //     $('#' +iconImgId).css('width', '111%');
        // }
        $("#" + infoContainerId).css({
            'display': 'inline-block',
            'float': 'right',
            'clear': 'both',
            'line-height': '100%',
            'width': '60%',
            'height': '100%'
        });
        $("#" + infoId).css({
            'display': 'inline-block',
            'float': 'right',
            'clear': 'both',
            'height' : '60%',
            'width': '100%'
        });
        $('#'+infoId).find('p:first').css({
            'font-size': '1.4rem',
            'font-weight': 'bold',
            'line-height': '150%',
            'overflow': 'hidden',
            'text-overflow':'ellipsis',
            'white-space': 'nowrap'
        });
        $('#'+infoId).find('p:eq(1)').css({
            /*****/
            'font-size': '1.4rem',
            'font-weight': 'normal',
            // 'overflow': 'hidden',
            'line-height': '1.4rem'
        });
        var curId = savedProductList[savedProductList.length - i -1].id;

        $('#' + infoId).find('p:eq(0)').html(savedProductList[savedProductList.length - i -1].name);
        $('#' + infoId).find('p:eq(1)').html(savedProductList[savedProductList.length -i -1].color+ '<br>'+savedProductList[savedProductList.length -i -1].description);
        $('#'+btnContainer).css({
            'position':'absolute',
            'bottom':'2%',
            'display': 'inline-block',
            'float':'left',
            'clear': 'both',
            'width': '58%',
            'height': '35%',
            'background-image': 'url(' + 'img/try_again.png)',
            'background-size': 'cover',
            'background-position': 'center'
        });
        $('#'+btnContainer).hover(
            function(){
                $(this).css('cursor', 'pointer');
            },
            function(){
                $(this).css('cursor', 'auto');
            }
        );
    //     $('#' + btnContainer).click(
    //         (function (i) {
    //         clickLipstick1();
    //         console.log(savedProductList[i].id);
    //         $('#div_lsborder_' + savedProductList[i].id).show();
    //     })(i)
    // );
    //     for(var i=0; i<3; i++){
    //         (function() {
    //             var gid = i;
    //             $('#tmpid'+i).click(function(){
    //                 alert(gid);
    //             });
    //         })();
    //     }
        var ProductNameList = ["Joli Rouge", "Pure Color Envy","Wildly Whipped Soft Matte","Gel Lipstick","Lip Polish"];
        (function(){
            var curProName = savedProductList[savedProductList.length-1-i].name;
            var curIntro = savedProductList[savedProductList.length-1-i].intro;
            var curID = savedProductList[savedProductList.length-1-i].id;
            var colorNumber = savedProductList[savedProductList.length-1-i].color;
            var colorDes = savedProductList[savedProductList.length-1-i].description;
            var colorImg = savedProductList[savedProductList.length-1-i].imgPath;
            var curSaved = true;
            $('#' + btnContainer).click(function () {
                for (var k = 0; k < ProductNameList.length; k++){
                    if (curProName === ProductNameList[k] && k == 0){
                        clickLipstick1();
                        break;
                    }
                    if (curProName === ProductNameList[k] && k == 1){
                        clickLipstick2();
                        break;
                    }
                    if (curProName === ProductNameList[k] && k == 2){
                        clickLipstick3();
                        break;
                    }
                    if (curProName === ProductNameList[k] && k == 3){
                        clickLipstick4();
                        break;
                    }
                    if (curProName === ProductNameList[k] && k == 4){
                        clickLipstick5();
                        break;
                    }
                }
                $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');

                $('#div_lsborder_' + curID).show();
                $('#'+'ls1Info').find('p:eq(1)').html(colorNumber + '<br>' + colorDes);
                curLipstick.name = curProName;
                curLipstick.intro = curIntro;
                curLipstick.id = curID;
                curLipstick.color = colorNumber;
                curLipstick.description = colorDes;
                curLipstick.imgPath = colorImg;
                curLipstick.saved = curSaved;
            });
        })();
    }
    var viewMore = "<div id='viewMore' onclick='showTopSix()'>view more</div>";
    $('#savedContainerTop3').append(viewMore);
        /*********** add functions here *************/
        // $('#'+btnContainer).on('click', function (btnContainer) {
        //
        // });

    // }
    // divsTopThree ++;
};
/***** top 6 saved look *******/

//saved looks count
var addDivTopSix = function(){
    $('#savedContainerTop6').empty();
    var savedProNumber = Math.min(6, savedProductList.length);
    for (var i = 0; i < savedProNumber; i++){
        var id = "div_top6_" + i;
        var iconContainerId = "savedIconContainer_6_" + i;
        var iconImgId = "savedIconImg_6_" + i;
        var infoContainerId = "savedInfoContainer_6_" + i;
        var infoId = "savedInfo_6_" + i;
        var btnContainer = "savedBtn_6_" + i ;
        var oDiv = document.createElement("DIV");
        oDiv.id = id;
        // oDiv.innerHTML = divsTopThree;
        $('#savedContainerTop6').append(oDiv);
        $("#" + oDiv.id).css({
            'position':'relative',
            'width': '20%',
            'height': '40%',
            'color': 'black',
            'display': 'inline-block',
            'margin': '3%  9% 3% 4%'
        });

        var savedIconContainer = "<div id=" + iconContainerId + " style='width: 35%; height: 100%; display:inline-block'><img id=" + iconImgId + " style='width: 100%; height: 100%'></div>";
        var savedInfoContainer = "<div id=" + infoContainerId + "></div>";
        var savedInfo = "<div id=" + infoId + "><p></p><p></p></div>";
        var savedBtnContainer = "<div id=" + btnContainer + " ></div>";

        // var savedBtnContainer = "<div id=" + btnContainer + " >Try Again</div>";

        $("#" + id).append(savedIconContainer);
        $("#" + id).append(savedInfoContainer);
        $("#" + infoContainerId).append(savedInfo);
        $("#" + infoContainerId).append(savedBtnContainer);

        $('#' +iconImgId).attr('src', savedProductList[savedProductList.length - i -1].imgPath);
        // if (savedProductList[savedProductList.length - i -1].name === "Pure Color Envy"){
        //     $('#' +iconImgId).css('width','82%');
        // }
        // if (savedProductList[savedProductList.length - i -1].name === "Wildly Whipped Soft Matte"){
        //     $('#' +iconImgId).css('width','111%');
        // }
        //
        $("#" + infoContainerId).css({
            'display': 'inline-block',
            'float': 'right',
            'clear': 'both',
            'line-height': '100%',
            'width': '60%',
            'height': '100%'
        });
        $("#" + infoId).css({
            'display': 'inline-block',
            'float': 'right',
            'clear': 'both',
            'height' : '60%',
            'width': '100%'
        });
        $('#'+infoId).find('p:first').css({
            'font-size': '1.4rem',
            'font-weight': 'bold',
            'line-height': '150%',
            'overflow': 'hidden',
            'text-overflow':'ellipsis',
            'white-space': 'nowrap'
        });
        $('#'+infoId).find('p:eq(1)').css({
            /*****/
            'font-size': '1.4rem',
            'font-weight': 'normal',
            'line-height': '1.4rem'
        });

        $('#' + infoId).find('p:eq(0)').html(savedProductList[savedProductList.length - i -1].name);
        $('#' + infoId).find('p:eq(1)').html(savedProductList[savedProductList.length -i -1].color+ '<br>'+savedProductList[savedProductList.length -i -1].description);
        $('#'+btnContainer).css({
            'position':'absolute',
            'bottom':'2%',
            'display': 'inline-block',
            'float':'left',
            'clear': 'both',
            'width': '58%',
            'height': '35%',
            'background-image': 'url(' + 'img/try_again.png)',
            'background-size': 'cover',
            'background-position': 'center'
        });
        $('#'+btnContainer).hover(
            function(){
                $(this).css('cursor', 'pointer');
            },
            function(){
                $(this).css('cursor', 'auto');
            }
        );
        var ProductNameList = ["Joli Rouge", "Pure Color Envy","Wildly Whipped Soft Matte","Gel Lipstick","Lip Polish"];
        (function(){
            var curProName = savedProductList[savedProductList.length-1-i].name;
            var curIntro = savedProductList[savedProductList.length-1-i].intro;
            var curID = savedProductList[savedProductList.length-1-i].id;
            var colorNumber = savedProductList[savedProductList.length-1-i].color;
            var colorDes = savedProductList[savedProductList.length-1-i].description;
            var colorImg = savedProductList[savedProductList.length-1-i].imgPath;
            var curSaved = true;

            $('#' + btnContainer).click(function () {
                for (var k = 0; k < ProductNameList.length; k++){
                    if (curProName === ProductNameList[k] && k == 0){
                        clickLipstick1();
                        break;
                    }
                    if (curProName === ProductNameList[k] && k == 1){
                        clickLipstick2();
                        break;
                    }
                    if (curProName === ProductNameList[k] && k == 2){
                        clickLipstick3();
                        break;
                    }
                    if (curProName === ProductNameList[k] && k == 3){
                        clickLipstick4();
                        break;
                    }
                    if (curProName === ProductNameList[k] && k == 4){
                        clickLipstick5();
                        break;
                    }
                }
                
                $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');
                $('#div_lsborder_' + curID).show();
                $('#'+'ls1Info').find('p:eq(1)').html(colorNumber + '<br>' + colorDes);
                curLipstick.name = curProName;
                curLipstick.intro = curIntro;
                curLipstick.id = curID;
                curLipstick.color = colorNumber;
                curLipstick.description = colorDes;
                curLipstick.imgPath = colorImg;
                curLipstick.saved = curSaved;
            });
        })();
    }
    var viewLess = "<div id='viewLess' onclick='showTopThree()'>view less</div>";
    $('#savedContainerTop6').append(viewLess);
            /*********** add functions here *************/
            // $('#'+btnContainer).on('click', function (btnContainer) {
            //
            // });
};


var savedProductList = [];

var tryProductBookmark = function () {
    if (typeof curLipstick.color !== 'undefined'){
        $('#savedLookProduct').show();
        $('#savedProductMsg').hide();
        if (curLipstick.color != null){
            if (curLipstick.saved){
                for (var i = 0; i < savedProductList.length; i++) {
                    if (savedProductList[i].color === curLipstick.color && savedProductList[i].description === curLipstick.description) {
                        savedProductList.splice(i, 1);
                        $('#bookmark').find('img').attr('src','img/Bookmark.png');
                        curLipstick.saved = false;
                        if (savedProductList.length === 0){
                            $('#savedLookProduct').hide();
                            $('#savedProductMsg').show();
                        }
                        // break;
                    }
                }
            }
            else{
                if (savedProductList.length <= 6){
                    savedProductList.push(curLipstick);
                    $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');
                    curLipstick.saved = true;
                }
                else{
                    savedProductList.shift();
                    savedProductList.push(curLipstick);
                    $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');
                    curLipstick.saved = true;
                }
            }
        }

        addDivTopSix();
        addDivTopThree();
    }
};
/******************* create color padding for product **************************/
/******* btn_lipstick1 **********/
var clickLipstick1 = function () {
    curLipstick = {};
    $('#bookmark').find('img').attr('src','img/Bookmark.png');
    var colorsCount = 10;
    $('#ls5_border').hide();
    $('#ls2_border').hide();
    $('#ls3_border').hide();
    $('#ls4_border').hide();
    $('#ls1_border').show();
    
        $('#productInfo').empty();
        $('#colorsContainer').empty();

    var ls1IconContainer = "<div id='ls1IconContainer' style='width: 40%; height: 100%;display:inline-block'><img id='ls1Icon' src=img/btn_ls1.png style='max-width: 100%; width: 100%'></div>";
        var ls1InfoContainer = "<div id='ls1InfoContainer'></div>";
        var ls1Info = "<div id='ls1Info'><p>Joli Rouge</p><p></p></div>";
        $('#productInfo').append(ls1IconContainer);
        $('#productInfo').append(ls1InfoContainer);

        $('#ls1InfoContainer').append(ls1Info);

        $('#ls1InfoContainer').css({
            'display': 'inline-block',
            'float': 'right',
            'clear': 'both',
            'line-height': '100%',
            'width': '60%',
            'height': '100%'
        });
        $('#ls1Info').css({
            'display': 'inline-block',
            'float': 'right',
            'clear': 'both',
            'height' : '60%',
            'width': '100%'
        });
        $('#ls1Info').find('p:eq(0)').css({
            'margin-top': '8%',
            'line-height':'1.3rem',
            'font-size': '1.3rem',
            'height': '65%',
            'font-weight': 'bold',
        });
        $('#ls1Info').find('p:eq(1)').css({
            'line-height': '150%',
            'font-size': '1rem',
            'height': '50%',
            'font-weight': 'normal',
        });

    $('#makePurchase').show();
    for (var i = 0; i < colorsCount; i++){
        var id = "div_Lipstick_color_" + i;
        // var lipColorDiv = "<div id="+ id +"></div>";
        var bg_id = "div_colorBg_" + i;
        var ls_color_id = "div_color_" + i;
        var ls_border_id = "div_lsborder_" + i;
        var bgDiv = "<div id="+ bg_id +"><div id="+ls_color_id+"><img></div><div id="+ls_border_id+"><img></div></div>";
        $('#colorsContainer').append(bgDiv);
        // $('#colorsContainer').append(lipColorDiv);
        $('#'+bg_id).css({
            'display': 'inline-block',
            'position':'relative',
            'width': '19%',
            'height': '22%',
            'margin': '3% 6% 3% 0',
        });
        $('#'+ls_color_id).css({
            'width': '100%',
            'height': '100%'
        });
        $('#'+ls_color_id).find('img').attr({
            'src':'img/Lip_Product/Clarins_Joli_Rouge/' + (i+1) + '.png',
        });
        $('#'+ls_color_id).find('img').css({
            'width': '100%',
            'max-width': '100%'
        });
        $('#'+ls_border_id).css({
            'display': 'none',
            'position':'absolute',
            'width': '110%',
            'height': '130%',
            'top' : '-15%',
            'left': '-5%',
            'z-index': '-1',
            'opacity': '0.8'
        });
        $('#'+ls_border_id).find('img').attr('src', 'img/border/ls_border.png');
        $('#'+ls_border_id).find('img').css({
            'width': '100%',
            'height': '100%'
        });
        $('#'+bg_id).on('click', function(){
            curLipstick = {};
            var colors_number = ["701","741","742","732","749","713","746","705","737","738"];
            var colors_des = ["Orange Fizz",  "Red Orange", "Joli Rouge", "Grenadine", "Bubble Gum Pink",  "Hot Pink","Tender Nude", "Soft Berry",  "Spicy Cinnamon", "Royal Plum"];
            for (var j = 0; j < colorsCount; j++){
                $('#div_lsborder_'+j).hide();
            }
            // $(this).css('border', '1px solid black');
            var cur = parseInt(this.id.substr(12));

            $('#div_lsborder_' +cur).show();
            $('#'+'ls1Info').find('p:eq(1)').html(colors_number[cur] + '<br>' +colors_des[cur]);
            curLipstick.name = "Joli Rouge";
            curLipstick.intro = "";
            curLipstick.id = cur;
            curLipstick.color = colors_number[cur];
            curLipstick.description = colors_des[cur];
            curLipstick.imgPath = 'img/Lip_Product/Clarins_Joli_Rouge/btn_ls1.png';
            curLipstick.saved = false;
            $('#bookmark').find('img').attr('src','img/Bookmark.png');

            for (var k = 0; k < savedProductList.length; k++) {
                if (savedProductList[k].color === curLipstick.color && savedProductList[k].description === curLipstick.description) {
                    curLipstick.saved = true;
                    $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');
                    break;
                }
            }

            // $(this).css({
            //     'background-image': 'url(' + 'img/border/ls_border.png)'
            //
            // });
            // call remove add on & add on functions here.
            /******* remove add on ************/

            /******* add on *******************/

        });
        

        //     // call remove add on & add on functions here.
        //     /******* remove add on ************/
        //
        //     /******* add on *******************/
        //
        // });
    }
};



/********** btn_lipstick2 *************/
var clickLipstick2 = function () {
    curLipstick = {};

    $('#bookmark').find('img').attr('src','img/Bookmark.png');
    var colorsCount = 8;

    $('#ls1_border').hide();
    $('#ls5_border').hide();
    $('#ls3_border').hide();
    $('#ls4_border').hide();
    $('#ls2_border').show();
    
    $('#productInfo').empty();
    $('#colorsContainer').empty();

    var ls1IconContainer = "<div id='ls1IconContainer' style='width: 40%; height: 100%; display:inline-block'><img id='ls1Icon' src=img/btn_ls2.png style=' max-width: 100%; width: 100%'></div>";
    var ls1InfoContainer = "<div id='ls1InfoContainer'></div>";
    var ls1Info = "<div id='ls1Info'><p>Pure Color Envy</p><p>Pure Color Lipstick<br>Lipstick Effect</p></div>";
    $('#productInfo').append(ls1IconContainer);
    $('#productInfo').append(ls1InfoContainer);

    $('#ls1InfoContainer').append(ls1Info);

    $('#ls1InfoContainer').css({
        'display': 'inline-block',
        'float': 'right',
        'clear': 'both',
        'line-height': '100%',
        'width': '60%',
        'height': '100%'
    });
    $('#ls1Info').css({
        'display': 'inline-block',
        'float': 'right',
        'clear': 'both',
        'height' : '60%',
        'width': '100%'
    });
    $('#ls1Info').find('p:eq(0)').css({
        'margin-top': '8%',
        'line-height':'1.3rem',
        'font-size': '1.3rem',
        'height': '65%',
        'font-weight': 'bold',
    });
    $('#ls1Info').find('p:eq(1)').css({
        'line-height': '150%',
        'font-size': '1rem',
        'height': '50%',
        'font-weight': 'normal',
    });

    $('#makePurchase').show();
    for (var i = 0; i < colorsCount; i++){
        var id = "div_Lipstick_color_" + i;
        // var lipColorDiv = "<div id="+ id +"></div>";
        var bg_id = "div_colorBg_" + i;
        var ls_color_id = "div_color_" + i;
        var ls_border_id = "div_lsborder_" + i;
        var bgDiv = "<div id="+ bg_id +"><div id="+ls_color_id+"><img></div><div id="+ls_border_id+"><img></div></div>";
        $('#colorsContainer').append(bgDiv);
        // $('#colorsContainer').append(lipColorDiv);
        $('#'+bg_id).css({
            'display': 'inline-block',
            'position':'relative',
            'width': '19%',
            'height': '22%',
            'margin': '3% 6% 3% 0',
        });
        $('#'+ls_color_id).css({
            'width': '100%',
            'height': '100%'
        });
        $('#'+ls_color_id).find('img').attr({
            'src':'img/Lip_Product/Estee/' + (i+1) + '.png',
        });
        $('#'+ls_color_id).find('img').css({
            'width': '100%',
            'max-width': '100%'
        });
        $('#'+ls_border_id).css({
            'display': 'none',
            'position':'absolute',
            'width': '110%',
            'height': '130%',
            'top' : '-15%',
            'left': '-5%',
            'z-index': '-1',
            'opacity': '0.8'
        });
        $('#'+ls_border_id).find('img').attr('src', 'img/border/ls_border.png');
        $('#'+ls_border_id).find('img').css({
            'width': '100%',
            'height': '100%'
        })

        $('#'+bg_id).on('click', function(){
            curLipstick = {};
            var colors_number = ["410", "420","120", "450", "230","320", "130", "130"];
            var colors_des = ["Dynamic",  "Rebellious Rose", "Naked Ambition", "Insolent Plum", "Infamous",  "Volatile", "Slow Burn", "Desirous"];
            for (var j = 0; j < colorsCount; j++){
                $('#div_lsborder_'+j).hide();
            }
            // $(this).css('border', '1px solid black');
            var cur = parseInt(this.id.substr(12));
            $('#div_lsborder_' +cur).show();
            $('#ls1Info').find('p:eq(0)').css('height', '55%');
            $('#ls1Info').find('p:eq(1)').css('font-size', '1.3rem');
            $('#ls1Info').find('p:eq(1)').html(colors_number[cur] + '<br>' +colors_des[cur]);
            curLipstick.name = "Pure Color Envy";
            curLipstick.intro = "Lipstick Effect";
            curLipstick.id = cur;
            curLipstick.color = colors_number[cur];
            curLipstick.description = colors_des[cur];
            curLipstick.imgPath = 'img/Lip_Product/Estee/btn_ls2.png';

            curLipstick.saved = false;
            $('#bookmark').find('img').attr('src','img/Bookmark.png');

            for (var k = 0; k < savedProductList.length; k++) {
                if (savedProductList[k].color === curLipstick.color && savedProductList[k].description === curLipstick.description) {
                    curLipstick.saved = true;
                    $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');
                    break;
                }
            }
            /******* remove add on ************/

            /******* add on *******************/

        });
    }
};

/************** btn_lipstick3 *************/
var clickLipstick3 = function () {
    curLipstick = {};

    $('#bookmark').find('img').attr('src','img/Bookmark.png');
    var colorsCount = 6;

    $('#ls1_border').hide();
    $('#ls2_border').hide();
    $('#ls5_border').hide();
    $('#ls4_border').hide();
    $('#ls3_border').show();

    $('#productInfo').empty();
    $('#colorsContainer').empty();

    var ls1IconContainer = "<div id='ls1IconContainer' style='width: 40%; height: 100%; display:inline-block'><img id='ls1Icon' src=img/btn_ls3.png style='max-width: 100%; width: 100%'></div>";
    var ls1InfoContainer = "<div id='ls1InfoContainer'></div>";
    var ls1Info = "<div id='ls1Info'><p>Wildly Whipped Soft Matte</p><p>Soft Liquid Lipstick<br>Super moisture Effect</p></div>";
    $('#productInfo').append(ls1IconContainer);
    $('#productInfo').append(ls1InfoContainer);

    $('#ls1InfoContainer').append(ls1Info);

    $('#ls1InfoContainer').css({
        'display': 'inline-block',
        'float': 'right',
        'clear': 'both',
        'line-height': '100%',
        'width': '60%',
        'height': '100%'
    });
    $('#ls1Info').css({
        'display': 'inline-block',
        'float': 'right',
        'clear': 'both',
        'height' : '60%',
        'width': '100%'
    });
    $('#ls1Info').find('p:eq(0)').css({
        'margin-top': '8%',
        'line-height':'1.3rem',
        'font-size': '1.3rem',
        'height': '65%',
        'font-weight': 'bold',
    });
    $('#ls1Info').find('p:eq(1)').css({
        'line-height': '150%',
        'font-size': '1rem',
        'height': '50%',
        'font-weight': 'normal',
    });

    $('#makePurchase').show();
    for (var i = 0; i < colorsCount; i++){
        var id = "div_Lipstick_color_" + i;
        // var lipColorDiv = "<div id="+ id +"></div>";
        var bg_id = "div_colorBg_" + i;
        var ls_color_id = "div_color_" + i;
        var ls_border_id = "div_lsborder_" + i;
        var bgDiv = "<div id="+ bg_id +"><div id="+ls_color_id+"><img></div><div id="+ls_border_id+"><img></div></div>";
        $('#colorsContainer').append(bgDiv);
        // $('#colorsContainer').append(lipColorDiv);
        $('#'+bg_id).css({
            'display': 'inline-block',
            'position':'relative',
            'width': '19%',
            'height': '22%',
            'margin': '3% 6% 3% 0',
        });
        $('#'+ls_color_id).css({
            'width': '100%',
            'height': '100%'
        });
        $('#'+ls_color_id).find('img').attr({
            'src':'img/Lip_Product/Buxom_Soft_Matte/' + (i+1) + '.png',
        });
        $('#'+ls_color_id).find('img').css({
            'width': '100%',
            'max-width': '100%'
        });
        $('#'+ls_border_id).css({
            'display': 'none',
            'position':'absolute',
            'width': '110%',
            'height': '130%',
            'top' : '-15%',
            'left': '-5%',
            'z-index': '-1',
            'opacity': '0.8'
        });
        $('#'+ls_border_id).find('img').attr('src', 'img/border/ls_border.png');
        $('#'+ls_border_id).find('img').css({
            'width': '100%',
            'height': '100%'
        })

        $('#'+bg_id).on('click', function(){
            curLipstick = {};
            var colors_number = ["80229", "79635", "79638", "79639", "79640", "79637"];
            var colors_des = ["Nudist", "Wandress", "Instigator", "Criminal", "Flaunter", "Dominatrix"];
            for (var j = 0; j < colorsCount; j++){
                $('#div_lsborder_'+j).hide();
            }
            // $(this).css('border', '1px solid black');
            var cur = parseInt(this.id.substr(12));
            $('#div_lsborder_' +cur).show();
            $('#' + 'ls1Info').find('p:eq(1)').css('font-size', '1.3rem');
            $('#'+'ls1Info').find('p:eq(1)').html(colors_number[cur] + '<br>' +colors_des[cur]);
            curLipstick.name = "Wildly Whipped Soft Matte";
            curLipstick.intro = "Soft Liquid Lipstick"
            curLipstick.id = cur;
            curLipstick.color = colors_number[cur];
            curLipstick.description = colors_des[cur];
            curLipstick.imgPath = 'img/Lip_Product/Buxom_Soft_Matte/btn_ls3.png';
            curLipstick.saved = false;
            $('#bookmark').find('img').attr('src','img/Bookmark.png');

            for (var k = 0; k < savedProductList.length; k++) {
                if (savedProductList[k].color === curLipstick.color && savedProductList[k].description === curLipstick.description) {
                    curLipstick.saved = true;
                    $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');
                    break;
                }
            }
            /******* remove add on ************/

            /******* add on *******************/

        });
    }
};

/************ btn_lipstick4 **********/
var clickLipstick4 = function () {
    curLipstick = {};

    $('#bookmark').find('img').attr('src','img/Bookmark.png');
    var colorsCount = 6;
    $('#ls1_border').hide();
    $('#ls2_border').hide();
    $('#ls3_border').hide();
    $('#ls5_border').hide();
    $('#ls4_border').show();

    $('#productInfo').empty();
    $('#colorsContainer').empty();

    var ls1IconContainer = "<div id='ls1IconContainer' style='width: 40%; height: 100%; display:inline-block'><img id='ls1Icon' src=img/btn_ls4.png style='max-width: 100%; width: 100%'></div>";
    var ls1InfoContainer = "<div id='ls1InfoContainer'></div>";
    var ls1Info = "<div id='ls1Info'><p>Gel Lipstick</p><p>Pure Color Lipstick<br>Lipstick Effect</p></div>";
    $('#productInfo').append(ls1IconContainer);
    $('#productInfo').append(ls1InfoContainer);

    $('#ls1InfoContainer').append(ls1Info);

    $('#ls1InfoContainer').css({
        'display': 'inline-block',
        'float': 'right',
        'clear': 'both',
        'line-height': '100%',
        'width': '60%',
        'height': '100%'
    });
    $('#ls1Info').css({
        'display': 'inline-block',
        'float': 'right',
        'clear': 'both',
        'height' : '60%',
        'width': '100%'
    });
    $('#ls1Info').find('p:eq(0)').css({
        'margin-top': '8%',
        'line-height':'1.3rem',
        'font-size': '1.3rem',
        'height': '65%',
        'font-weight': 'bold',
    });
    $('#ls1Info').find('p:eq(1)').css({
        'line-height': '150%',
        'font-size': '1rem',
        'height': '50%',
        'font-weight': 'normal',
    });

    $('#makePurchase').show();
    for (var i = 0; i < colorsCount; i++){
        var id = "div_Lipstick_color_" + i;
        // var lipColorDiv = "<div id="+ id +"></div>";
        var bg_id = "div_colorBg_" + i;
        var ls_color_id = "div_color_" + i;
        var ls_border_id = "div_lsborder_" + i;
        var bgDiv = "<div id="+ bg_id +"><div id="+ls_color_id+"><img></div><div id="+ls_border_id+"><img></div></div>";
        $('#colorsContainer').append(bgDiv);
        // $('#colorsContainer').append(lipColorDiv);
        $('#'+bg_id).css({
            'display': 'inline-block',
            'position':'relative',
            'width': '19%',
            'height': '22%',
            'margin': '3% 6% 3% 0',
        });
        $('#'+ls_color_id).css({
            'width': '100%',
            'height': '100%'
        });
        $('#'+ls_color_id).find('img').attr({
            'src':'img/Lip_Product/Gel_Lipstick/' + (i+1) + '.png',
        });
        $('#'+ls_color_id).find('img').css({
            'width': '100%',
            'max-width': '100%'
        });
        $('#'+ls_border_id).css({
            'display': 'none',
            'position':'absolute',
            'width': '110%',
            'height': '130%',
            'top' : '-15%',
            'left': '-5%',
            'z-index': '-1',
            'opacity': '0.8'
        });
        $('#'+ls_border_id).find('img').attr('src', 'img/border/ls_border.png');
        $('#'+ls_border_id).find('img').css({
            'width': '100%',
            'height': '100%'
        })

        $('#'+bg_id).on('click', function(){
            curLipstick = {};
            var colors_number = ["77300", "77285", "77294", "77311", "77301", "77291"];
            var colors_des = ["Extreme Heat", "Red Inferno", "Evocative Petal", "Graphic Grape", "Guilty Angel", "Defiant Bloom"];
            for (var j = 0; j < colorsCount; j++){
                $('#div_lsborder_'+j).hide();
            }
            // $(this).css('border', '1px solid black');
            var cur = parseInt(this.id.substr(12));
            $('#div_lsborder_' +cur).show();
            $('#' + 'ls1Info').find('p:eq(1)').css('font-size', '1.3rem');
            $('#'+'ls1Info').find('p:eq(1)').html(colors_number[cur] + '<br>' +colors_des[cur]);
            curLipstick.name = "Gel Lipstick";
            curLipstick.intro = "Lipstick Effect"
            curLipstick.id = cur;
            curLipstick.color = colors_number[cur];
            curLipstick.description = colors_des[cur];
            curLipstick.imgPath = 'img/Lip_Product/Gel_Lipstick/btn_ls4.png';
            curLipstick.saved = false;
            $('#bookmark').find('img').attr('src','img/Bookmark.png');

            for (var k = 0; k < savedProductList.length; k++) {
                if (savedProductList[k].color === curLipstick.color && savedProductList[k].description === curLipstick.description) {
                    curLipstick.saved = true;
                    $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');
                    break;
                }
            }

            /******* remove add on ************/

            /******* add on *******************/

        });
    }
};

/************ btn_lipstick5 ************/
var clickLipstick5 = function () {
    curLipstick = {};

    var colorsCount = 6;
    $('#bookmark').find('img').attr('src','img/Bookmark.png');
    $('#ls1_border').hide();
    $('#ls2_border').hide();
    $('#ls3_border').hide();
    $('#ls4_border').hide();
    $('#ls5_border').show();

    $('#productInfo').empty();
    $('#colorsContainer').empty();

    var ls1IconContainer = "<div id='ls1IconContainer' style='width: 40%; height: 100%; display:inline-block'><img id='ls1Icon' src=img/btn_ls5.png style='max-width: 100%; width: 100%'></div>";
    var ls1InfoContainer = "<div id='ls1InfoContainer'></div>";
    var ls1Info = "<div id='ls1Info'><p>Lip Polish</p><p>Lip Gloss<br>High Shine Effect</p></div>";
    $('#productInfo').append(ls1IconContainer);
    $('#productInfo').append(ls1InfoContainer);

    $('#ls1InfoContainer').append(ls1Info);

    $('#ls1InfoContainer').css({
        'display': 'inline-block',
        'float': 'right',
        'clear': 'both',
        'line-height': '100%',
        'width': '60%',
        'height': '100%'
    });
    $('#ls1Info').css({
        'display': 'inline-block',
        'float': 'right',
        'clear': 'both',
        'height' : '60%',
        'width': '100%'
    });
    $('#ls1Info').find('p:eq(0)').css({
        'margin-top': '8%',
        'line-height':'1.3rem',
        'font-size': '1.3rem',
        'height': '65%',
        'font-weight': 'bold',
    });
    $('#ls1Info').find('p:eq(1)').css({
        'line-height': '150%',
        'font-size': '1rem',
        'height': '50%',
        'font-weight': 'normal',
    });

    $('#makePurchase').show();
    for (var i = 0; i < colorsCount; i++){
        var id = "div_Lipstick_color_" + i;
        // var lipColorDiv = "<div id="+ id +"></div>";
        var bg_id = "div_colorBg_" + i;
        var ls_color_id = "div_color_" + i;
        var ls_border_id = "div_lsborder_" + i;
        var bgDiv = "<div id="+ bg_id +"><div id="+ls_color_id+"><img></div><div id="+ls_border_id+"><img></div></div>";
        $('#colorsContainer').append(bgDiv);
        // $('#colorsContainer').append(lipColorDiv);
        $('#'+bg_id).css({
            'display': 'inline-block',
            'position':'relative',
            'width': '19%',
            'height': '22%',
            'margin': '3% 6% 3% 0',
        });
        $('#'+ls_color_id).css({
            'width': '100%',
            'height': '100%'
        });
        $('#'+ls_color_id).find('img').attr({
            'src':'img/Lip_Product/Buxom_Lip_Polish/' + (i+1) + '.png',
        });
        $('#'+ls_color_id).find('img').css({
            'width': '100%',
            'max-width': '100%'
        });
        $('#'+ls_border_id).css({
            'display': 'none',
            'position':'absolute',
            'width': '110%',
            'height': '130%',
            'top' : '-15%',
            'left': '-5%',
            'z-index': '-1',
            'opacity': '0.8'
        });
        $('#'+ls_border_id).find('img').attr('src', 'img/border/ls_border.png');
        $('#'+ls_border_id).find('img').css({
            'width': '100%',
            'height': '100%'
        })

        $('#'+bg_id).on('click', function(){
            var colors_number = [" ", " ", " "," "," "," "];
            var colors_des = ["Rebecca", "Kimberly", "Tonya", "Natalie", "Sabrina", "Jasmine"];
            curLipstick = {};
            for (var j = 0; j < colorsCount; j++){
                $('#div_lsborder_'+j).hide();
            }
            // $(this).css('border', '1px solid black');
            var cur = parseInt(this.id.substr(12));
            $('#div_lsborder_' +cur).show();
            $('#' + 'ls1Info').find('p:eq(1)').css('font-size', '1.3rem');
            $('#'+'ls1Info').find('p:eq(1)').html(colors_number[cur] + '<br>' +colors_des[cur]);
            curLipstick.name = "Lip Polish";
            curLipstick.intro = "High Shine Effect";
            curLipstick.id = cur;
            curLipstick.color = colors_number[cur];
            curLipstick.description = colors_des[cur];
            curLipstick.imgPath = 'img/Lip_Product/Buxom_Lip_Polish/btn_ls5.png';
            curLipstick.saved = false;
            $('#bookmark').find('img').attr('src','img/Bookmark.png');

            for (var k = 0; k < savedProductList.length; k++) {
                if (savedProductList[k].color === curLipstick.color && savedProductList[k].description === curLipstick.description) {
                    curLipstick.saved = true;
                    $('#bookmark').find('img').attr('src','img/Bookmark_colored.png');
                    break;
                }
            }
            /******* remove add on ************/

            /******* add on *******************/

        });
    }
};

/*************** step by step tutorial ***************/
/****** step 1 ***********/

var step_1 = function () {
    for (var i = 1; i <= 8; i++){
        $("#step" + i+ '_bg').hide();
    }
    $("#step1_bg").show();
};

/****** step 2 ***********/

var step_2 = function () {
    for (var i = 1; i <= 8; i++){
        $("#step" + i+ '_bg').hide();
    }
    $("#step2_bg").show();
};

/****** step 3 ***********/

var step_3 = function () {
    for (var i = 1; i <= 8; i++){
        $("#step" + i+ '_bg').hide();
    }
    $("#step3_bg").show();
};

/****** step 4 ***********/

var step_4 = function () {
    for (var i = 1; i <= 8; i++){
        $("#step" + i+ '_bg').hide();
    }
    $("#step4_bg").show();
};


/****** step 5 ***********/

var step_5 = function () {
    for (var i = 1; i <= 8; i++){
        $("#step" + i+ '_bg').hide();
    }
    $("#step5_bg").show();
};


/****** step 6 ***********/

var step_6 = function () {
    for (var i = 1; i <= 8; i++){
        $("#step" + i+ '_bg').hide();
    }
    $("#step6_bg").show();
};


/****** step 7 ***********/

var step_7 = function () {
    for (var i = 1; i <= 8; i++){
        $("#step" + i+ '_bg').hide();
    }
    $("#step7_bg").show();
};


/****** step 8 ***********/

var step_8 = function () {
    for (var i = 1; i <= 8; i++){
        $("#step" + i+ '_bg').hide();
    }
    $("#step8_bg").show();
};


/*********** tutorial show/close **********/

var tutorial_show = function () {
    $('#tutorial_bg').show();
};
var tutorial_close = function () {
    $('#tutorial_bg').hide();
};

/******** set div ratio************/
function setRatio(obj, ratio){
    var that = obj;
    var h = that.outerWidth()*(1/ratio);
    var borderWid = parseInt(that.css("border-top-width"))+parseInt(that.css("border-bottom-width")); // 考虑边框的宽度
    that.css("height",h+borderWid);
}


$(function(){
    var obj = $('#container');
    var ratio = 3/2;
    setRatio(obj,ratio);

    $(window).resize(function(){
        setRatio(obj,ratio);
    });

});

$(function(){
    var obj = $('#productCheckBox');
    var ratio = 5.7;
    setRatio(obj,ratio);

    $(window).resize(function(){
        setRatio(obj,ratio);
    });

});

$(document).ready(function(){
    var bodyWidth = $(document.body).width();
    $('html').css('font-size', bodyWidth*0.008 + 'px');
    var screenWidth = 0.98*screen.width;
    $(document.body).css('min-width', screenWidth*0.57 + 'px');
    // var window_h= $(window).height();
    // var bdw_h = $('#body_wrapper').height();
    // var ft_h = $('#foot_wrapper').height();
    // var margin_top = Math.max(0, window_h - bdw_h - ft_h - 7.5*bodyWidth*0.008);
    // $('#foot_wrapper').css('margin', margin_top + 'px auto 0 auto');
    $('html').trigger('resize');
});

$(window).resize(function() {
    var bodyWidth = $(document.body).width();
    $('html').css('font-size', bodyWidth*0.008 + 'px');
    // var window_h= $(window).height();
    // var bdw_h = $('#body_wrapper').height();
    // var ft_h = $('#foot_wrapper').height();
    // var margin_top = Math.max(0, window_h - bdw_h - ft_h - 7.5*bodyWidth*0.008);
    // $('#foot_wrapper').css('margin', margin_top + 'px auto 0 auto');
});
// alert(bodyWidth);
// $('html').css('font-size', bodyWidth*0.0059 + 'px');
// var obj = $('#div#camera_popout_container');
// var ratio = 2;
// setRatio(obj,ratio);
//
// $(window).resize(function(){
//     setRatio(obj,ratio);
// });