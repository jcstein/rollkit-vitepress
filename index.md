---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Rollkit"
  text: "The open modular framework for sovereign rollups"
  tagline: Build Rollups with interchangeable software to preserve sovereignty
  image:
    src: /logo-big.svg
    alt: Rollkit
  actions:
    - theme: brand
      text: Rollup Starter
      link: /tutorials/rollup-starter
    - theme: alt
      text: Introduction
      link: /reference/intro

features:
  - title: Shared security
    details: Rollups inherit security from the consensus and data availability layer
    link: /reference/about#why-rollkit
    icon: 🔐
  - title: Scalable
    details: With off-chain execution, rollups have their own dedicated computational resources
    link: /reference/stack
    icon: 📈
  - title: Flexible
    details: Freedom to configure the execution environment and other components
    link: /reference/about
    icon: ⚙️
  - title: Easy to deploy
    details: Deploy a rollup with only a few command lines
    link: /tutorials/rollup-starter
    icon: 🛸
---
