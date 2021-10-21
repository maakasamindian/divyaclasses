// Operation = 0; Show
// Operation = 1; Hide
const showHideClassDesc = (index, operation) => {
    classTag = document.getElementById("class-more-content-" + index);
    classTagMore = document.getElementById("class-see-more-content-" + index);
    classTagLess = document.getElementById("class-see-less-content-" + index);
    //Show if operation is 0
    if (operation === 0) {
        classTag.style.display = "inline";
        classTagMore.style.display = "none";
        classTagLess.style.display = "block";
    } else {
        classTag.style.display = "none";
        classTagMore.style.display = "inline";
        classTagLess.style.display = "none";
    }
};

// Operation = 0; Show
// Operation = 1; Hide
const showHideUserDesc = (operation) => {
    userTag = document.getElementById("user-desc-more-content");
    userTagMore = document.getElementById("user-desc-see-more");
    userTagLess = document.getElementById("user-desc-see-less");
    //Show if operation is 0
    if (operation === 0) {
        userTag.style.display = "inline";
        userTagMore.style.display = "none";
        userTagLess.style.display = "inline";
    } else {
        userTag.style.display = "none";
        userTagMore.style.display = "inline";
        userTagLess.style.display = "none";
    }
};

// Variable to store where the request is from!
let formObj = {
    classId: "",
    timing: "",
    timingString: "",
    uuid: "",
    classType: "Normal",
    queryTest: "",
    teacherSubdomain: "",
};

// teacher page contact popup
const openModal = (
    classId,
    timing,
    timingString,
    uuid,
    classType,
    teacherSubdomain
) => {
    formObj.classId = classId;
    formObj.timing = timing;
    formObj.timingString = timingString;
    formObj.uuid = "https://teachmint.com/publicroom/" + uuid;
    formObj.classType = classType;
    formObj.teacherSubdomain = teacherSubdomain;

    if (classType === "live") {
        formObj.queryTest =
            "Hi! I attended your class on " +
            timingString +
            ". Please reach out to me.";
    }
    if (classType === "reserve") {
        formObj.queryTest =
            "Hi! I am interested in joining your live class on " +
            timingString +
            ". Please contact me on the provided phone number. Thanks";
    }

    let modalWindow = document.getElementById("teacher-page-contact-modal");
    modalWindow.classList
        ? modalWindow.classList.add("open")
        : (modalWindow.className += " " + "open");

    $("#modal-form-id").show();
    $("#success-msg-preview-id").hide();
    $("#upcoming-success-msg-preview-id").hide();
    $("#form-loading-con").hide();
    $("#classroom-success-msg-preview-id").hide();
};

const closeModal = () => {
    /* Get close button */
    var closeButton = document.getElementsByClassName("jsModalClose");
    var closeOverlay = document.getElementsByClassName("jsOverlay");

    /* Set onclick event handler for close buttons */
    for (var i = 0; i < closeButton.length; i++) {
        closeButton[i].onclick = function () {
            var modalWindow = this.parentNode.parentNode;

            modalWindow.classList
                ? modalWindow.classList.remove("open")
                : (modalWindow.className = modalWindow.className.replace(
                      new RegExp(
                          "(^|\\b)" + "open".split(" ").join("|") + "(\\b|$)",
                          "gi"
                      ),
                      " "
                  ));
        };
    }

    /* Set onclick event handler for modal overlay */
    for (var i = 0; i < closeOverlay.length; i++) {
        closeOverlay[i].onclick = function () {
            var modalWindow = this.parentNode;

            modalWindow.classList
                ? modalWindow.classList.remove("open")
                : (modalWindow.className = modalWindow.className.replace(
                      new RegExp(
                          "(^|\\b)" + "open".split(" ").join("|") + "(\\b|$)",
                          "gi"
                      ),
                      " "
                  ));
        };
    }
};

closeModal();

/*
    Handle Contact from onSubmit 
*/
// $(document).ready(function () {
//     $("#contact-form-button").click(function (event) {
//         //hide input form and start loading
//         $("#modal-form-id").hide();
//         $("#form-loading-con").show();

//         // call to server
//         $.ajax({
//             type: "POST",
//             url: "/handle-teacher-contact-submit",
//             data: {
//                 student_name: $("#contact_student_name").val(),
//                 mobile_number: $("#contact_mobile_number").val(),
//                 subdomain: formObj.teacherSubdomain,
//                 class_id: formObj.classId,
//                 desc: formObj.queryTest,
//                 class_timings: formObj.timing,
//             },
//         }).done(function (data) {
//             // hide loading
//             $("#form-loading-con").hide();

//             // show sucess msg according to classType
//             if (
//                 formObj.classType === "live" ||
//                 formObj.classType === "reserve"
//             ) {
//                 $("#upcoming-success-msg-preview-id").show();
//                 $("#upcoming-success-video").trigger("play");
//                 $("#upcoming-class-info-line").html(
//                     "Class will go live on " + formObj.timingString + "."
//                 );
//                 $("#upcoming-class-public-link").html(formObj.uuid);
//                 $("#upcoming-class-public-link").attr("href", formObj.uuid);
//             } else {
//                 $("#success-msg-preview-id").show();
//             }

//             // open new tab if live class
//             if (formObj.classType === "live")
//                 window.open(
//                     formObj.uuid + "?name=" + $("#contact_student_name").val()
//                 );

//             // empty input fields
//             $("#contact_student_name").val("");
//             $("#contact_mobile_number").val("");
//         });

//         event.preventDefault();
//     });
// });

$(document).ready(function () {
    $("#contact-form-button").click(function (event) {
        let studentName = $("#contact_student_name").val();
        let mobileNumber = $("#contact_mobile_number").val();

        if (String(studentName).trim().length === 0)
            $("#contact_student_name_error").text("Required");
        else $("#contact_student_name_error").text("");

        if (/^\d{10}$/.test(String(mobileNumber).trim()))
            $("#contact_mobile_number_error").text("");
        else
            $("#contact_mobile_number_error").text(
                "Enter Valid Whatsapp Number"
            );

        if (
            String(studentName).trim().length !== 0 &&
            /^\d{10}$/.test(String(mobileNumber).trim())
        ) {
            event.preventDefault();
            grecaptcha.ready(function () {
                grecaptcha
                    .execute("6Ld53WwaAAAAALUdYMhgWVTy4-H4512vhFq-rdng", {
                        action: "submit",
                    })
                    .then(function (token) {
                        //hide input form and start loading
                        $("#modal-form-id").hide();
                        $("#form-loading-con").show();

                        formObj.studentName = $("#contact_student_name").val();

                        // call to server
                        $.ajax({
                            type: "POST",
                            url: "/handle-teacher-contact-submit",
                            data: {
                                student_name: $("#contact_student_name").val(),
                                mobile_number: $(
                                    "#contact_mobile_number"
                                ).val(),
                                subdomain: formObj.teacherSubdomain,
                                class_id: formObj.classId,
                                desc: formObj.queryTest,
                                class_timings: formObj.timing,
                                token: token,
                            },
                        }).done(function (data) {
                            // hide loading
                            $("#form-loading-con").hide();

                            // show sucess msg according to classType
                            if (
                                formObj.classType === "live" ||
                                formObj.classType === "reserve"
                            ) {
                                $("#upcoming-success-msg-preview-id").show();
                                $("#upcoming-success-video").trigger("play");
                                $("#upcoming-class-info-line").html(
                                    "Class will go live on " +
                                        formObj.timingString +
                                        "."
                                );
                                $("#upcoming-class-public-link").html(
                                    formObj.uuid
                                );
                                $("#upcoming-class-public-link").attr(
                                    "href",
                                    formObj.uuid
                                );
                            } else if (formObj.classType === "classroomList") {
                                $("#join-classroom-heading-id").text(
                                    `Awesome ${formObj.studentName}!!`
                                );
                                $("#classroom-success-msg-preview-id").show();
                            } else {
                                $("#success-msg-preview-id").show();
                            }

                            // open new tab if live class
                            if (formObj.classType === "live")
                                window.open(
                                    formObj.uuid +
                                        "?name=" +
                                        $("#contact_student_name").val()
                                );

                            // empty input fields
                            $("#contact_student_name").val("");
                            $("#contact_mobile_number").val("");
                        });

                        event.preventDefault();
                    });
            });
        }
    });
});

const copyUpcomingLink = () => {
    navigator.clipboard.writeText(formObj.uuid);
};

const whatsappShare = () => {
    let url =
        "https://api.whatsapp.com/send/?phone=918867703410&text=Hi Teachmint Team!%0D%0AI have registered for a Live Class on Teachmint for *" +
        formObj.timingString +
        "*. %0D%0ASaving this link here: %0D%0A" +
        formObj.uuid +
        "%0D%0A%0D%0AThanks";
    window.open(url, "_blank").focus();
};

// Please save this and remind me 10 mins before the class starts. %0D%0A
// let url =
//         "https://api.whatsapp.com/send/?phone=918867703410&text=Hi Teachmint Team!%0D%0AI have registered for a Live Class on Teachmint for *" +
//         timingString +
//         "*. %0D%0AHere's the link: %0D%0A" +
//         uuid +
//         "%0D%0A%0D%0AThanks";

/** 
    Add Shadow all sections based on number of number of cards(Based on scroll and offset width)
*/
const addShadowToContainers = (sectionName) => {
    const container = document.getElementById(sectionName);
    if (container) {
        if (container.scrollWidth <= container.offsetWidth) {
            document
                .getElementById("blue-right-arrow-" + sectionName)
                .style.setProperty("display", "none", "important");
        }
    }
};
addShadowToContainers("compliment-list-con");

/*
    sectionName -> 
    1. upcoming-list-con
    2. classroom-con
    3. video-lecture-con
    4. youtube-video-lecture-con

    direction -> toRight; toLeft
*/
const scrollHorizontalSection = (sectionName, direction) => {
    const container = document.getElementById(sectionName);

    // Apply only in tab and laptop
    if (document.getElementsByTagName("body")[0].clientWidth > 600) {
        // check direction
        if (direction === "toRight") {
            if (
                container.scrollWidth <
                container.scrollLeft + container.offsetWidth + 5 //5 px for error adjusting
            ) {
                // Disable or remove right arrow on complete scroll
                document
                    .getElementById("blue-right-arrow-" + sectionName)
                    .style.setProperty("display", "none", "important");
            } else {
                // Show Left arrow on scroll
                document
                    .getElementById("blue-left-arrow-" + sectionName)
                    .style.setProperty("display", "flex", "important");

                // Scroll right for 400px
                container.scrollLeft = container.scrollLeft + 400;
            }
        } else if (direction === "toLeft") {
            if (container.scrollLeft === 0) {
                // Disable or remove left arrow on complete scroll
                document
                    .getElementById("blue-left-arrow-" + sectionName)
                    .style.setProperty("display", "none", "important");
            } else {
                // Show Left arrow on scroll
                document
                    .getElementById("blue-right-arrow-" + sectionName)
                    .style.setProperty("display", "flex", "important");

                // Scroll left for 400px
                container.scrollLeft = container.scrollLeft - 400;
            }
        }
    }
};

/*
    sectionName -> 
    1. upcoming-list-con
    2. classroom-con
    3. video-lecture-con
    4. youtube-video-lecture-con
*/
const handleMouseScroll = (sectionName) => {
    const container = document.getElementById(sectionName);

    // Apply only in tab and laptop
    if (document.getElementsByTagName("body")[0].clientWidth > 600) {
        if (
            container.scrollWidth <
            container.scrollLeft + container.offsetWidth + 5 //5 px for error adjusting
        ) {
            // Disable or remove right arrow on complete scroll
            document
                .getElementById("blue-right-arrow-" + sectionName)
                .style.setProperty("display", "none", "important");
        } else {
            // Enable right arrow on complete scroll
            document
                .getElementById("blue-right-arrow-" + sectionName)
                .style.setProperty("display", "flex", "important");
        }

        if (container.scrollLeft === 0) {
            // Disable or remove left arrow on complete scroll
            document
                .getElementById("blue-left-arrow-" + sectionName)
                .style.setProperty("display", "none", "important");
        } else {
            // Enable left arrow on complete scroll
            document
                .getElementById("blue-left-arrow-" + sectionName)
                .style.setProperty("display", "flex", "important");
        }
    }
};

/*
    Teacher Feature section Mobile
*/

// Variables to target our base class,  get carousel items, count how many carousel items there are, set the TFMCurIndex to 0 (which is the number that tells us the frame we're on), and set motion to true which disables interactivity.
var TFMClassname = "four-block-con";
let items = document.getElementsByClassName(TFMClassname);
let TFMTotalItems = items.length;
let TFMCurIndex = 0;
let TFMMoving = true;
let TFMIntervalId = null;
let TFLIntervalId = null;
let TFMSecStartedFlag = false;
let TFLSecStartedFlag = false;
let TFMIsFirstIllistrationActive = false;

// To initialise the carousel we'll want to update the DOM with our own classes
const TFMSetInitialClasses = () => {
    // Target the last, initial, and next items and give them the relevant class.
    // This assumes there are three or more items.
    items[TFMTotalItems - 1].classList.add("prev");
    items[0].classList.add("active");
    items[1].classList.add("next");
};

// Disable interaction by setting 'TFMMoving' to true for the same duration as our transition (0.5s = 500ms)
const TFMDisableInteraction = () => {
    TFMMoving = true;
    setTimeout(() => {
        TFMMoving = false;
    }, 500);
};

const TFMMoveCarouselTo = (TFMCurIndex) => {
    // Check if carousel is TFMMoving, if not, allow interaction
    if (!TFMMoving) {
        // temporarily disable interactivity
        TFMDisableInteraction();

        // Preemptively set variables for the current next and previous TFMCurIndex, as well as the potential next or previous TFMCurIndex.
        var newPrevious = TFMCurIndex - 1,
            newNext = TFMCurIndex + 1,
            oldPrevious = TFMCurIndex - 2,
            oldNext = TFMCurIndex + 2;

        let easierControls = document.getElementsByClassName(
            "teacher-feature-sec-mobile-controls-item"
        );

        // Test if carousel has more than three items
        if (TFMTotalItems - 1 > 2) {
            // Checks if the new potential TFMCurIndex is out of bounds and sets TFMCurIndex numbers
            if (newPrevious <= 0) oldPrevious = TFMTotalItems - 1;
            else if (newNext >= TFMTotalItems - 1) oldNext = 0;

            // Check if current TFMCurIndex is at the beginning or end and sets TFMCurIndex numbers
            if (TFMCurIndex === 0) {
                newPrevious = TFMTotalItems - 1;
                oldPrevious = TFMTotalItems - 2;
                oldNext = TFMCurIndex + 1;
            } else if (TFMCurIndex === TFMTotalItems - 1) {
                newPrevious = TFMCurIndex - 1;
                newNext = 0;
                oldNext = 1;
            }

            // Based on the current TFMCurIndex, reset to default classes.
            items[oldPrevious].className = TFMClassname;
            items[oldNext].className = TFMClassname;
            for (let i = 0; i < TFMTotalItems; i++) {
                if (i == TFMCurIndex)
                    easierControls[i].className =
                        "teacher-feature-sec-mobile-controls-item teacher-feature-sec-mobile-controls-item-selected";
                else
                    easierControls[i].className =
                        "teacher-feature-sec-mobile-controls-item";
            }

            // Add the new classes
            items[newPrevious].className = TFMClassname + " prev";
            items[TFMCurIndex].className = TFMClassname + " active";
            items[newNext].className = TFMClassname + " next";
        }
    }
};

// Next navigation handler
const TFMMoveNext = () => {
    // Check if TFMMoving
    if (!TFMMoving) {
        // If it's the last TFMCurIndex, reset to 0, else +1
        if (TFMCurIndex === TFMTotalItems - 1) TFMCurIndex = 0;
        else TFMCurIndex++;

        if (TFMIsFirstIllistrationActive) {
            let videoTag = document.getElementById(
                "TFM-item-video-" + TFMCurIndex
            );
            videoTag.currentTime = 0;
            videoTag.play();
        }

        // Move carousel to updated TFMCurIndex
        TFMMoveCarouselTo(TFMCurIndex);
    }
};

// Previous navigation handler
const TFMMovePrev = () => {
    // Check if TFMMoving
    if (!TFMMoving) {
        // If it's the first TFMCurIndex, set as the last TFMCurIndex, else -1
        if (TFMCurIndex === 0) {
            TFMCurIndex = TFMTotalItems - 1;
        } else {
            TFMCurIndex--;
        }

        // Move carousel to updated TFMCurIndex
        TFMMoveCarouselTo(TFMCurIndex);
    }
};

// Initialise carousel
const TFMInitCarousel = (index, activateCarouselMobileFlag) => {
    TFMSetInitialClasses();

    // Set TFMMoving to false now that the carousel is ready
    TFMMoving = false;

    TFMCurIndex = index;
    TFMMoveNext();

    if (activateCarouselMobileFlag) TFMActivateCarousel();
};
const TFMActivateCarousel = () => {
    if (TFMIntervalId) clearInterval(TFMIntervalId);
    TFMIntervalId = window.setInterval(() => {
        TFMMoveNext();
    }, 6050);
};
TFMInitCarousel(3, false);

/**
 * Start carousel when section starts
 */
$(window).scroll(() => {
    if (screen.width < 600 && !TFMSecStartedFlag) {
        var hT = $("#teacher-feature-sec-mobile-id").offset().top,
            hH = $("#teacher-feature-sec-mobile-id").outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > hT + hH - wH - 200) {
            document.getElementById("TFM-item-video-0").play();
            TFMIsFirstIllistrationActive = true;
            TFMActivateCarousel();
            TFMSecStartedFlag = true;
        }
    } else if (screen.width >= 600 && !TFLSecStartedFlag) {
        var hT = $("#teacher-feature-sec-laptop-id").offset().top,
            hH = $("#teacher-feature-sec-laptop-id").outerHeight(),
            wH = $(window).height(),
            wS = $(this).scrollTop();
        if (wS > hT + hH - wH - 300) {
            TFLSecStartedFlag = true;
            TFLActivateCarousel(0);
        }
    }
});

/**
 *  Teacher feature web
 */
let TFLCurIndex = 0;
let TFLTFMTotalItems = 4;
let TFLMoving = false;
let TFLIsIllistrationActive = [false, false, false, false];
let TFLFirstTime = true;
let TFLHalfTimeoutId = null;
let TFLFullTimeoutId = null;

const TFLMoveNext = () => {
    // Check if moving
    if (!TFLMoving) {
        TFLMoving = true;

        // Add setInterval with more time and disgard previous setinterval
        if (TFLFirstTime) {
            TFLFirstTime = false;
            if (TFLIntervalId) clearInterval(TFLIntervalId);
            TFLIntervalId = window.setInterval(() => {
                TFLMoveNext();
            }, 10050);
        }

        // Start Animation
        let animationLine = document.getElementById(
            "TFL-animation-line-" + TFLCurIndex
        );
        if (animationLine) {
            animationLine.style.animationName =
                "teacherFeatureVerticalLineAnimation";
        }

        // Stop video and start fade out
        let prevVideo = document.getElementById(
            "TFL-item-video-" + TFLCurIndex
        );
        prevVideo.pause();
        prevVideo.classList.add("TFL-video-fade-out");

        TFLHalfTimeoutId = window.setTimeout(() => {
            // Hide Prev Video and stop fade out
            let prevVideo = document.getElementById(
                "TFL-item-video-" + TFLCurIndex
            );
            prevVideo.classList.remove("TFL-video-fade-out");
            prevVideo.style.display = "none";

            // Show Cur Video and start fade in
            let curVideo = document.getElementById(
                "TFL-item-video-" + ((TFLCurIndex + 1) % TFLTFMTotalItems)
            );
            curVideo.currentTime = 0;
            curVideo.style.display = "block";
            curVideo.classList.add("TFL-video-fade-in");
        }, 2000);

        TFLFullTimeoutId = window.setTimeout(() => {
            let prevItem = document.getElementById("TFL-item-" + TFLCurIndex);

            // If it's the last TFMCurIndex, reset to 0, else +1
            if (TFLCurIndex === TFLTFMTotalItems - 1) TFLCurIndex = 0;
            else TFLCurIndex++;

            let curItem = document.getElementById("TFL-item-" + TFLCurIndex);

            prevItem.classList.remove("teacher-feature-item-selected");
            curItem.classList.add("teacher-feature-item-selected");
            if (animationLine) {
                animationLine.style.animationName = "";
            }

            // stop fade in and play video
            let curVideo = document.getElementById(
                "TFL-item-video-" + TFLCurIndex
            );
            curVideo.classList.remove("TFL-video-fade-in");
            curVideo.currentTime = 0;
            curVideo.play();

            TFLMoving = false;
        }, 4000);
    }
};

const TFLActivateCarousel = (index) => {
    TFLCurIndex = index;
    TFLFirstTime = true;
    TFLMoving = false;

    // Clear all setintervals and timeouts
    if (TFLIntervalId) clearInterval(TFLIntervalId);
    if (TFLHalfTimeoutId) clearTimeout(TFLHalfTimeoutId);
    if (TFLFullTimeoutId) clearTimeout(TFLFullTimeoutId);

    // Hide all previous selected card and video
    for (let i = 0; i < TFLTFMTotalItems; i++) {
        // Remove previous selected card
        let item = document.getElementById("TFL-item-" + i);
        item.classList.remove("teacher-feature-item-selected");

        // Remove all line animation
        let animationLine = document.getElementById("TFL-animation-line-" + i);
        if (animationLine) {
            animationLine.style.animationName = "";
        }

        // Remove fade in, fade out animation and pause, hide video
        let videoItem = document.getElementById("TFL-item-video-" + i);
        videoItem.pause();
        videoItem.style.display = "none";
        videoItem.classList.remove("TFL-video-fade-out");
        videoItem.classList.remove("TFL-video-fade-in");
    }

    // Select current card
    let item = document.getElementById("TFL-item-" + TFLCurIndex);
    item.classList.add("teacher-feature-item-selected");

    // show and Play first Video
    let curVideo = document.getElementById("TFL-item-video-" + TFLCurIndex);
    curVideo.style.display = "block";
    curVideo.currentTime = 0;
    curVideo.play();

    TFLIntervalId = window.setInterval(() => {
        TFLMoveNext();
    }, 6050);
};
