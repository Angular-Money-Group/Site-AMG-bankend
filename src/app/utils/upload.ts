import multer, { StorageEngine } from "multer";
import { Request } from "express";

const storage: StorageEngine = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limitar tamanho do arquivo a 10MB
});

export default upload;
