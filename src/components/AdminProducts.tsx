import  { useEffect, useState } from 'react'
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import { Product } from '../types';
import { addProduct, deleteProduct, updateProduct, useProducts } from '../services/dataBaseSecvice';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const AdminProducts = () => {

    const { data: products, isLoading, refetch } = useProducts();

    const [showForm, setShowForm] = useState(false);
    const [localProducts, setLocalProducts] = useState(products || []);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    
    useEffect(() => {
        if (products) {
            setLocalProducts(products);
        }
    }, [products]);
    
    const tariffs = localProducts.filter((p) => p.type === "tariff");
    const events = localProducts.filter((p) => p.type === "event");


     // adding product
      const handleAddProduct = async (productData : Product) => {
        const tempId = Date.now().toString(); 
        const newProduct = { ...productData, id: tempId };
        
        setLocalProducts([...localProducts, newProduct]); 
        toast.success("New Item is added successfully!");
    
        try {
          await addProduct(productData);
          refetch(); // Обновляем данные из Firebase
        } catch (error) {
          setLocalProducts(localProducts.filter((p) => p.id !== tempId)); // Rollback
          toast.error("Error in adding new item!");
          console.log(error);
          
        }
      };
    
      //  Update product
      const handleUpdateProduct = async (productId : string, updatedData : Product) => {
        const prevProducts = [...localProducts];
        setLocalProducts(localProducts.map((p) => (p.id === productId ? { ...p, ...updatedData } : p)));
        setEditingProduct(null); 
        toast.success(" Item is updated successfully!");
    
        try {
          await updateProduct(productId, updatedData);
          refetch();
        } catch (error) {
          setLocalProducts(prevProducts); // Rollback
          toast.error("Error in updating item!");
          console.log(error);
        }
      };
    
      //  Delete product
      const handleDeleteProduct = async (productId: string) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this item?");
        if (!isConfirmed) return;
      
        const prevProducts = [...localProducts];
        setLocalProducts(localProducts.filter((p) => p.id !== productId)); 
        toast.success("Item is deleted successfully!");
      
        try {
          await deleteProduct(productId);
          refetch();
        } catch (error) {
          setLocalProducts(prevProducts); // Rollback
          toast.error("Error in deleting item!");
          console.error(error);
        }
      };

    if(isLoading) return <Spinner/>;

  return (
    <section className='my-6'>
      <h2 className="text-2xl text-center font-bold mb-4">You can add new Tariff or new Event </h2>
         {
        showForm ? 
        <ProductForm 
            onClose={()=>setShowForm(false)}
            onSubmit={handleAddProduct} />  :
        <button 
            onClick={()=>setShowForm(true)}
            className="px-5 py-2 rounded-md bg-green-600 font-medium text-white">Start adding</button>
      }

      {/* Devide products by category */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold">Tariffs ({tariffs.length})</h2>
        <ProductList 
          products={tariffs} 
          onEdit={(product) => setEditingProduct(product)}
          onDelete={handleDeleteProduct} />
      </div>

      <div className="mt-6 mb-6">
        <h2 className="text-2xl font-bold">Events ({events.length})</h2>
        <ProductList 
          products={events} 
          onEdit={setEditingProduct} 
          onDelete={handleDeleteProduct} />
      </div>

      {editingProduct && (
        <div>
            <h2 className="text-2xl font-bold mb-4">Edit tariff/event</h2>

            <ProductForm 
                initialData={editingProduct} 
                onSubmit={(data) => handleUpdateProduct(editingProduct.id, data)} 
                onClose={() => setEditingProduct(null)}/>
        </div>
      )}
    </section>
  )
}

export default AdminProducts