import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';


const Slider = () => {
    return (
        <Swiper
            spaceBetween={20}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            breakpoints={{
                644: { slidesPerView: 1 },
                //768: { slidesPerView: 2 },
                //1024: { slidesPerView: 3 },
            }}
        >
            <SwiperSlide className=''>
                <div className="relative bg-white p-6 shadow text-white text-center rounded-xl h-[300px] flex flex-col justify-evenly">
                    <div className="absolute inset-0 bg-[url('./assets/logo.avif')] bg-cover bg-center rounded-xl">
                        <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div> {/* Dark Overlay */}
                    </div>
                    <h3 className="text-xl font-bold mb-2 relative z-10">Logo Design</h3>
                    <div className="relative z-10">
                        <p>Need a professional logo with writing underneath for our jewellery company</p>
                        <div>
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Apply Now</button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative bg-white p-6 shadow text-white text-center rounded-xl h-[300px] flex flex-col justify-evenly">
                    <div className="absolute inset-0 bg-[url('./assets/graphic.jpg')] bg-cover bg-center rounded-xl">
                        <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div> {/* Dark Overlay */}
                    </div>
                    <h3 className="text-xl font-bold mb-2 relative z-10">Graphic Design</h3>
                    <div className="relative z-10">
                        <p>We need a graphic designer with UI/UX skills for our Furniture company</p>
                        <div>
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Apply Now</button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="relative bg-white p-6 shadow text-white text-center rounded-xl h-[300px] flex flex-col justify-evenly">
                    <div className="absolute inset-0 bg-[url('./assets/Editor.jpg')] bg-cover bg-center rounded-xl">
                        <div className="absolute inset-0 bg-black opacity-50 rounded-xl"></div> {/* Dark Overlay */}
                    </div>
                    <h3 className="text-xl font-bold mb-2 relative">Video Editor</h3>
                    <div className="relative z-10">
                        <p>Need a video editor for our company who will let our company to a higher level</p>
                        <div>
                            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Apply Now</button>
                        </div>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
    );
};
export default Slider;
