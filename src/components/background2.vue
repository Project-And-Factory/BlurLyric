<template>
    <div>
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  // const StackBlur = require('stackblur-canvas');
  import * as StackBlur from 'stackblur-canvas';
  export default {
    props: {
      imageSrc: {
        type: String,
        required: true
      },
      isRunning: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        canvasWidth: 800, // canvas 宽度
        canvasHeight: 600, // canvas 高度
        meshSize: 50, // mesh 大小
        blurRadius: 20, // 高斯模糊半径
        hueRotation: 90, // 色调旋转角度
        image: null, // 图片对象
        meshPoints: [], // mesh 点的数组
        animationId: null, // 动画 ID
        lastImageSrc: "" // 上一次传递的图片链接
      };
    },
    mounted() {
      this.canvas = this.$refs.canvas;
      this.context = this.canvas.getContext("2d");
      this.init();
      this.draw();
    },
    watch: {
      isRunning(newVal) {
        if (newVal) {
          this.resumeAnimation();
        } else {
          this.pauseAnimation();
        }
      },
      imageSrc(newVal) {
        if (newVal !== this.lastImageSrc) { // 只有在新旧图片链接不同时才重新进行处理
          this.lastImageSrc = newVal;
          this.init();
          this.draw();
        }
      }
    },
    methods: {
      // 初始化
      async init() {
        this.image = await this.loadImage(this.imageSrc);
        this.meshPoints = this.createMeshPoints();
      },
      // 绘制
      draw() {
        this.context.clearRect(0, 0, this.canvasWidth, this.canvasHeight); // 清空画布
  
        // 先绘制 mesh
        this.drawMesh();
  
        // 高斯模糊处理
        this.drawBlur();
  
        // 放大处理
        this.drawEnlarge();
        this.drawMesh(); // 再绘制一遍 mesh，使得放大后的 mesh 点更加明显
  
        // 再次放大处理
        this.drawEnlarge();
  
        // 再次高斯模糊处理
        this.drawBlur();
  
        // 调整色调
        this.adjustHue();
  
        // 动画处理
        this.animate();
      },
      // 加载图片
      loadImage(src) {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = reject;
          image.src = src;
        });
      },
      // 创建 mesh 点的数组
      createMeshPoints() {
        const points = [];
        for (let y = -this.meshSize; y <= this.canvasHeight + this.meshSize; y += this.meshSize) {
          for (let x = -this.meshSize; x <= this.canvasWidth + this.meshSize; x += this.meshSize) {
            points.push([x, y]);
          }
        }
        return points;
      },
      // 绘制 mesh
      drawMesh() {
        for (const [x, y] of this.meshPoints) {
          this.context.beginPath();
          this.context.arc(x, y, 2, 0, 2 * Math.PI);
          this.context.fillStyle = "white";
          this.context.fill();
        }
      },
      // 绘制高斯模糊效果
      drawBlur() {
        const tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = this.canvasWidth;
        tmpCanvas.height = this.canvasHeight;
        const tmpContext = tmpCanvas.getContext("2d");
        tmpContext.drawImage(this.canvas, 0, 0);
        StackBlur.canvasRGBA(tmpCanvas, 0, 0, this.canvasWidth, this.canvasHeight, this.blurRadius); // 使用 stackBlurCanvas 库进行高斯模糊处理
        this.context.drawImage(tmpCanvas, 0, 0);
      },
      // 绘制放大效果
      drawEnlarge() {
        const tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = this.canvasWidth * 2;
        tmpCanvas.height = this.canvasHeight * 2;
        const tmpContext = tmpCanvas.getContext("2d");
        tmpContext.drawImage(this.canvas, 0, 0, this.canvasWidth * 2, this.canvasHeight *2);
      this.context.drawImage(tmpCanvas, -this.canvasWidth / 4, -this.canvasHeight / 4, this.canvasWidth, this.canvasHeight);
    },
    // 调整色调
    adjustHue() {
      const imageData = this.context.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
        const [h, s, l] = this.rgbToHsl(r, g, b);
        const [newR, newG, newB] = this.hslToRgb((h + this.hueRotation / 360) % 1, s, l);
        data[i] = newR;
        data[i + 1] = newG;
        data[i + 2] = newB;
      }
      this.context.putImageData(imageData, 0, 0);
    },
    // RGB 转 HSL
    rgbToHsl(r, g, b) {
      r /= 255, g /= 255, b /= 255;
      const max = Math.max(r, g, b), min = Math.min(r, g, b);
      let h, s, l = (max + min) / 2;
      if (max == min) {
        h = s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r: h = (g - b) / d + (g < b ? 6 : 0); break;
          case g: h = (b - r) / d + 2; break;
          case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
      }
      return [h, s, l];
    },
    // HSL 转 RGB
    hslToRgb(h, s, l) {
      let r, g, b;
      if (s == 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }
      return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    },
    // 动画处理
    animate() {
      this.animationId = requestAnimationFrame(this.animate);
      for (let i = 0; i < this.meshPoints.length; i++) {
        const [x, y] = this.meshPoints[i];
        this.meshPoints[i][1] = y + Math.sin((x + Date.now() / 1000) / 100) * 2;
      }
      this.draw();
    },
    // 恢复动画
    resumeAnimation() {
      if (!this.animationId) {
        this.animate();
      }
    },
    // 暂停动画
    pauseAnimation() {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  },
  beforeDestroy() {
    cancelAnimationFrame(this.animationId);
  }
};
</script>

<style scoped>
canvas {
  z-index: -2;
  position: absolute;  width: 100vw;
  height: 100vh;
}
</style>

  