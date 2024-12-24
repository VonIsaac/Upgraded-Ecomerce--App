import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { queryClient, editProducts, getEditProducts } from "../../utils/https";
import { useQuery, useMutation } from "@tanstack/react-query";

const EditModal = () => {
    const { productId } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const searchEdit = searchParams.get('edit') === 'true';

    const { data: productData } = useQuery({
        queryKey: ['edit-product', productId],
        queryFn: () => getEditProducts({ productId }),
       enabled: searchEdit,
        onSuccess: (data) => {
            setTitle(data.title);
            setImageUrl(data.imageUrl);
            setPrice(data.price);
            setDescription(data.description);
        }
    });

    const { mutate, isPending } = useMutation({
        mutationFn: (updatedProduct) => editProducts({ productId, updatedProduct }),
        onSuccess: () => {
            queryClient.invalidateQueries(['edit-products']);
           
        },
        onError: (error) => {
            console.error('Error editing product:', error);
        },
    });

    const handleEditProduct = (e) => {
        e.preventDefault();
        mutate({ title, imageUrl, price, description });
        navigate('/products');
    };

    return (
        <dialog id="my_modal_2" className="modal">
            <form className="modal-box" onSubmit={handleEditProduct}>
                <h1 className="text-center my-4 text-2xl tracking-wide font-semibold">EDIT PRODUCT</h1>
                <label className="input input-bordered flex items-center gap-2 mb-6">
                    <input
                        type="text"
                        className="grow"
                        placeholder="Title"
                        name="title"
                        id="title"
                        onChange={e => setTitle(e.target.value)}
                        value={ title }
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-6">
                    <input
                        type="text"
                        className="grow"
                        placeholder="ImageUrl"
                        name="imageUrl"
                        id="imageUrl"
                        onChange={e => setImageUrl(e.target.value)}
                        value={ imageUrl  }
                        required
                    />
                </label>
                <label className="input input-bordered flex items-center gap-2 mb-6">
                    <input
                        type="number"
                        className="grow"
                        placeholder="Price"
                        name="price"
                        id="price"
                        onChange={e => setPrice(e.target.value)}
                        value={ price  }
                        required
                    />
                </label>
                <textarea
                    className="textarea textarea-bordered textarea-md w-full max-w-xs mx-16"
                    placeholder="Description"
                    name="description"
                    id="description"
                    required
                    onChange={e => setDescription(e.target.value)}
                    value={ description }
                />
                <button className="btn btn-block" type="submit">
                    {isPending ? 'Updating Products....' : 'Update Product'}
                </button>
            </form>
        </dialog>
    );
};

export default EditModal;