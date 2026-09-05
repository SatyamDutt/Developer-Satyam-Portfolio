/* =========================================================
   MOBILE NAVIGATION
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const nav =
    document.getElementById("nav");


if (menuButton && nav) {

    menuButton.addEventListener(
        "click",
        () => {

            nav.classList.toggle("open");

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

document
    .querySelectorAll(".nav a")
    .forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                nav.classList.remove("open");

            }
        );

    });


/* =========================================================
   CURSOR GLOW
========================================================= */

const cursorGlow =
    document.querySelector(".cursor-glow");


if (cursorGlow) {

    window.addEventListener(
        "pointermove",
        (event) => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target
                            .classList
                            .add("visible");

                        revealObserver
                            .unobserve(
                                entry.target
                            );

                    }

                }
            );

        },

        {
            threshold: 0.12
        }

    );


document
    .querySelectorAll(".reveal")
    .forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );


/* =========================================================
   PROJECT VIDEOS - PLAY ON SCROLL INTO VIEW
========================================================= */

const projectVideos =
    document.querySelectorAll(".project-video");


if (projectVideos.length) {

    const videoObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        const video =
                            entry.target;

                        const visual =
                            video.closest(".project-visual");


                        if (
                            entry.isIntersecting &&
                            entry.intersectionRatio >= 0.5
                        ) {

                            /*
                             * Play returns a promise; catch it
                             * so autoplay restrictions don't
                             * throw unhandled errors.
                             */
                            const playPromise =
                                video.play();


                            if (
                                playPromise !== undefined
                            ) {

                                playPromise
                                    .then(
                                        () => {

                                            if (visual) {

                                                visual
                                                    .classList
                                                    .add("is-playing");

                                            }

                                        }
                                    )
                                    .catch(
                                        () => {

                                            /*
                                             * Autoplay was blocked;
                                             * leave the poster/badge
                                             * showing so the user can
                                             * tap to play manually.
                                             */

                                        }
                                    );

                            }

                        } else {

                            video.pause();


                            if (visual) {

                                visual
                                    .classList
                                    .remove("is-playing");

                            }

                        }

                    }
                );

            },

            {
                threshold: [0, 0.5, 1]
            }

        );


    projectVideos.forEach(
        (video) => {

            videoObserver.observe(video);


            /*
             * Allow a manual tap/click to toggle
             * play/pause too, in case autoplay
             * was blocked by the browser.
             */
            video.addEventListener(
                "click",
                () => {

                    const visual =
                        video.closest(".project-visual");


                    if (video.paused) {

                        video.play();


                        if (visual) {

                            visual
                                .classList
                                .add("is-playing");

                        }

                    } else {

                        video.pause();


                        if (visual) {

                            visual
                                .classList
                                .remove("is-playing");

                        }

                    }

                }
            );

        }
    );

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

const header =
    document.querySelector(".header");


window.addEventListener(
    "scroll",
    () => {

        if (
            window.scrollY > 50
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navigationLinks =
    document.querySelectorAll(
        ".nav a"
    );


function updateActiveNavigation() {

    let current =
        "home";


    sections.forEach(
        (section) => {

            const sectionTop =
                section.offsetTop - 220;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionBottom
            ) {

                current =
                    section.id;

            }

        }
    );


    navigationLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                href ===
                `#${current}`
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


window.addEventListener(
    "scroll",
    updateActiveNavigation
);


/* =========================================================
   PROFILE PARALLAX
========================================================= */

const profile =
    document.querySelector(
        ".hero-profile"
    );


if (profile) {

    window.addEventListener(
        "mousemove",
        (event) => {

            const x =
                (window.innerWidth / 2 -
                event.clientX) / 70;


            const y =
                (window.innerHeight / 2 -
                event.clientY) / 70;


            profile.style.transform =
                `translate(${x}px, ${y}px)`;

        }
    );

}


/* =========================================================
   PROJECT CARD TILT
========================================================= */

const projectVisuals =
    document.querySelectorAll(
        ".project-visual"
    );


projectVisuals.forEach(
    (visual) => {


        visual.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    visual.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / 40;


                const rotateY =
                    (centerX - x) / 40;


                visual.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        visual.addEventListener(
            "mouseleave",
            () => {

                visual.style.transform =
                    "";

            }
        );

    }
);


/* =========================================================
CONTACT FORM
========================================================= */

const contactForm =
document.getElementById("contactForm");

const formMessage =
document.getElementById("formMessage");

const submitButton =
document.getElementById("submitButton");

const submitText =
document.getElementById("submitText");

if (contactForm) {


contactForm.addEventListener(
    "submit",
    async (event) => {

        /*
         * Prevent normal page refresh
         */
        event.preventDefault();


        /*
         * Get form data
         */
        const formData =
            new FormData(contactForm);


        const name =
            formData.get("name");


        /*
         * Show loading state
         */
        if (submitButton) {

            submitButton.disabled = true;

        }


        if (submitText) {

            submitText.textContent =
                "Sending...";

        }


        if (formMessage) {

            formMessage.textContent = "";

        }


        try {

            /*
             * Send enquiry to Formspree
             */
            const response =
                await fetch(
                    contactForm.action,
                    {
                        method: "POST",

                        body: formData,

                        headers: {
                            "Accept":
                                "application/json"
                        }
                    }
                );


            /*
             * SUCCESS
             */
            if (response.ok) {

                if (formMessage) {

                    formMessage.textContent =
                        `Thanks ${name}! Your enquiry has been sent successfully. I'll get back to you soon.`;

                    formMessage.style.color =
                        "#70e1a1";

                }


                /*
                 * Clear form
                 */
                contactForm.reset();

            }


            /*
             * FORM ERROR
             */
            else {

                let data = null;

                try {

                    data =
                        await response.json();

                } catch (error) {

                    data = null;

                }


                if (
                    data &&
                    data.errors &&
                    data.errors.length
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            data.errors
                                .map(
                                    error =>
                                        error.message
                                )
                                .join(", ");

                        formMessage.style.color =
                            "#ff6b6b";

                    }

                } else {

                    if (formMessage) {

                        formMessage.textContent =
                            "Something went wrong. Please try again.";

                        formMessage.style.color =
                            "#ff6b6b";

                    }

                }

            }

        }


        /*
         * NETWORK ERROR
         */
        catch (error) {

            console.error(
                "Contact form error:",
                error
            );


            if (formMessage) {

                formMessage.textContent =
                    "Unable to send your enquiry. Please try again or contact me directly.";

                formMessage.style.color =
                    "#ff6b6b";

            }

        }


        /*
         * Restore button
         */
        finally {

            if (submitButton) {

                submitButton.disabled =
                    false;

            }


            if (submitText) {

                submitText.textContent =
                    "Send Enquiry";

            }

        }

    }
);


}

/* =========================================================
   SMOOTH LINK HANDLING
========================================================= */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link
                            .getAttribute(
                                "href"
                            );


                    if (
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (target) {

                        event.preventDefault();


                        target.scrollIntoView(
                            {
                                behavior:
                                    "smooth"
                            }
                        );

                    }

                }
            );

        }
    );