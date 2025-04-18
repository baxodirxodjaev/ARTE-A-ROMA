import { db } from "./firebase";
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc,  } from "firebase/firestore";
import { Gallery, Homepage, Product, User } from "../types";
import { useQuery } from "@tanstack/react-query";
import { deleteFile, getPathFromUrl } from "./storageService";



// Request Events/Tariffs via React Query
  const fetchProducts = async (): Promise<Product[]> => {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Product));
  };

  // Hook to fetch products
  export const useProducts = () => {
    return useQuery<Product[]>({
      queryKey: ["products"],
      queryFn: fetchProducts,
    });
  };


  const fetchHomePage = async (): Promise<Homepage[]> => {
    const querySnapshot = await getDocs(collection(db, "homepage"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Homepage));
  };

  // Hook to fetch homepage
  export const useHomePage = () => {
    return useQuery<Homepage[]>({
      queryKey: ["homepage"],
      queryFn: fetchHomePage,
    });
  };

  export const updateHomepage = async (homepageId: string, updatedData: Partial<Homepage>): Promise<void> => {
    await updateDoc(doc(db, "homepage", homepageId), updatedData);
  };

  
  const fetchUsers = async (): Promise<User[]> => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as User));
  };

  // Hook to fetch users
  export const useUsers = () => {
    return useQuery<User[]>({
      queryKey: ["users"],
      queryFn: fetchUsers,
    });
  };


//  Request Gallery images via React Query
const fetchGallery = async (): Promise<Gallery[]> => {
  const querySnapshot = await getDocs(collection(db, "gallerySlider"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Gallery));
};

//  Hook to fetch gallery
export const useGallerySlider = () => {
  return useQuery<Gallery[]>({
    queryKey: ["gallerySlider"],
    queryFn: fetchGallery,
  });
};

export const addGalleryItem = async (item: Omit<Gallery, "id">) => {
  await addDoc(collection(db, "gallerySlider"), item);
};


export const deleteGalleryItem = async (itemId: string, imageUrl: string) => {
  const path = getPathFromUrl(imageUrl);
  await deleteFile(path); 
  await deleteDoc(doc(db, "gallerySlider", itemId)); 
};

  

//  Add a new tariff or event only for admin
export const addProduct = async (product: Omit<Product, "id">): Promise<void> => {
  await addDoc(collection(db, "products"), product);
};



//  Update a product only for admin
export const updateProduct = async (productId: string, updatedData: Partial<Product>): Promise<void> => {
  await updateDoc(doc(db, "products", productId), updatedData);
};



//  Delete a product only for admin
export const deleteProduct = async (productId: string): Promise<void> => {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);

  if (productSnap.exists()) {
    const product = productSnap.data();
    
    // Удаляем все картинки из Storage
    if (product.images) {
      await Promise.all(product.images.map((url: string) => {
        const path = getPathFromUrl(url);
        return deleteFile(path);
      }));
    }

    // Удаляем постер
    if (product.poster) {
      const path = getPathFromUrl(product.poster);
      await deleteFile(path);
    }
  }

  // Удаляем сам документ из Firestore
  await deleteDoc(productRef);
};








