<template>
  <div class="graph">
    <canvas class="canvas"
            ref="canvas"
            :width="$props.width"
            :height="$props.height"
            @mousedown="mouseDownFlag = true"
            @mouseup="mouseDownFlag = false"
            @mouseleave="mouseDownFlag = false"
            @mousemove="onDrag"
            @click="onClick"/>
  </div>
</template>

<script>
  export default {
    props: ['width', 'height', 'value', 'r', 'prevResults'],
    data() {
      return {
        canvasContext: null,
        mouseDownFlag: false,
        rSmooth: 0,
        rUpdatingIntervalId: null,
      }
    },
    watch: {
      r() {
        this.render();
      },
      rSmooth() {
        this.render();
      },
      'value.x': {
        handler: function() {
          this.render();
        },
        deep: true
      },
      'value.y': {
        handler: function() {
          this.render();
        },
        deep: true
      },
      prevResults() {
        this.render();
      }
    },
    mounted() {
      let instance = this;
      this.canvasContext = this.$refs['canvas'].getContext('2d');
      this.canvasContext.mv = function(x, y) { this.moveTo(x*instance.width, y*instance.height); };
      this.canvasContext.ln = function(x, y) { this.lineTo(x*instance.width, y*instance.height); };
      this.canvasContext.txt = function(text, x, y) { this.fillText(text, x*instance.width, y*instance.height); };
      this.render();

      this.rUpdatingIntervalId = setInterval(this.updateR, 1000/60);
    },
    beforeDestroy() {
      clearInterval(this.rUpdatingIntervalId);
    },
    methods: {
      trim(point, n) {
        return {
          x: (+point.x).toFixed(n),
          y: (+point.y).toFixed(n)
        }
      },
      normalizedToGraphCoords(point) {
        return {x: this.rSmooth*(point.x-.5)/.4, y: -this.rSmooth*(point.y-.5)/.4}
      },
      graphToNormalizedCoords(point) {
        return {x: (point.x*0.4/this.rSmooth+0.5), y: (-point.y*0.4/this.rSmooth+0.5)}
      },
      updateR() {
        this.rSmooth += (this.r - this.rSmooth)/10;
      },
      onDrag(event) {
        if (!this.r || !this.mouseDownFlag)
          return;
        let {layerX: elemX, layerY: elemY} = event;
        let {scrollWidth: maxX, scrollHeight: maxY} = this.$refs['canvas'];
        let normalized = {x: elemX/maxX, y: elemY/maxY};
        this.$emit('input', this.trim(this.normalizedToGraphCoords(normalized), 2));
        this.render();
      },
      onClick(event) {
        if (!this.r)
          return;
        let {layerX: elemX, layerY: elemY} = event;
        let {scrollWidth: maxX, scrollHeight: maxY} = this.$refs['canvas'];
        let normalized = {x: elemX/maxX, y: elemY/maxY};
        this.$emit('input', this.trim(this.normalizedToGraphCoords(normalized), 2));
        setTimeout(() => {
          this.$emit('click');
        }, 0);
        this.render();
      },
      render() {
        let ctx = this.canvasContext;
        let { width, height } = this;
        width = +width;
        height = +height;

        let scale = this.rSmooth.toFixed(2);

        ctx.clearRect(0, 0, width, height);

        ctx.fillStyle = "#349eeb";
        ctx.fillRect(0.5*width, 0.1*height, 0.2*width, 0.4*height);
        ctx.beginPath();
        ctx.mv(.5, .9);
        ctx.ln(.3, .5);
        ctx.ln(.9, .5);
        ctx.arc(0.5*width, 0.5*height, .4*(width+height)/2, 0, Math.PI/2);
        ctx.fill();

        ctx.lineWidth = 3;
        ctx.strokeStyle = "black";
        ctx.fillStyle = "black";

        ctx.beginPath();
        ctx.mv(0, .5);
        ctx.ln(1, .5);
        ctx.ln(.97, .48);
        ctx.mv(1, .5);
        ctx.ln(.97, .52);

        ctx.mv(.1, .49);
        ctx.ln(.1, .51);
        ctx.mv(.3, .49);
        ctx.ln(.3, .51);
        ctx.mv(.7, .49);
        ctx.ln(.7, .51);
        ctx.mv(.9, .49);
        ctx.ln(.9, .51);

        ctx.mv(.5, 1);
        ctx.ln(.5, 0);
        ctx.ln(.48, .03);
        ctx.mv(.5, 0);
        ctx.ln(.52, .03);

        ctx.mv(.49, .9);
        ctx.ln(.51, .9);
        ctx.mv(.49, .7);
        ctx.ln(.51, .7);
        ctx.mv(.49, .3);
        ctx.ln(.51, .3);
        ctx.mv(.49, .1);
        ctx.ln(.51, .1);

        ctx.font = "48px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.txt(scale ? (-scale).toPrecision(2) : "-R", .1, .52);
        ctx.txt(scale ? (-scale/2).toPrecision(2) : "-R/2", .3, .52);
        ctx.txt(scale ? (scale/2).toPrecision(2) : "R/2", .7, .52);
        ctx.txt(scale ? (+scale).toPrecision(2) : "R", .9, .52);
        ctx.txt("x", .97, .52);

        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.txt(scale ? (-scale).toPrecision(2) : "-R", .52, .9);
        ctx.txt(scale ? (-scale/2).toPrecision(2) : "-R/2", .52, .7);
        ctx.txt(scale ? (scale/2).toPrecision(2) : "R/2", .52, .3);
        ctx.txt(scale ? (+scale).toPrecision(2) : "R", .52, .1);
        ctx.txt("y", .52, .03);
        ctx.stroke();

        if (scale) {
          for (let i = 0; i < this.prevResults.length; i++) {
            let current = this.prevResults[i];
            ctx.fillStyle = current.hit ? "green" : "red";
            let {x, y} = this.graphToNormalizedCoords(current);
            ctx.beginPath();
            ctx.arc(x*width, y*height, .005*(width+height)/2, 0, 2*Math.PI);
            ctx.fill();
          }
        }

        if (this.value && this.value.x !== null && this.value.y !== null) {
          ctx.fillStyle = "#aa0000";
          ctx.strokeStyle = "#aa0000";

          let {x, y} = this.graphToNormalizedCoords(this.value);

          ctx.beginPath();
          ctx.arc(x*width, y*height, .005*(width+height)/2, 0, 2*Math.PI);
          ctx.fill();

          ctx.beginPath();
          ctx.mv(x, y + .01);
          ctx.ln(x, y + .02);
          ctx.mv(x, y - .01);
          ctx.ln(x, y - .02);
          ctx.mv(x + .01, y);
          ctx.ln(x + .02, y);
          ctx.mv(x - .01, y);
          ctx.ln(x - .02, y);
          ctx.stroke();

          if (this.mouseDownFlag) {
            ctx.fillStyle = "rgba(0, 0, 0, .75)";
            ctx.font = "24px Arial";
            ctx.textAlign = "left";
            ctx.textBaseline = "bottom";

            let text = `x: ${(+this.value.x).toFixed(2)} y: ${(+this.value.y).toFixed(2)}`;
            ctx.fillRect(x*width + 10, y*height - 10, 35 + 9*text.length, -50);
            ctx.fillStyle = "white";
            ctx.fillText(text, x*width + 20, y*height - 20)
          }
        }
      }
    }
  }
</script>

<style scoped>
  .canvas {
    width: 100%;
  }
</style>