let dynamicImgBox = document.getElementById("dynamic-img-box");
const bgPath = "../../res/img/background/bg";
const bgExtension = ".jpg"
const bgChangeTime = 10000; // time between bg image chahges
const maxBgImgScale = 1.3;  // initilial bg image scale

setNextBg.currentBg = 0;
setNextBg.maxBg = 9;
setNextBg.scaleDelta = 0.0004;
setNextBg.opacityDelta = 0.008;
setNextBg.currentImg = null;

class DynamicImg
{
    constructor(container, id, imgNumber, scaleDelta, opacityDelta) {
        this.container = container;
        this.scaleDelta = scaleDelta;
        this.opacityDelta = opacityDelta;
        this.img = document.createElement("img");
        this.img.id = id;
        this.container.appendChild(this.img);
        this.img.src = bgPath + imgNumber + ".jpg";
        this.img.style.transform = ``
        this.setScale(maxBgImgScale);
        this.currentScale = maxBgImgScale;
        this.currentOpacity = 0.0;
        requestAnimationFrame((function scaleStep() {
            this.currentScale -= this.scaleDelta;
            this.setScale(this.currentScale);
            if(this.currentScale <= 1.0)
            {
                this.setScale(1.0);
            }
            else
            {
                requestAnimationFrame((scaleStep).bind(this))
            }
        }).bind(this));
        requestAnimationFrame((function opacityStep() {
            this.currentOpacity += this.opacityDelta;
            this.setOpacity(this.currentOpacity);
            if(this.currentOpacity >= 1.0)
            {
                this.setOpacity(1.0);
            }
            else
            {
                requestAnimationFrame((opacityStep).bind(this));
            }
        }).bind(this));
    }

    setOpacity(opacity)
    {
        this.img.style.opacity = opacity;
    }

    setScale(scale)
    {
        this.img.style.transform = `translate(0, -20%) scale(${scale})`;
    }

    remove()
    {
        requestAnimationFrame((function opacityStep() {
            this.currentOpacity -= this.opacityDelta;
            this.setOpacity(this.currentOpacity);
            if(this.currentOpacity <= 0.0)
            {
                this.setOpacity(0.0);
                this.img.remove();
            }
            else
            {
                requestAnimationFrame((opacityStep).bind(this));
            }
        }).bind(this));
    }
}

setNextBg();
setInterval(setNextBg, bgChangeTime);

function setNextBg()
{
    setNextBg.currentBg += 1;
    if(setNextBg.currentBg > setNextBg.maxBg) setNextBg.currentBg = 1;
    const newImg = new DynamicImg(dynamicImgBox, "dynamic-img", setNextBg.currentBg, setNextBg.scaleDelta, setNextBg.opacityDelta);
    if(setNextBg.currentImg) setNextBg.currentImg.remove();
    setNextBg.currentImg = newImg;
}

