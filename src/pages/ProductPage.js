import React, { useEffect, useState } from 'react';
import DetailProduct from '../components/productpage/DetailProduct';
import DetailProductResponsive from '../components/productpage/DetailProductResponsive';
import Modals from '../components/productpage/Modals';
import CarouselProduct from '../components/productpage/CarouselProduct';
import Navbar from '../components/Navbar';
import DescriptionProduct from '../components/productpage/DescriptionProduct';
import { useParams } from 'react-router-dom';
import api from "../lib/api";

const ProductPage = () => {
    const param = useParams()
    const { id } = useParams();
    const [ product, setProduct] = useState({})
    const [ user, setUser] = useState({})
    const [ hasoffer, setHasoffer] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const [data, setData] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(true)
    const [post, setPost] = useState([]);

    useEffect(()=>{
        setProduct({user_id:2})
        setUser({id:1})
        setHasoffer(false)
        setShowAlert(false)}, [])
    // }, [product, hasoffer, user, showAlert])

    //hanya coba apakah id nya masuk atau tidak, kalau mau fetch bisa dihapus aja
    useEffect(()=>{
        console.log(`current id ${param.id}`)
    },[param.id])
    //sampai sini hanya test saja
    const getUsers = async () => {
        try {
            const responseUsers = await api.get(`/api/v1/whoami`,
                {
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // },
                });
            const dataUsers = responseUsers.data.user_data;
            setData(dataUsers)
        } catch (err) {
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {

               //Validasi token API
                const currentUserRequest = await api.get(
                    "/api/v1/whoami")

                const currentUserResponse = currentUserRequest.data;

                if (currentUserResponse.status) {
                    setUser(currentUserResponse.data.user_data);
                }
            } catch (err) {
                setIsLoggedIn(false);
            }
        };

        fetchData();
        getUsers();
    }, [])

    useEffect(() => {
        const getProduct = async () => {
            try {
                const responseProduct = await api.get(`/api/v1/products/:id`, {

                })
                console.log(responseProduct)

                const dataProduct = await responseProduct.data.data.posts[0];
                setPost(dataProduct)
                console.log(dataProduct);

            } catch (err) {
                console.log(err);
            }
        }
        getProduct();
    }, [id])

    return (
        <div id='product-page'>
        <Navbar/>

        <div className="container container-product-page" style={{marginTop: 40}}>
            <div className="row" style={{'--bs-gutter-x' : 0}}>
                <div className="col-md-1"></div>
                <div className="col-md-6">
                    <CarouselProduct/>
                    <DescriptionProduct/>
                </div>
                <div className="col-md-4">
                    <div className="card-product mx-auto">
                        <div className="card-body">
                            <h5 className="card-title-name">Jam Tangan Casio</h5>
                            <p className="card-text-category">Aksesoris</p>
                            <h4 className="card-title-price">Rp. 250.000</h4>
                            {/* <a href="/" className="btn btn-primary btn-terbitakan" data-bs-toggle="modal" data-bs-target="#exampleModal">Terbitakan</a>
                            <a href="/" className="btn btn-primary btn-edit">Edit</a> */}
                            <DetailProduct user={user} product={product} hasoffer={hasoffer}/>
                        </div>
                    </div>
                    <div className="card-seller">
                        <div className="card-body-seller">
                            <div className="row">
                                <div className="col-md-2">
                                    <img src="/assets/images/image_seller.png" className="seller-image d-block" alt="Seller"/>
                                </div>
                                <div className="col-md-10">
                                    <h5 className="card-title-name-seller" style={{marginBottom: 4}}>Nama Penjual</h5>
                                    <p className="card-text-city">Kota</p>
                                </div>
                            </div>                      
                        </div>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
            <Modals onSave={() => setShowAlert(true)}/>
            <DetailProductResponsive user={user} product={product} hasoffer={hasoffer}/>
            
        </div>
        <div className={`alert alert-success alert-dismissible alert-buyer fade ${showAlert ? 'show' : ''}`} role="alert">
                Harga tawarmu berhasil dikirim ke penjual
                <button type="button" className="btn-close"  onClick={()=> setShowAlert(false)} aria-label="Close"></button>
        </div>
        <div className='button-back'>
            <button type="button" class="btn-back-responsive fas fa-arrow-left fixed-top" aria-label="Back"></button>
        </div>
        
        </div>
           
    )    
}
export default ProductPage;