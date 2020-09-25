# dogWalker

## Erros no Swiper

Vá até node_modules/react-native-swiper/index.js
Substitua as linhas:
module.exports = Swiper;
module.exports.default = Swiper;
por:
export default Swiper
export {Swiper}
