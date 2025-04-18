import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "./firebase";


export const uploadFile = async (file: File, folder: string) => {
  const storageRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return { url: downloadURL, path: snapshot.ref.fullPath }; 
};


export const deleteFile = async (filePath: string) => {
  const fileRef = ref(storage, filePath);
  await deleteObject(fileRef);
};


export  const getPathFromUrl = (url: string): string => {
  const baseUrl = "https://firebasestorage.googleapis.com/v0/b/arte-a-rome.appspot.com/o/";
  const pathWithToken = url.replace(baseUrl, "");
  const [pathEncoded] = pathWithToken.split("?"); 
  return decodeURIComponent(pathEncoded);
};
