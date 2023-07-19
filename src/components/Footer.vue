<template>
    <div class="footer" @mouseover="showFooter" @mouseleave="hideFooter">
        <div class="images">
            <div class="carousel-icon" @click="toggleCarousel">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-left">
                    <path d="M19 12H5"></path>
                    <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
            </div>
            <div v-for="(image, index) in displayedImages" :key="index" class="img-container">
                <img class="image" :src="image" />
            </div>
            <div class="carousel-icon" @click="toggleCarousel">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-right">
                    <path d="M5 12H19"></path>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </div>
        </div>
        <div class="carousel-bars">
            <span class="bar" :class="{ 'bar-filled': currentBar === 1 }"></span>
            <span class="bar" :class="{ 'bar-filled': currentBar === 2 }"></span>
        </div>
    </div>
</template>
<script>
import comida01 from "../assets/comida01.jpg";
import comida02 from "../assets/comida02.jpg";
import comida03 from "../assets/comida03.jpg";
import comida04 from "../assets/comida04.jpg";
import comida05 from "../assets/comida05.jpg";
import comida06 from "../assets/comida06.jpg";

export default {
    data() {
        return {
            carouselVisible: false,
            carouselImages: [
                comida01,
                comida02,
                comida03,
                comida04,
                comida05,
                comida06
            ],
            currentBar: 1
        };
    },
    computed: {
        displayedImages() {
            if (this.carouselVisible) {
                return this.carouselImages.slice(3, 6);
            } else {
                return this.carouselImages.slice(0, 3);
            }
        }
    },
    methods: {
        toggleCarousel() {
            this.carouselVisible = !this.carouselVisible;
            this.currentBar = this.carouselVisible ? 2 : 1;
        },
        fillBar(barNumber) {
            this.currentBar = barNumber;
        },
        showFooter() {
            this.$el.style.bottom = "0";
        },
        hideFooter() {
            this.$el.style.bottom = "-100px";
        }
    }
};
</script>
<style scoped>
.footer {
    position: fixed;
    bottom: -100px;
    left: 10vw;
    color: white;
    width: 80vw;
    height: 20vh;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: .5rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: .7s;
}

.footer .images {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 80vw;
}

.footer .carousel-icon {
    border: 1px solid #fff;
    width: 40px;
    height: 40px;
    border-radius: .5rem;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 48px;
}

.footer .carousel-icon:hover {
    transition: .4s;
    border-color: rgba(255, 255, 255, .3);
    color: rgba(255, 255, 255, .5);
    cursor: pointer;
}

.footer .carousel-bars {
    display: flex;
    position: fixed;
    bottom: 5px;
}

.footer .carousel-bars .bar {
    width: 25px;
    height: .2rem;
    border: 1px solid gray;
    margin: 0 2px;
}

.footer .carousel-bars .bar-filled {
    background-color: gray;
    transition: all .5s;
}

.footer .image {
    border: 1px solid #fff;
    height: 13vh;
    width: 10vw;
    border-radius: .5rem;
    margin: 0 2rem;
}

.footer .bar-filled {
    background-color: gray;
}

@media (max-width: 800px) {
    .footer .images {
        width: 100%;
        height: 100%;
    }

    .footer .carousel-icon {
        width: 50px;
        height: 50px;
        margin: 0 .5rem;
    }

    .footer .img-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
    }

    .footer .image {
        width: 35px;
        height: 10vh;
    }
}
</style>