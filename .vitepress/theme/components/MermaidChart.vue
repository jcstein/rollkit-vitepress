<template>
  <div ref="mermaidEl"></div>
</template>

<script>
import mermaid from 'mermaid';

export default {
  props: ['chart'],
  mounted() {
    mermaid.initialize({ startOnLoad: true });
    mermaid.render('mermaidChart', this.chart, (svgCode) => {
      if (this.$refs.mermaidEl) {
        this.$refs.mermaidEl.innerHTML = svgCode;
      }
    });
  }
};
</script>
