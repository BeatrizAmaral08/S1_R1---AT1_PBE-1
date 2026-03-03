import creatMulter from "../config/upload.multer.js";

const uploadImage = creatMulter({
    pasta: 'imagens',
    tipoPermitidos: ['image/png', 'image/jpeg'],
    tamanhoArquivo: 10 * 1024*1024 // 10 MB
}).single('image');

export default uploadImage;