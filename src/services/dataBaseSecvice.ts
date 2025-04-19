import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { Gallery, Homepage, Policy, Product, User } from "../types";
import { useCreateQuery } from "../hooks/useCreateQuery";
import { deleteFile, getPathFromUrl } from "./storageService";

// ─── 📦 PRODUCTS ─────────────────────────────────────

const fetchProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
};

export const useProducts = () => useCreateQuery<Product>("products", fetchProducts);

export const addProduct = async (product: Omit<Product, "id">): Promise<void> => {
  await addDoc(collection(db, "products"), product);
};

export const updateProduct = async (productId: string, updatedData: Partial<Product>): Promise<void> => {
  await updateDoc(doc(db, "products", productId), updatedData);
};

export const deleteProduct = async (productId: string): Promise<void> => {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    const product = productSnap.data() as Product;

    // Удаление картинок
    if (product.images) {
      await Promise.all(product.images.map((url) => deleteFile(getPathFromUrl(url))));
    }

    // Удаление постера
    if (product.poster) {
      await deleteFile(getPathFromUrl(product.poster));
    }
  }

  await deleteDoc(productRef);
};

// ─── 🏠 HOMEPAGE ────────────────────────────────────

const fetchHomePage = async (): Promise<Homepage[]> => {
  const querySnapshot = await getDocs(collection(db, "homepage"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Homepage));
};

export const useHomePage = () => useCreateQuery<Homepage>("homepage", fetchHomePage);

export const updateHomepage = async (
  homepageId: string,
  updatedData: Partial<Homepage>
): Promise<void> => {
  await updateDoc(doc(db, "homepage", homepageId), updatedData);
};

// ─── 👥 USERS ────────────────────────────────────────

const fetchUsers = async (): Promise<User[]> => {
  const querySnapshot = await getDocs(collection(db, "users"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
};

export const useUsers = () => useCreateQuery<User>("users", fetchUsers);

// ─── 🖼️ GALLERY ──────────────────────────────────────

const fetchGallery = async (): Promise<Gallery[]> => {
  const querySnapshot = await getDocs(collection(db, "gallerySlider"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Gallery));
};

export const useGallerySlider = () => useCreateQuery<Gallery>("gallerySlider", fetchGallery);

export const addGalleryItem = async (item: Omit<Gallery, "id">) => {
  await addDoc(collection(db, "gallerySlider"), item);
};

export const deleteGalleryItem = async (itemId: string, imageUrl: string) => {
  const path = getPathFromUrl(imageUrl);
  await deleteFile(path);
  await deleteDoc(doc(db, "gallerySlider", itemId));
};


// ─── Policy ──────────────────────────────────────


const fetchPolicy = async (): Promise<Policy[]> => {
  const querySnapshot = await getDocs(collection(db, "policy"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Policy));
};

export const usePolicy = () => useCreateQuery<Policy>("policy", fetchPolicy);

